import { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Select from "react-select";

type JournalOption = { value: string; label: string };
type Short = {
  title: string;
  content: string;
  isPrivate: boolean;
  journalId: string;
};

// Mock backend journals
const fetchJournals = async (): Promise<JournalOption[]> => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { value: "1", label: "Travel Reflections" },
          { value: "2", label: "Morning Pages" },
          { value: "3", label: "Gratitude Journal" },
        ]),
      500
    )
  );
};

export default function CreateShort() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [journals, setJournals] = useState<JournalOption[]>([]);
  const [selectedJournal, setSelectedJournal] = useState<JournalOption | null>(
    null
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchJournals().then(setJournals);
  }, []);

  const handleSave = async () => {
    if (!title.trim() || !content.trim() || !selectedJournal) {
      alert("Please complete all fields before saving.");
      return;
    }

    setSaving(true);
    const newShort: Short = {
      title,
      content,
      isPrivate,
      journalId: selectedJournal.value,
    };

    // Simulate saving to pseudo-backend (localStorage)
    const existing = JSON.parse(localStorage.getItem("shorts") || "[]");
    localStorage.setItem("shorts", JSON.stringify([...existing, newShort]));

    setTimeout(() => {
      setSaving(false);
      alert("Short saved successfully!");
      setTitle("");
      setContent("");
      setSelectedJournal(null);
      setIsPrivate(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Create a New Short
      </h1>

      {/* Short Name */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Short Name
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a title for your short..."
        />
      </div>

      {/* Journal Selector */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Select Journal
        </label>
        <Select
          options={journals}
          value={selectedJournal}
          onChange={setSelectedJournal}
          placeholder="Search or select a journal..."
          className="text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Privacy Toggle */}
      <div className="mb-6 flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Private
        </label>
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={(e) => setIsPrivate(e.target.checked)}
          className="w-5 h-5 accent-blue-600"
        />
        <span className="text-gray-500 text-sm">
          {isPrivate ? "Only you can view this short." : "Visible to everyone."}
        </span>
      </div>

      {/* Rich Text Editor */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Short Content
        </label>
        <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        placeholder="Write your short here..."
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg min-h-[400px] max-h-[70vh] overflow-y-auto prose prose-blue  dark:prose-invert"
/>

      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Short"}
      </button>
    </div>
  );
}
