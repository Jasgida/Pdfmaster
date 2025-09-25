import React, { useState } from "react";

import { pdfToWord } from "../api";


export default function PdfToWord() {

  const [file, setFile] = useState(null);


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!file) return;


    const blob = await pdfToWord(file);

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "converted.docx";

    a.click();

  };


  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4 text-[#7b0c17]">PDF → Word</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input type="file" onChange={e => setFile(e.target.files[0])} />

        <button className="bg-[#7b0c17] text-white px-4 py-2 rounded" type="submit">

          Convert

        </button>

      </form>

    </div>

  );

}

