import React from "react";

import { Link } from "react-router-dom";


export default function Home() {

  const tools = [

    { name: "Summarize & Chat", path: "/summarize" },

    { name: "Merge PDFs", path: "/merge" },

    { name: "Split PDF", path: "/split" },

    { name: "Compress PDF", path: "/compress" },

    { name: "PDF → Word", path: "/pdf-to-word" },

    { name: "Word → PDF", path: "/word-to-pdf" },

  ];


  return (

    <div className="px-6 py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">

      {/* Hero Section */}

      <section className="text-center mb-16">

        <h2 className="text-4xl font-bold text-[#7b0c17] dark:text-red-400 mb-4">

          Welcome to Pdf-Masters

        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">

          Your all-in-one PDF toolkit. Summarize, merge, split, compress, and convert PDFs effortlessly.

        </p>

        <Link

          to="/summarize"

          className="px-6 py-3 bg-[#7b0c17] text-white font-semibold rounded-lg shadow hover:bg-[#a11a2a]"

        >

          Get Started

        </Link>

      </section>


      {/* Tools Grid */}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {tools.map((tool, i) => (

          <Link

            key={i}

            to={tool.path}

            className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition"

          >

            <h3 className="text-xl font-semibold text-[#7b0c17] dark:text-red-300 mb-2">

              {tool.name}

            </h3>

            <p className="text-gray-600 dark:text-gray-400">

              {`Quickly ${tool.name.toLowerCase()} with ease.`}

            </p>

          </Link>

        ))}

      </section>

    </div>

  );

}

