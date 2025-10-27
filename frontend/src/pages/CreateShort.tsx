import { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';
import CreatableSelect from "react-select/creatable";
import Select, { type GroupBase } from "react-select";

type Short = {
  title: string;
  content: string;
  isPrivate: boolean;
  journalId?: string;
  tags: string[];
};

type JournalOption = { value: string; label: string };
type TagOption = { value: string; label: string };

export default function CreateShort() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [journalId, setJournalId] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);
  const [allTags, setAllTags] = useState<TagOption[]>([]);
  const [journals, setJournals] = useState<JournalOption[]>([]);
  const [saving, setSaving] = useState(false);

  // Load existing journals and tags from localStorage
  useEffect(() => {
    const savedJournals = JSON.parse(localStorage.getItem("journals") || "[]");
    const options: JournalOption[] = savedJournals.map((j: any, index: number) => ({
      value: index.toString(),
      label: j.title,
    }));
    setJournals(options);

    const savedTags = JSON.parse(localStorage.getItem("journalTags") || "[]");
    setAllTags(savedTags);
  }, []);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    setSaving(true);

    const tags = Array.from(
      new Set(selectedTags.map((t) => t.label.trim().toLowerCase()))
    );

    const newShort: Short = {
      title,
      content,
      isPrivate,
      journalId: journalId || undefined,
      tags,
    };

    // Save short to localStorage
    const existingShorts = JSON.parse(localStorage.getItem("shorts") || "[]");
    localStorage.setItem("shorts", JSON.stringify([...existingShorts, newShort]));

    // Update global tags
    const updatedTags = Array.from(new Set([...allTags.map(t => t.label.toLowerCase()), ...tags]));
    const tagOptions: TagOption[] = updatedTags.map(t => ({ value: t, label: t }));
    setAllTags(tagOptions);
    localStorage.setItem("journalTags", JSON.stringify(tagOptions));

    // Add short to the assigned journal if any
    if (journalId !== null) {
      const savedJournals = JSON.parse(localStorage.getItem("journals") || "[]");
      const journalIndex = parseInt(journalId);
      if (savedJournals[journalIndex]) {
        if (!savedJournals[journalIndex].shorts) savedJournals[journalIndex].shorts = [];
        savedJournals[journalIndex].shorts.push(newShort);
        localStorage.setItem("journals", JSON.stringify(savedJournals));
      }
    }

    setTimeout(() => {
      setSaving(false);
      alert("Short created successfully!");
      setTitle("");
      setContent("");
      setIsPrivate(false);
      setJournalId(null);
      setSelectedTags([]);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Create a New Short
      </h1>

      {/* Short Title */}
      <div className="mb-5">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Short Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter short title..."
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Content */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Content
        </label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Write your short here..."
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg min-h-[300px] max-h-[60vh] overflow-y-auto prose prose-blue dark:prose-invert"
        />
      </div>

 {/* Journal Selection */}
<div className="mb-6">
  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
    Assign to Journal
  </label>
  <Select<JournalOption, false, GroupBase<JournalOption>>
    options={journals}
    value={journals.find(j => j.value === journalId)!} // required
    onChange={(option) => setJournalId(option!.value)} // required
    placeholder="Select a journal"
  />
</div>


      {/* Tags */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Tags
        </label>

        <CreatableSelect<TagOption, true, GroupBase<TagOption>>
  isMulti
  options={allTags}          // <-- TypeScript now knows TagOption[]
  value={selectedTags}       // <-- Use selectedTags here
  onChange={(tags) => setSelectedTags(tags as TagOption[])}
  placeholder="Type or create tags..."
  classNamePrefix="react-select"
  styles={{
    multiValue: () => ({ display: "none" }), // hide default chips
    control: (base) => ({
      ...base,
      minHeight: "40px",
      borderRadius: "8px",
      borderColor: "#CBD5E1",
      boxShadow: "none",
    }),
    input: (base) => ({ ...base, color: "#1E293B" }),
  }}
/>


        {/* Render selected tags below the input */}
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag.value}
              className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full shadow-sm"
            >
              {tag.label}
            </span>
          ))}
        </div>
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
          {isPrivate ? "Only you can view this short." : "Visible to everyone."}
        </span>
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
