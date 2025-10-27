import { useState } from "react";

type Short = {
  title: string;
  content: string;
  isPrivate: boolean;
  journalId?: string;
  tags: string[];
};

export default function CreateJournal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a journal title.");
      return;
    }

    setSaving(true);

    const newJournal = {
      title,
      description,
      isPrivate,
      shorts: [] as Short[], // no shorts yet
      tags: [] as string[],  // starts empty
    };

    const savedJournals = JSON.parse(localStorage.getItem("journals") || "[]");
    localStorage.setItem("journals", JSON.stringify([...savedJournals, newJournal]));

    setTimeout(() => {
      setSaving(false);
      alert("Journal created successfully!");
      setTitle("");
      setDescription("");
      setIsPrivate(false);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Create a New Journal
      </h1>

      {/* Title */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Journal Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter journal title..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a short description..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 min-h-[120px]"
        />
      </div>

      {/* Privacy Toggle */}
      <div className="mb-8 flex items-center gap-2">
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
          {isPrivate ? "Only you can view this journal." : "Visible to everyone."}
        </span>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Journal"}
      </button>
    </div>
  );
}
