import React, { useState } from "react";

import { splitPdf } from "../api";


export default function SplitPdf() {

  const [file, setFile] = useState(null);

  const [startPage, setStartPage] = useState(1);

  const [endPage, setEndPage] = useState(1);


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!file) return;


    const blob = await splitPdf(file, startPage, endPage);

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "split.pdf";

    a.click();

  };


  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4 text-[#7b0c17]">Split PDF</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input type="file" onChange={e => setFile(e.target.files[0])} />

        <div className="flex space-x-2">

          <input

            type="number"

            value={startPage}

            onChange={e => setStartPage(e.target.value)}

            placeholder="Start Page"

            className="border p-2 rounded"

          />

          <input

            type="number"

            value={endPage}

            onChange={e => setEndPage(e.target.value)}

            placeholder="End Page"

            className="border p-2 rounded"

          />

        </div>

        <button className="bg-[#7b0c17] text-white px-4 py-2 rounded" type="submit">

          Split PDF

        </button>

      </form>

    </div>

  );

}

