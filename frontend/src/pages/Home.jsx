import { useState, useEffect } from "react";

import { Link } from "react-router-dom";


export default function Home() {

  const [darkMode, setDarkMode] = useState(

    localStorage.getItem("theme") === "dark"

  );


  useEffect(() => {

    if (darkMode) {

      document.documentElement.classList.add("dark");

      localStorage.setItem("theme", "dark");

    } else {

      document.documentElement.classList.remove("dark");

      localStorage.setItem("theme", "light");

    }

  }, [darkMode]);


  const tools = [

    { name: "Summarize & Chat", path: "/summarize" },

    { name: "Merge PDFs", path: "/merge" },

    { name: "Split PDF", path: "/split" },

    { name: "Compress PDF", path: "/compress" },

    { name: "PDF to Word", path: "/pdf-to-word" },

    { name: "Word to PDF", path: "/word-to-pdf" },

  ];


  return (

    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">

      {/* Navbar */}

      <nav className="flex justify-between items-center p-6 shadow-sm bg-white dark:bg-gray-800">

        <h1 className="text-2xl font-bold text-wine dark:text-wine-dark">

          Pdf-Masters

        </h1>

        <div className="flex gap-6 text-gray-700 dark:text-gray-200 font-medium">

          {tools.map((tool) => (

            <Link key={tool.path} to={tool.path}>

              {tool.name}

            </Link>

          ))}

        </div>

        {/* Dark Mode Toggle */}

        <button

          onClick={() => setDarkMode(!darkMode)}

          className="ml-6 px-4 py-2 rounded-lg border bg-gray-200 dark:bg-gray-700 dark:border-gray-600"

        >

          {darkMode ? "‚òÄÔ∏è Light" : "Ì†ºÌºô Dark"}

        </button>

      </nav>


      {/* Hero Section */}

      <section className="text-center py-16">

        <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">

          All-in-One PDF Toolkit

        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">

          Convert, compress, split, merge, and summarize your PDFs with ease.

        </p>

        <Link

          to="/merge"

          className="px-6 py-3 bg-wine dark:bg-wine-dark text-white font-semibold rounded-lg shadow hover:opacity-90 transition"

        >

          Get Started

        </Link>

      </section>


      {/* Tools Grid */}

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 pb-16">

        {tools.map((tool) => (

          <Link

            key={tool.path}

            to={tool.path}

            className="p-8 border rounded-2xl shadow-md hover:shadow-lg bg-gray-50 dark:bg-gray-800 transition"

          >

            <h3 className="text-xl font-semibold text-wine dark:text-wine-dark mb-3">

              {tool.name}

            </h3>

            <p className="text-gray-600 dark:text-gray-300">

              Quickly {tool.name.toLowerCase()}.

            </p>

          </Link>

        ))}

      </section>

    </div>

  );

}

