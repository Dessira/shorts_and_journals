import { getCookie } from "./auth";

//"http://localhost:8000/journals/"
export async function createJournal(payload: {
    name: string;
    description: string;
    is_private: boolean;
  }) {
    const token = getCookie("access_token");
    const res = await fetch("http://localhost:8000/journals/", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
  
    if (!res.ok) {
      throw new Error("Failed to create journal");
    }
    
    const journal =  await res.json();
    console.log(journal)
    return journal
  }

  // api/journals.ts
  import type { Journal } from "../types";

export async function fetchJournals(): Promise<Journal[]> {
  const token = getCookie("access_token");

  const res = await fetch("http://localhost:8000/journals/me", {
    headers: { Authorization: `Bearer ${token}`,
  "Content-Type": "application/json", },
  });

  if (!res.ok) throw new Error("Failed to fetch journals");

  return res.json(); // make sure backend returns a list of journals
}


  // api/journals.ts

export async function fetchJournalById(id: string): Promise<Journal> {
  const token = getCookie("access_token");
  const res = await fetch(`http://localhost:8000/journals/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch journal");

  return res.json(); // backend should return journal JSON
}

  