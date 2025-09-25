import React, { useState } from "react";

import { mergePdfs } from "../api";


export default function MergePdf() {

  const [files, setFiles] = useState([]);


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (files.length === 0) return;


    const blob = await mergePdfs(Array.from(files));

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "merged.pdf";

    a.click();

  };


  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4 text-[#7b0c17]">Merge PDFs</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input type="file" multiple onChange={e => setFiles(e.target.files)} />

        <button className="bg-[#7b0c17] text-white px-4 py-2 rounded" type="submit">

          Merge PDFs

        </button>

      </form>

    </div>

  );

}

