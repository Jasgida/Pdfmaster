import React, { useState } from "react";

import { compressPdf } from "../api";


export default function CompressPdf() {

  const [file, setFile] = useState(null);


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!file) return;


    const blob = await compressPdf(file);

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "compressed.pdf";

    a.click();

  };


  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4 text-[#7b0c17]">Compress PDF</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input type="file" onChange={e => setFile(e.target.files[0])} />

        <button className="bg-[#4b0a0a] text-white px-4 py-2 rounded" type="submit">

          Compress PDF

        </button>

      </form>

    </div>

  );

}

