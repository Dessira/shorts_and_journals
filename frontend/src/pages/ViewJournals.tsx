import { useState, useEffect } from "react";
import JournalCard from "../components/JournalCard";

type Short = {
  title: string;
  content: string;
  isPrivate: boolean;
  journalId?: number;
  tags: string[];
};

type Journal = {
  title: string;
  description: string;
  isPrivate: boolean;
  shorts: Short[];
};

export default function ViewJournalsList() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedJournals: Journal[] = JSON.parse(localStorage.getItem("journals") || "[]");
    setJournals(savedJournals);
  }, []);

  // Filter journals based on search
  const filteredJournals = journals.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Journals
      </h1>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search journals by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Journals Grid */}
      {filteredJournals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJournals.map((j, idx) => {
            // Aggregate tags from shorts
            const aggregatedTags = Array.from(
              new Set(j.shorts?.flatMap((s) => s.tags) || [])
            );

            return (
              <JournalCard
                key={idx}
                id={idx}
                title={j.title}
                description={j.description}
                tags={aggregatedTags}
                shortsCount={j.shorts?.length || 0}
                isPrivate={j.isPrivate}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 mt-6">No journals found.</p>
      )}
    </div>
  );
}
