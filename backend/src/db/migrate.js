require('dotenv').config();
const pool = require('./index');

const sql = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'seeker' CHECK (role IN ('seeker', 'employer', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE jobs
  ADD COLUMN IF NOT EXISTS employer_id INTEGER REFERENCES users(id) ON DELETE SET NULL;
`;

pool.query(sql)
  .then(() => { console.log('Migration complete'); process.exit(0); })
  .catch(err => { console.error('Migration failed:', err.message); process.exit(1); });
