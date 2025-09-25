import React, { useState } from "react";

import { summarizePdf } from "../api";


export default function Summarize() {

  const [file, setFile] = useState(null);

  const [summary, setSummary] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!file) return;


    const data = await summarizePdf(file);

    setSummary(data.summary || "No summary returned");

  };


  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4 text-[#7b0c17]">Summarize PDF</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input type="file" onChange={e => setFile(e.target.files[0])} />

        <button className="bg-[#7b0c17] text-white px-4 py-2 rounded" type="submit">

          Summarize

        </button>

      </form>

      {summary && <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">{summary}</div>}

    </div>

  );

}

