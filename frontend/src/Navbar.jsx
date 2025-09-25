import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";


export default function Navbar() {

  const [darkMode, setDarkMode] = useState(false);


  // Persist dark mode preference in localStorage

  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add("dark");

      localStorage.setItem("darkMode", "true");

    } else {

      document.documentElement.classList.remove("dark");

      localStorage.setItem("darkMode", "false");

    }

  }, [darkMode]);


  // Load saved preference on mount

  useEffect(() => {

    const savedMode = localStorage.getItem("darkMode") === "true";

    setDarkMode(savedMode);

  }, []);


  return (

    <nav className="bg-red-900 dark:bg-gray-900 text-white shadow">

      <div className="container mx-auto flex flex-wrap items-center justify-between p-4">

        {/* Logo */}

        <Link to="/" className="text-xl font-bold text-white">

          Pdf-Masters

        </Link>


        {/* Main Links */}

        <div className="flex items-center space-x-4">

          <Link to="/" className="hover:text-yellow-400 transition-colors duration-200">

            Home

          </Link>

          <Link to="/split" className="hover:text-yellow-400 transition-colors duration-200">

            Split

          </Link>

          <Link to="/merge" className="hover:text-yellow-400 transition-colors duration-200">

            Merge

          </Link>

          <Link to="/compress" className="hover:text-yellow-400 transition-colors duration-200">

            Compress

          </Link>

          <Link to="/word-to-pdf" className="hover:text-yellow-400 transition-colors duration-200">

            Word → PDF

          </Link>

          <Link to="/pdf-to-word" className="hover:text-yellow-400 transition-colors duration-200">

            PDF → Word

          </Link>

          <Link to="/summarize" className="hover:text-yellow-400 transition-colors duration-200">

            Summarize

          </Link>


          {/* Dark Mode Toggle */}

          <button

            onClick={() => setDarkMode(!darkMode)}

            className="ml-4 px-3 py-1 rounded bg-white dark:bg-gray-700 text-red-900 dark:text-white transition-colors duration-200"

          >

            {darkMode ? "Light Mode" : "Dark Mode"}

          </button>

        </div>

      </div>

    </nav>

  );

}

