// src/pages/PdfToWord.jsx

import React, { useState } from "react";


export default function PdfToWord() {

  const [file, setFile] = useState(null);


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!file) return;


    const formData = new FormData();

    formData.append("pdf", file);


    const res = await fetch("http://localhost:5000/pdf-to-word", {

      method: "POST",

      body: formData,

    });


    if (res.ok) {

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;

      a.download = "converted.docx";

      a.click();

    }

  };


  return (

    <div className="max-w-xl mx-auto py-12 text-center">

      <h2 className="text-2xl font-bold mb-4">Convert PDF to Word</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input

          type="file"

          accept="application/pdf"

          onChange={(e) => setFile(e.target.files[0])}

          className="block mx-auto"

        />

        <button

          type="submit"

          className="bg-wine text-white px-6 py-2 rounded shadow-md hover:bg-wine/80 transition"

        >

          Convert & Download

        </button>

      </form>

    </div>

  );

}

