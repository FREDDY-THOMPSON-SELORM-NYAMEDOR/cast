const API_BASE = 'http://10.0.2.2:3001';

function adminHeaders(secret) {
  const headers = { 'Content-Type': 'application/json' };
  if (secret) headers['x-admin-secret'] = secret;
  return headers;
}

export async function listVideosAdmin(secret) {
  const res = await fetch(`${API_BASE}/admin/videos`, { headers: adminHeaders(secret) });
  if (res.status === 200) return res.json();
  const body = await res.json().catch(() => ({}));
  throw new Error(body.message || `Admin request failed (${res.status})`);
}

export async function createVideoAdmin(data, secret) {
  const res = await fetch(`${API_BASE}/admin/videos`, { method: 'POST', headers: adminHeaders(secret), body: JSON.stringify(data) });
  if (res.status === 201) return res.json();
  const body = await res.json().catch(() => ({}));
  throw new Error(body.message || `Admin create failed (${res.status})`);
}

export async function uploadImageAdmin(imageUrl, secret) {
  const res = await fetch(`${API_BASE}/admin/upload-image`, { method: 'POST', headers: adminHeaders(secret), body: JSON.stringify({ imageUrl }) });
  if (res.status === 200) return res.json();
  const body = await res.json().catch(() => ({}));
  throw new Error(body.message || `Upload failed (${res.status})`);
}

export async function listSubscriptionsAdmin(secret) {
  const res = await fetch(`${API_BASE}/admin/subscriptions`, { headers: adminHeaders(secret) });
  if (res.status === 200) return res.json();
  const body = await res.json().catch(() => ({}));
  throw new Error(body.message || `Admin request failed (${res.status})`);
}
