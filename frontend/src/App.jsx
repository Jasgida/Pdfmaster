import React, { useState } from "react";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Home from "./pages/Home";

import Summarize from "./pages/Summarize";

import MergePdf from "./pages/MergePdf";

import SplitPdf from "./pages/SplitPdf";

import CompressPdf from "./pages/CompressPdf";

import PdfToWord from "./pages/PdfToWord";

import WordToPdf from "./pages/WordToPdf";


function App() {

  const [darkMode, setDarkMode] = useState(false);


  return (

    <Router>

      <div className={darkMode ? "dark bg-gray-900 text-gray-100" : "bg-white text-gray-900"}>

        

        {/* ‚úÖ Only one navbar now */}

        <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-[#7b0c17] dark:bg-[#4b0a0a]">

          {/* Brand */}

          <h1 className="text-2xl font-bold text-white">

            Pdf-Masters

          </h1>


          {/* Navigation Links */}

          <div className="flex gap-6 text-white font-medium">

            <Link to="/summarize">Summarize & Chat</Link>

            <Link to="/merge">Merge PDFs</Link>

            <Link to="/split">Split PDF</Link>

            <Link to="/compress">Compress</Link>

            <Link to="/pdf-to-word">PDF ‚Üí Word</Link>

            <Link to="/word-to-pdf">Word ‚Üí PDF</Link>

          </div>


          {/* Dark/Light Toggle */}

          <button

            onClick={() => setDarkMode(!darkMode)}

            className="ml-6 px-4 py-2 rounded-lg border border-white bg-white text-[#7b0c17] 

                       hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-300 dark:text-gray-200"

          >

            {darkMode ? "‚òÄÔ∏è Light" : "Ì†ºÌºô Dark"}

          </button>

        </nav>


        {/* Pages */}

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/summarize" element={<Summarize />} />

          <Route path="/merge" element={<MergePdf />} />

          <Route path="/split" element={<SplitPdf />} />

          <Route path="/compress" element={<CompressPdf />} />

          <Route path="/pdf-to-word" element={<PdfToWord />} />

          <Route path="/word-to-pdf" element={<WordToPdf />} />

        </Routes>

      </div>

    </Router>

  );

}


export default App;

