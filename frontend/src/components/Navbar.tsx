export default function Navbar() {
    return (
      <header className="flex justify-between items-center bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-6 py-3 sticky top-0 z-10">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Shorts & Journals Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition">
            New Short
          </button>
          <button className="text-sm border border-gray-300 dark:border-gray-700 px-3 py-1.5 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            New Journal
          </button>
        </div>
      </header>
    );
  }
  