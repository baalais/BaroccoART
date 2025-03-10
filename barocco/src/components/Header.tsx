"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "~/app/context/ThemeContext";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full backdrop-blur-md bg-white/30 dark:bg-black/30 z-50 fixed top-0 left-0">
      <div className="container mx-auto flex justify-between items-center py-6 px-4 md:px-8">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-4xl font-extrabold tracking-wide cursor-pointer text-black dark:text-white">
            Barocco Art
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/contact" className="text-lg hover:underline text-black dark:text-white">
            Kontakti
          </Link>
          <Link href="/services" className="text-lg hover:underline text-black dark:text-white">
            Pakalpojumi
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-black"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </nav>

        {/* Mobile Burger Icon */}
        <button
          className="md:hidden text-black dark:text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full backdrop-blur-md bg-white/30 dark:bg-black/30 py-4">
          <nav className="flex flex-col space-y-4 items-center">
            <button
              onClick={closeMenu}
              className="text-black dark:text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Link
              href="/contact"
              className="text-lg hover:underline text-black dark:text-white"
              onClick={closeMenu}
            >
              Kontakti
            </Link>
            <Link
              href="/services"
              className="text-lg hover:underline text-black dark:text-white"
              onClick={closeMenu}
            >
              Pakalpojumi
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-black"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;