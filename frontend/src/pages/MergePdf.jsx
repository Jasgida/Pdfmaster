import React, { useState } from "react";

import { downloadFile } from "../utils/downloadHelper";


export default function MergePdf() {

  const [files, setFiles] = useState([]);

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (files.length < 2) return alert("Please select at least 2 PDF files");


    const formData = new FormData();

    for (let f of files) formData.append("files", f);


    setLoading(true);

    await downloadFile("/merge-pdf", formData);

    setLoading(false);

  };


  return (

    <div className="p-6 text-center">

      <h1 className="text-2xl font-bold mb-4">Merge PDFs</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input

          type="file"

          accept="application/pdf"

          multiple

          onChange={(e) => setFiles([...e.target.files])}

          className="block mx-auto"

        />

        <button

          type="submit"

          disabled={loading}

          className="bg-red-900 text-white px-6 py-2 rounded hover:bg-red-700"

        >

          {loading ? "Processing..." : "Merge"}

        </button>

      </form>

    </div>

  );

}

