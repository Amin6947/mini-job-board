const pool = require('../db');

async function getAllJobs(req, res) {
  try {
    const result = await pool.query(
      'SELECT id, title, company, location, type, salary, created_at FROM jobs ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getJobById(req, res) {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid job ID' });
  }

  try {
    const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createJob(req, res) {
  const { title, company, location, type, salary, description, requirements } = req.body;

  const missingFields = [];
  if (!title) missingFields.push('title');
  if (!company) missingFields.push('company');
  if (!location) missingFields.push('location');
  if (!type) missingFields.push('type');
  if (!description) missingFields.push('description');

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: 'Missing required fields',
      fields: missingFields,
    });
  }

  const validTypes = ['full-time', 'part-time', 'contract', 'internship'];
  if (!validTypes.includes(type)) {
    return res.status(400).json({
      error: `Invalid type. Must be one of: ${validTypes.join(', ')}`,
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO jobs (title, company, location, type, salary, description, requirements)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title, company, location, type, salary || null, description, requirements || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getAllJobs, getJobById, createJob };
