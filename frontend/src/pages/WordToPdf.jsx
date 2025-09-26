import React, { useState } from "react";

import { downloadFile } from "../utils/downloadHelper";


export default function WordToPdf() {

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!file) return alert("Please select a Word file");


    const formData = new FormData();

    formData.append("file", file);


    setLoading(true);

    await downloadFile("/word-to-pdf", formData);

    setLoading(false);

  };


  return (

    <div className="p-6 text-center">

      <h1 className="text-2xl font-bold mb-4">Word → PDF</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input

          type="file"

          accept=".doc,.docx"

          onChange={(e) => setFile(e.target.files[0])}

          className="block mx-auto"

        />

        <button

          type="submit"

          disabled={loading}

          className="bg-red-900 text-white px-6 py-2 rounded hover:bg-red-700"

        >

          {loading ? "Processing..." : "Convert"}

        </button>

      </form>

    </div>

  );

}

