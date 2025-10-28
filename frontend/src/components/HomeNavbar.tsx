import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"

export const HomeNavbar = () => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close on Esc key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [])

  // Disable scroll when menu open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "auto"
  }, [open])

  return (
    <header className="w-full border-b border-gray-200 bg-white z-50 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <h1 className="text-xl md:text-2xl font-bold tracking-tight">
          ✍️ Shorts & Journals
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-10 text-[15px] font-medium text-gray-700">
            <li className="hover:text-purple-600 cursor-pointer transition">About</li>
            <li className="hover:text-purple-600 cursor-pointer transition">Shorts</li>
            <li className="hover:text-purple-600 cursor-pointer transition">Journals</li>
            <li className="hover:text-purple-600 cursor-pointer transition">Features</li>
          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="hover:text-purple-600 transition font-medium">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition shadow-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden transition-all duration-300 overflow-hidden
        ${open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="flex flex-col gap-6 text-gray-700 font-medium text-lg px-6 pb-4 pt-2">
          <li className="hover:text-purple-600 cursor-pointer transition">About</li>
          <li className="hover:text-purple-600 cursor-pointer transition">Shorts</li>
          <li className="hover:text-purple-600 cursor-pointer transition">Journals</li>
          <li className="hover:text-purple-600 cursor-pointer transition">Features</li>

          <div className="flex flex-col gap-3 pt-2">
            <Link to="/login" className="text-purple-600 font-medium">
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition shadow-sm text-center"
            >
              Get Started
            </Link>
          </div>
        </ul>
      </div>
    </header>
  )
}
