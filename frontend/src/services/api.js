const API_BASE = 'http://localhost:3001';
// Note: use 10.0.2.2 for Android emulator to reach host; use localhost for web

export async function postAuth(body) {
  const res = await fetch(`${API_BASE}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function getMe(token) {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (res.status === 200) return res.json();
  throw new Error('Not authenticated');
}

export async function subscribe(payload, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}/subscribe`, { method: 'POST', headers, body: JSON.stringify(payload) });
  return res.json();
}

export async function verify(reference) {
  const res = await fetch(`${API_BASE}/verify?reference=${encodeURIComponent(reference)}`);
  return res.json();
}
