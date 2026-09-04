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
  if (!res.ok) {
  throw new Error(
    data.message ||
    data.detail ||
    "Something went wrong"
  );
}
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

export async function uploadScan(
  imageFile,
  lang = "en",
  crop = "tomato"
) {
  const formData = new FormData();

  formData.append("image", imageFile);
  formData.append("lang", lang);
  formData.append("crop", crop);

  const res = await fetch(`${API_URL}/scan`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
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
export async function getMonitoring() {
  const res = await fetch(`${API_URL}/scan/follow-ups`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return handleResponse(res);
}
  export async function startFollowUp(scanId) {
  const res = await fetch(`${API_URL}/scan/${scanId}/follow-up`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      days: 7,
    }),
  });

  return handleResponse(res);
}
export async function uploadFollowUpScan(scanId, imageFile, lang = "en") {
  const formData = new FormData();

  formData.append("image", imageFile);
  formData.append("lang", lang);

  const res = await fetch(
    `${API_URL}/scan/${scanId}/follow-up/scan`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    }
  );

  return handleResponse(res);
}

export async function getFollowUps() {
  const res = await fetch(`${API_URL}/scan/follow-ups`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return handleResponse(res);
}

export async function getFollowUp(id) {
  const res = await fetch(`${API_URL}/scan/follow-ups/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return handleResponse(res);
}
// ==========================================
// REQUEST EXPERT REVIEW
// ==========================================

export async function requestExpertReview(scanId) {
  const res = await fetch(
    `${API_URL}/expert/cases/${scanId}/request-review`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    }
  );

  return handleResponse(res);
}
export async function getNearbyStores(lat, lng) {
  const res = await fetch(`${API_URL}/stores?lat=${lat}&lng=${lng}`);
  return handleResponse(res);
}
export async function getWeather(lat, lng) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}` +
    `&longitude=${lng}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
    `&hourly=precipitation_probability,weather_code` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max` +
    `&timezone=auto` +
    `&forecast_days=5`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Unable to get weather");
  }

  return res.json();
}
export async function registerExpert({
  name,
  phone,
  password,
  qualification,
  specialization,
  organization,
}) {
  const res = await fetch(`${API_URL}/auth/expert/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      phone,
      password,
      qualification,
      specialization,
      organization,
    }),
  });

  return handleResponse(res);
}


export async function loginExpert({ phone, password }) {
  const res = await fetch(`${API_URL}/auth/expert/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone,
      password,
    }),
  });

  return handleResponse(res);
}
export async function getExpertCases() {
  const res = await fetch(
    `${API_URL}/expert/cases`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return handleResponse(res);
}
export async function getExpertCase(scanId) {
  const res = await fetch(
    `${API_URL}/expert/cases/${scanId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return handleResponse(res);
}


export async function submitExpertReview(
  scanId,
  advice
) {
  const res = await fetch(
    `${API_URL}/expert/cases/${scanId}/review`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization:
          `Bearer ${getToken()}`,
      },

      body: JSON.stringify({
        advice,
      }),
    }
  );

  return handleResponse(res);
}
export function getMediaUrl(url) {
  if (!url) return "";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  const backendUrl = API_URL.replace(/\/api\/?$/, "");

  return `${backendUrl}${url.startsWith("/") ? url : `/${url}`}`;
}
export { API_URL, getToken };
