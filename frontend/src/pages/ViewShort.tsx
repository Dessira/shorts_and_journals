import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

type Short = {
  title: string;
  content: string;
  isPrivate: boolean;
  journalId?: string;
  tags: string[];
};

type Journal = {
  title: string;
  description: string;
};

export default function ViewShort() {
  const { id } = useParams(); // Short index in localStorage
  const navigate = useNavigate();
  const [short, setShort] = useState<Short | null>(null);
  const [journal, setJournal] = useState<Journal | null>(null);

  useEffect(() => {
    const shorts: Short[] = JSON.parse(localStorage.getItem("shorts") || "[]");
    const s = shorts[parseInt(id || "0")];
    if (s) {
      setShort(s);

      if (s.journalId !== undefined) {
        const journals: Journal[] = JSON.parse(localStorage.getItem("journals") || "[]");
        const j = journals[parseInt(s.journalId)];
        if (j) setJournal(j);
      }
    } else {
      alert("Short not found.");
      navigate("/dashboard");
    }
  }, [id, navigate]);

  if (!short) return null;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {short.title}
      </h1>

      {/* Journal */}
      {journal && (
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Part of journal: <span className="font-medium">{journal.title}</span>
        </p>
      )}

      {/* Privacy */}
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        {short.isPrivate ? "Private Short" : "Public Short"}
      </p>

      {/* Content */}
      <div
        className="prose prose-blue dark:prose-invert bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-700 mb-6"
        dangerouslySetInnerHTML={{ __html: short.content }}
      ></div>

      {/* Tags */}
      {short.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {short.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
