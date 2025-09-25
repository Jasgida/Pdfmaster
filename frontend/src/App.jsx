// frontend/src/App.jsx

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

import Terms from "./pages/Terms";

import Privacy from "./pages/Privacy";

import Contact from "./pages/Contact";


export default function App() {

  return (

    <Router>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/split" element={<SplitPdf />} />

        <Route path="/merge" element={<MergePdf />} />

        <Route path="/compress" element={<CompressPdf />} />

        <Route path="/word-to-pdf" element={<WordToPdf />} />

        <Route path="/pdf-to-word" element={<PdfToWord />} />

        <Route path="/summarize" element={<Summarize />} />

        <Route path="/terms" element={<Terms />} />

        <Route path="/privacy" element={<Privacy />} />

        <Route path="/contact" element={<Contact />} />

      </Routes>

    </Router>

  );

}

