const BASE = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const registerUser = (body) =>
  request('/auth/register', { method: 'POST', body: JSON.stringify(body) });

export const loginUser = (body) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify(body) });

export const fetchMe = (token) =>
  request('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
