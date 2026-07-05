const pool = require('../db');

async function getAllJobs(req, res) {
  try {
    const result = await pool.query(
      `SELECT j.id, j.title, j.company, j.location, j.type, j.salary, j.created_at,
              u.name AS employer_name
       FROM jobs j
       LEFT JOIN users u ON j.employer_id = u.id
       ORDER BY j.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getJobById(req, res) {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid job ID' });

  try {
    const result = await pool.query(
      `SELECT j.*, u.name AS employer_name, u.id AS employer_id
       FROM jobs j
       LEFT JOIN users u ON j.employer_id = u.id
       WHERE j.id = $1`,
      [id]
    );
    if (!result.rows[0]) return res.status(404).json({ error: 'Job not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createJob(req, res) {
  const { title, company, location, type, salary, description, requirements } = req.body;

  const missing = ['title', 'company', 'location', 'type', 'description'].filter(f => !req.body[f]);
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Missing required fields', fields: missing });
  }

  const validTypes = ['full-time', 'part-time', 'contract', 'internship'];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: `Invalid type. Must be one of: ${validTypes.join(', ')}` });
  }

  try {
    const result = await pool.query(
      `INSERT INTO jobs (title, company, location, type, salary, description, requirements, employer_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [title, company, location, type, salary || null, description, requirements || null, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateJob(req, res) {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid job ID' });

  try {
    const existing = await pool.query('SELECT employer_id FROM jobs WHERE id = $1', [id]);
    if (!existing.rows[0]) return res.status(404).json({ error: 'Job not found' });

    const isOwner = existing.rows[0].employer_id === req.user.id;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'Forbidden' });

    const { title, company, location, type, salary, description, requirements } = req.body;
    const validTypes = ['full-time', 'part-time', 'contract', 'internship'];
    if (type && !validTypes.includes(type)) {
      return res.status(400).json({ error: `Invalid type. Must be one of: ${validTypes.join(', ')}` });
    }

    const result = await pool.query(
      `UPDATE jobs SET
        title = COALESCE($1, title),
        company = COALESCE($2, company),
        location = COALESCE($3, location),
        type = COALESCE($4, type),
        salary = COALESCE($5, salary),
        description = COALESCE($6, description),
        requirements = COALESCE($7, requirements)
       WHERE id = $8
       RETURNING *`,
      [title, company, location, type, salary, description, requirements, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteJob(req, res) {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid job ID' });

  try {
    const existing = await pool.query('SELECT employer_id FROM jobs WHERE id = $1', [id]);
    if (!existing.rows[0]) return res.status(404).json({ error: 'Job not found' });

    const isOwner = existing.rows[0].employer_id === req.user.id;
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'Forbidden' });

    await pool.query('DELETE FROM jobs WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getAllJobs, getJobById, createJob, updateJob, deleteJob };
