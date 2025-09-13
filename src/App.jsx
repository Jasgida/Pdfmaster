// src/App.jsx

import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import Navbar from "./components/Navbar";

import MergePdf from "./pages/MergePdf";

import SplitPdf from "./pages/SplitPdf";

import CompressPdf from "./pages/CompressPdf";

import SummarizePdf from "./pages/SummarizePdf";

import WordToPdf from "./pages/WordToPdf";

import PdfToWord from "./pages/PdfToWord";


export default function App() {

  return (

    <Router>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

        <Navbar />


        {/* Hero Section */}

        <header className="text-center py-16 bg-gray-100 dark:bg-gray-800">

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-wine">

            The Ultimate PDF Toolkit – Fast, Secure & Powerful

          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">

            No ads, no signups. Just smart tools to make your documents easier to handle.

          </p>


          {/* Main action buttons */}

          <div className="flex flex-wrap justify-center gap-4">

            <Link

              to="/merge"

              className="bg-wine text-white px-6 py-3 rounded-lg shadow-md hover:bg-wine/80 transition"

            >

              Merge PDFs

            </Link>

            <Link

              to="/split"

              className="bg-wine text-white px-6 py-3 rounded-lg shadow-md hover:bg-wine/80 transition"

            >

              Split PDF

            </Link>

            <Link

              to="/compress"

              className="bg-wine text-white px-6 py-3 rounded-lg shadow-md hover:bg-wine/80 transition"

            >

              Compress PDF

            </Link>

            <Link

              to="/summarize"

              className="bg-wine text-white px-6 py-3 rounded-lg shadow-md hover:bg-wine/80 transition"

            >

              Summarize PDF

            </Link>

            <Link

              to="/word-to-pdf"

              className="bg-wine text-white px-6 py-3 rounded-lg shadow-md hover:bg-wine/80 transition"

            >

              Word → PDF

            </Link>

            <Link

              to="/pdf-to-word"

              className="bg-wine text-white px-6 py-3 rounded-lg shadow-md hover:bg-wine/80 transition"

            >

              PDF → Word

            </Link>

          </div>

        </header>


        {/* Routes */}

        <Routes>

          <Route path="/merge" element={<MergePdf />} />

          <Route path="/split" element={<SplitPdf />} />

          <Route path="/compress" element={<CompressPdf />} />

          <Route path="/summarize" element={<SummarizePdf />} />

          <Route path="/word-to-pdf" element={<WordToPdf />} />

          <Route path="/pdf-to-word" element={<PdfToWord />} />

        </Routes>

      </div>

    </Router>

  );

}

