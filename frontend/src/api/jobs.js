const API_URL = import.meta.env.VITE_API_URL;

export async function fetchJobs() {
  const res = await fetch(`${API_URL}/jobs`);
  if (!res.ok) throw new Error('Failed to fetch jobs');
  return res.json();
}

export async function fetchJobById(id) {
  const res = await fetch(`${API_URL}/jobs/${id}`);
  if (res.status === 404) throw new Error('Job not found');
  if (!res.ok) throw new Error('Failed to fetch job');
  return res.json();
}

export async function createJob(data) {
  const res = await fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const body = await res.json();
  if (!res.ok) throw new Error(body.error || 'Failed to create job');
  return body;
}
