import { useState, useEffect } from "react";
import ShortCard from "../components/ShortCard";

type Short = {
  title: string;
  content: string;
  isPrivate: boolean;
  journalId?: number;
  tags: string[];
};

type Journal = {
  title: string;
};

export default function ViewShortsList() {
  const [shorts, setShorts] = useState<Short[]>([]);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [search, setSearch] = useState("");
  const [selectedJournal, setSelectedJournal] = useState<number | null>(null);

  useEffect(() => {
    const savedShorts: Short[] = JSON.parse(localStorage.getItem("shorts") || "[]");
    setShorts(savedShorts);

    const savedJournals: Journal[] = JSON.parse(localStorage.getItem("journals") || "[]");
    setJournals(savedJournals);
  }, []);

  // Filter shorts based on search and selected journal
  const filteredShorts = shorts.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase());
    const matchesJournal = selectedJournal === null || s.journalId === selectedJournal;
    return matchesSearch && matchesJournal;
  });

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Shorts
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={selectedJournal ?? ""}
          onChange={(e) => setSelectedJournal(e.target.value === "" ? null : parseInt(e.target.value))}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Journals</option>
          {journals.map((j, idx) => (
            <option key={idx} value={idx}>{j.title}</option>
          ))}
        </select>
      </div>

      {/* Shorts Grid */}
      {filteredShorts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredShorts.map((s, idx) => (
            <ShortCard
              key={idx}
              id={idx}
              title={s.title}
              content={s.content}
              tags={s.tags}
              isPrivate={s.isPrivate}
              journalTitle={s.journalId !== undefined ? journals[s.journalId]?.title : undefined}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 mt-6">No shorts found.</p>
      )}
    </div>
  );
}
