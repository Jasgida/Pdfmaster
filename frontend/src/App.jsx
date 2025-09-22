import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import MergePdf from "./pages/MergePdf";

import SplitPdf from "./pages/SplitPdf";

import CompressPdf from "./pages/CompressPdf";

import WordToPdf from "./pages/WordToPdf";

import PdfToWord from "./pages/PdfToWord";

import Summarize from "./pages/Summarize";


function App() {

  return (

    <Router>

      <div className="min-h-screen bg-gray-50">

        <Navbar />

        <div className="container mx-auto px-4 py-6">

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/merge" element={<MergePdf />} />

            <Route path="/split" element={<SplitPdf />} />

            <Route path="/compress" element={<CompressPdf />} />

            <Route path="/word-to-pdf" element={<WordToPdf />} />

            <Route path="/pdf-to-word" element={<PdfToWord />} />

            <Route path="/summarize" element={<Summarize />} />

          </Routes>

        </div>

      </div>

    </Router>

  );

}


export default App;

