export default function Footer() {
    return (
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          
          {/* Left Section */}
          <p>
            © {new Date().getFullYear()} <span className="font-semibold">Shorts & Journals</span>. All rights reserved.
          </p>
  
          {/* Center Links */}
          <div className="flex gap-6">
            <a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              About
            </a>
            <a href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              Privacy
            </a>
            <a href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              Terms
            </a>
            <a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              Contact
            </a>
          </div>
  
          {/* Socials */}
          <div className="flex gap-4">
            <a href="#" aria-label="Twitter" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M19.633 7.997c.013.18.013.362.013.543 0 5.54-4.217 11.92-11.92 11.92A11.86 11.86 0 0 1 2 18.29a8.36 8.36 0 0 0 6.14-1.72 4.18 4.18 0 0 1-3.9-2.9c.26.04.52.06.8.06.38 0 .76-.05 1.12-.14a4.17 4.17 0 0 1-3.34-4.09v-.05c.56.31 1.2.5 1.89.53A4.16 4.16 0 0 1 3.34 5.9a11.8 11.8 0 0 0 8.57 4.35 4.7 4.7 0 0 1-.1-.96A4.17 4.17 0 0 1 16 5.13a8.3 8.3 0 0 0 2.64-1.01 4.15 4.15 0 0 1-1.83 2.3 8.33 8.33 0 0 0 2.38-.65 8.75 8.75 0 0 1-2.47 2.18Z" />
              </svg>
            </a>
  
            <a href="#" aria-label="GitHub" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.02c-3.23.7-3.91-1.56-3.91-1.56a3.1 3.1 0 0 0-1.31-1.72c-1.07-.74.08-.73.08-.73a2.46 2.46 0 0 1 1.8 1.21 2.48 2.48 0 0 0 3.38.97 2.49 2.49 0 0 1 .74-1.56c-2.57-.29-5.28-1.28-5.28-5.72A4.47 4.47 0 0 1 6.56 6.5a4.14 4.14 0 0 1 .11-3.06s.97-.31 3.18 1.18a10.9 10.9 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18a4.14 4.14 0 0 1 .11 3.06 4.47 4.47 0 0 1 1.18 3.11c0 4.46-2.72 5.43-5.31 5.71.42.36.8 1.06.8 2.15v3.18c0 .31.21.66.8.55A11.5 11.5 0 0 0 12 .5Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    );
  }
  