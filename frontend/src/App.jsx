import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";


// Pages

import Home from "./pages/Home";

import SplitPdf from "./pages/SplitPdf";

import MergePdf from "./pages/MergePdf";

import CompressPdf from "./pages/CompressPdf";

import WordToPdf from "./pages/WordToPdf";

import PdfToWord from "./pages/PdfToWord";

import Summarize from "./pages/Summarize";

import Contact from "./pages/Contact";

import Privacy from "./pages/Privacy";

import Terms from "./pages/Terms";


export default function App() {

  return (

    <Router>

      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">

        {/* Navbar stays on top */}

        <Navbar />


        {/* Main content */}

        <main className="flex-grow container mx-auto px-4 py-6">

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/split" element={<SplitPdf />} />

            <Route path="/merge" element={<MergePdf />} />

            <Route path="/compress" element={<CompressPdf />} />

            <Route path="/word-to-pdf" element={<WordToPdf />} />

            <Route path="/pdf-to-word" element={<PdfToWord />} />

            <Route path="/summarize" element={<Summarize />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/privacy" element={<Privacy />} />

            <Route path="/terms" element={<Terms />} />

          </Routes>

        </main>


        {/* Footer */}

        <footer className="bg-red-900 text-white p-4 text-center">

          <div className="flex flex-wrap justify-center space-x-6">

            <a href="/contact" className="hover:text-yellow-400">Contact</a>

            <a href="/privacy" className="hover:text-yellow-400">Privacy</a>

            <a href="/terms" className="hover:text-yellow-400">Terms</a>

          </div>

          <p className="mt-2 text-sm">© {new Date().getFullYear()} Pdf-Masters</p>

        </footer>

      </div>

    </Router>

  );

}

