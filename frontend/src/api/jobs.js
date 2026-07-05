const BASE = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const fetchJobs = () => request('/jobs');

export const fetchJobById = (id) => request(`/jobs/${id}`);

export const createJob = (data, token) =>
  request('/jobs', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

export const updateJob = (id, data, token) =>
  request(`/jobs/${id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

export const deleteJob = (id, token) =>
  request(`/jobs/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
