import React, { useState } from "react";

import { downloadFile } from "../utils/downloadHelper";


export default function SplitPdf() {

  const [file, setFile] = useState(null);

  const [start, setStart] = useState("");

  const [end, setEnd] = useState("");

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!file || !start || !end) return alert("Provide file, start, and end pages");


    const formData = new FormData();

    formData.append("file", file);

    formData.append("start", start);

    formData.append("end", end);


    setLoading(true);

    await downloadFile("/split-pdf", formData);

    setLoading(false);

  };


  return (

    <div className="p-6 text-center">

      <h1 className="text-2xl font-bold mb-4">Split PDF</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input

          type="file"

          accept="application/pdf"

          onChange={(e) => setFile(e.target.files[0])}

          className="block mx-auto"

        />

        <div className="flex justify-center space-x-2">

          <input

            type="number"

            placeholder="Start page"

            value={start}

            onChange={(e) => setStart(e.target.value)}

            className="border px-2 py-1"

          />

          <input

            type="number"

            placeholder="End page"

            value={end}

            onChange={(e) => setEnd(e.target.value)}

            className="border px-2 py-1"

          />

        </div>

        <button

          type="submit"

          disabled={loading}

          className="bg-red-900 text-white px-6 py-2 rounded hover:bg-red-700"

        >

          {loading ? "Processing..." : "Split"}

        </button>

      </form>

    </div>

  );

}

