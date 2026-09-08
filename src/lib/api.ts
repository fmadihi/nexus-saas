// const BASE = 'http://localhost:3001';
const BASE = "";
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  await delay();
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json() as Promise<T>;
}

interface Paged<T> {
  data: T[];
}
export function fetchPaged<T>(
  resource: string,
  page: number,
  perPage = 8,
  q = "",
) {
  const params = new URLSearchParams({
    _page: String(page),
    _per_page: String(perPage),
  });
  if (q) params.set("q", q);
  return api<Paged<T>>(`/${resource}?${params}`);
}

export const createItem = <T>(resource: string, body: Partial<T>) =>
  api<T>(`/${resource}`, { method: "POST", body: JSON.stringify(body) });

export const updateItem = <T>(resource: string, id: string, body: Partial<T>) =>
  api<T>(`/${resource}/${id}`, { method: "PATCH", body: JSON.stringify(body) });

export const deleteItem = (resource: string, id: string) =>
  api<void>(`/${resource}/${id}`, { method: "DELETE" });
