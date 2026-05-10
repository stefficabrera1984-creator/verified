const BASE_URL =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://127.0.0.1:8000/api"
    : "https://backend.verifiedequalaccess.com/api";

export async function fetchAPI(endpoint: string) {
  const res = await fetch(
    `${BASE_URL}${endpoint}?nocache=${Date.now()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`API Error: ${endpoint}`);
  }

  return res.json();
}

// 🔹 Specific helpers
export const getPage = (slug: string) => fetchAPI(`/pages/${slug}`);
export const getSettings = () => fetchAPI(`/pages/settings`);
export const getMenu = () => fetchAPI(`/pages/menu-pages`);