import React from 'react';

import FeatureCard from './components/FeatureCard';


const features = [

  { title: 'Summarize & Chat', description: 'Use AI to summarize and ask questions about your PDF documents.', icon: 'í ¾í· ' },

  { title: 'Merge PDFs', description: 'Combine multiple PDF files into one.', icon: 'í ½í³Ž' },

  { title: 'Compress PDF', description: 'Reduce the file size of your PDF documents.', icon: 'í ½í·œï¸' },

  { title: 'Split PDF', description: 'Extract pages or split a PDF into multiple files.', icon: 'âœ‚ï¸' },

  { title: 'PDF to Word', description: 'Convert a PDF file to a Word document.', icon: 'í ½í³„âž¡ï¸í ½í³' },

  { title: 'Word to PDF', description: 'Convert a Word document to a PDF file.', icon: 'í ½í³âž¡ï¸í ½í³„' },

];


const App = () => {

  return (

    <div className="min-h-screen bg-gray-50 p-6">

      <header className="flex justify-between items-center mb-10">

        <div className="text-2xl font-bold text-blue-600">í ½í³„ Pdfmaster</div>

        <nav className="space-x-6 text-gray-600 text-sm">

          <a href="#">Summarize & Chat</a>

          <a href="#">Merge</a>

          <a href="#">Split</a>

          <a href="#">Compress</a>

          <a href="#">Convert</a>

        </nav>

      </header>


      <main className="text-center">

        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Pdfmaster</h1>

        <p className="text-gray-600 mb-12">Your all-in-one solution for PDF management.</p>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {features.map((feature) => (

            <FeatureCard key={feature.title} {...feature} />

          ))}

        </div>

      </main>

    </div>

  );

};


export default App;
