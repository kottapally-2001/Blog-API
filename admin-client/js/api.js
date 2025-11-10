const API_BASE = "http://localhost:4000/api";
export function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}
export async function api(path, opts={}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...authHeader() },
    ...opts,
  });
  if (!res.ok) throw new Error((await res.json()).message || "Request failed");
  return res.json();
}
export function requireLogin() {
  const token = localStorage.getItem('token');
  if (!token) location.href = '/admin-client/index.html';
}
