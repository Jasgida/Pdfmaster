import React from "react";

import { Link } from "react-router-dom";


// ✅ Lucide icons (replaced FileWord & FileInput with FileDown & FileUp)

import { FileText, Copy, Scissors, Shrink, FileDown, FileUp } from "lucide-react";


export default function Home() {

  const tools = [

    { name: "Summarize & Chat", path: "/summarize", icon: <FileText className="w-8 h-8 text-[#7b0c17] dark:text-red-300" /> },

    { name: "Merge PDFs", path: "/merge", icon: <Copy className="w-8 h-8 text-[#7b0c17] dark:text-red-300" /> },

    { name: "Split PDF", path: "/split", icon: <Scissors className="w-8 h-8 text-[#7b0c17] dark:text-red-300" /> },

    { name: "Compress PDF", path: "/compress", icon: <Shrink className="w-8 h-8 text-[#7b0c17] dark:text-red-300" /> },

    { name: "PDF → Word", path: "/pdf-to-word", icon: <FileDown className="w-8 h-8 text-[#7b0c17] dark:text-red-300" /> },

    { name: "Word → PDF", path: "/word-to-pdf", icon: <FileUp className="w-8 h-8 text-[#7b0c17] dark:text-red-300" /> },

  ];


  return (

    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Hero Section */}

      <section className="flex-grow px-6 py-12">

        <div className="text-center mb-16">

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

        </div>


        {/* Tools Grid */}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {tools.map((tool, i) => (

            <Link

              key={i}

              to={tool.path}

              className="p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transition flex flex-col items-center text-center"

            >

              <div className="mb-4">{tool.icon}</div>

              <h3 className="text-xl font-semibold text-[#7b0c17] dark:text-red-300 mb-2">

                {tool.name}

              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm">

                {`Quickly ${tool.name.toLowerCase()} with ease.`}

              </p>

            </Link>

          ))}

        </section>

      </section>


      {/* Footer */}

      <footer className="bg-[#7b0c17] dark:bg-[#4b0a0a] text-white py-6 mt-12">

        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">

          {/* Brand */}

          <h1 className="text-lg font-bold">Pdf-Masters</h1>


          {/* Links */}

          <div className="flex gap-6 mt-4 sm:mt-0 text-sm">

            <Link to="/privacy" className="hover:underline">

              Privacy Policy

            </Link>

            <Link to="/terms" className="hover:underline">

              Terms of Service

            </Link>

            <Link to="/contact" className="hover:underline">

              Contact

            </Link>

          </div>


          {/* Copyright */}

          <p className="mt-4 sm:mt-0 text-sm text-gray-200">

            © {new Date().getFullYear()} Pdf-Masters. All rights reserved.

          </p>

        </div>

      </footer>

    </div>

  );

}

