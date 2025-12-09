import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Journal } from "../types";
import { getCookie } from "../api/auth";

export default function JournalView() {
  // change the method of id extraction
  const { id } = useParams();
  const [journal, setJournal] = useState<Journal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<"private" | "error" | null>(null);


  useEffect(() => {
    async function loadJournal() {
      try {
        const token = getCookie("access_token");
    const res = await fetch("http://localhost:8000/journals/288fbae3-3afa-4bec-8d78-ed00a62e5725", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` },
    });
        if (res.status === 403) {
          setError("private");
          setLoading(false);
          return;
        }

        if (!res.ok) {
          setError("error");
          setLoading(false);
          return;
        }

        const data = await res.json();
        setJournal(data);
        console.log(data)
      } catch (err) {
        setError("error");
      } finally {
        setLoading(false);
      }
    }

    loadJournal();
  }, [id]);

  // -------- Loading Skeleton --------
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4 animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-2/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
      </div>
    );
  }

  // -------- Private Journal Message --------
  if (error === "private") {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">🔒 Private Journal</h2>
        <p className="text-gray-600">
          The owner has marked this journal as private.  
          You do not have permission to view it.
        </p>
      </div>
    );
  }

  // -------- General Error Message --------
  if (error) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-gray-600">Unable to load the journal.</p>
      </div>
    );
  }
  if (!journal) return null;
  // -------- Journal Content --------
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {journal.name}
        </h1>
      <p>Journal viewing is working</p>
        <p className="text-sm text-gray-500 mb-6">
          {new Date(journal.created_at).toLocaleDateString()}
        </p>

        <div className="prose max-w-full">
          {journal.description}
        </div>

        {/* {journal.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {journal.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
}
