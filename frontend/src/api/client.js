/**
 * Saare backend calls yahan ek jagah rakhe hain.
 * Screens directly fetch() nahi karte - wo in functions ko call karte hain.
 * Fayda: kal agar API URL, auth header logic, ya error handling badalni ho,
 * to sirf yahi file touch karni padegi, har screen nahi.
 */

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("cropsense_token");
}

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export async function registerUser({ name, phone, password, location }) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, password, location }),
  });
  return handleResponse(res);
}

export async function loginUser({ phone, password }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, password }),
  });
  return handleResponse(res);
}

export async function uploadScan(imageFile, lang = "en") {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("lang", lang);

  const res = await fetch(`${API_URL}/scan`, {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  });
  return handleResponse(res);
}

export async function getScanHistory(lang = "en") {
  const res = await fetch(`${API_URL}/scan/history?lang=${lang}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return handleResponse(res);
}

export async function getNearbyStores(lat, lng) {
  const res = await fetch(`${API_URL}/stores?lat=${lat}&lng=${lng}`);
  return handleResponse(res);
}

export { API_URL, getToken };
