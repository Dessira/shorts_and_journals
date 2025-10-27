import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  BookOpen,
  PenSquare,
  PlusCircle,
  Settings,
  User,
  Sun,
  Moon,
} from "lucide-react";

export default function Sidebar() {
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const toggleTheme = () => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
    setDarkMode(!darkMode);
  };

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  return (
    <aside className="w-64 min-h-screen border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Shorts & Journals
        </h2>

        <nav className="space-y-2">
          <NavLink to="view-shorts" className={linkClasses}>
            <BookOpen size={18} /> View Shorts
          </NavLink>
          <NavLink to="view-journals" className={linkClasses}>
            <PenSquare size={18} /> View Journals
          </NavLink>
          <NavLink to="create-short" className={linkClasses}>
            <PlusCircle size={18} /> Create Short
          </NavLink>
          <NavLink to="create-journal" className={linkClasses}>
            <PlusCircle size={18} /> Create Journal
          </NavLink>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-3">
        <NavLink to="profile" className={linkClasses}>
          <User size={18} /> Profile
        </NavLink>
        <NavLink to="settings" className={linkClasses}>
          <Settings size={18} /> Settings
        </NavLink>

        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </aside>
  );
}

