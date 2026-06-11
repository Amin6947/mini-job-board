# Mini Job Board

A full-stack job board web application built with Node.js (Express), React (Vite), and PostgreSQL.

## Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: React + Vite
- **Database**: PostgreSQL
- **Styling**: Plain CSS

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [PostgreSQL](https://www.postgresql.org/) v14+

## Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd mini-job-board
```

### 2. Setup the database

Open your PostgreSQL client (psql or pgAdmin) and run:

```sql
CREATE DATABASE mini_job_board;
```

Then run the migration and seed scripts:

```bash
psql -U postgres -d mini_job_board -f backend/src/db/migration.sql
psql -U postgres -d mini_job_board -f backend/src/db/seed.sql
```

### 3. Configure backend environment

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mini_job_board
DB_USER=postgres
DB_PASSWORD=your_password
PORT=3000
```

### 4. Install and start the backend

```bash
cd backend
npm install
npm run dev
```

The API will be available at `http://localhost:3000`.

### 5. Configure frontend environment

```bash
cd frontend
cp .env.example .env
```

`.env` should contain:

```
VITE_API_URL=http://localhost:3000/api
```

### 6. Install and start the frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Endpoints

| Method | Endpoint        | Description         |
|--------|----------------|---------------------|
| GET    | /api/jobs       | Get all jobs        |
| GET    | /api/jobs/:id   | Get job by ID       |
| POST   | /api/jobs       | Create a new job    |

### POST /api/jobs — Request body

```json
{
  "title": "Frontend Developer",
  "company": "Wongnai",
  "location": "Bangkok",
  "type": "full-time",
  "salary": "40,000 - 60,000 THB",
  "description": "...",
  "requirements": "..."
}
```

Required fields: `title`, `company`, `location`, `type`, `description`

## Project Structure

```
mini-job-board/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # Express route definitions
│   │   ├── db/             # DB connection, migration, seed
│   │   └── app.js          # App entry point
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/            # Fetch functions
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
└── README.md
```
