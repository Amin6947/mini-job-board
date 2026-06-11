CREATE TABLE IF NOT EXISTS jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('full-time', 'part-time', 'contract', 'internship')),
  salary VARCHAR(100),
  description TEXT NOT NULL,
  requirements TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
