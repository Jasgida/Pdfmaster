import React, { useState } from "react";


export default function Summarize() {

  const [file, setFile] = useState(null);

  const [summary, setSummary] = useState("");

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!file) return alert("Select a PDF file");


    const formData = new FormData();

    formData.append("file", file);


    setLoading(true);

    try {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/summarize`, {

        method: "POST",

        body: formData,

      });


      if (!res.ok) throw new Error("Summarization failed");


      const data = await res.json();

      setSummary(data.summary || "No summary returned");

    } catch (err) {

      alert(err.message);

    }

    setLoading(false);

  };


  return (

    <div className="p-6 text-center">

      <h1 className="text-2xl font-bold mb-4">Summarize PDF</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input

          type="file"

          accept="application/pdf"

          onChange={(e) => setFile(e.target.files[0])}

          className="block mx-auto"

        />

        <button

          type="submit"

          disabled={loading}

          className="bg-red-900 text-white px-6 py-2 rounded hover:bg-red-700"

        >

          {loading ? "Processing..." : "Summarize"}

        </button>

      </form>


      {summary && (

        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded text-left max-w-2xl mx-auto">

          <h2 className="font-semibold mb-2">Summary:</h2>

          <p className="whitespace-pre-wrap">{summary}</p>

        </div>

      )}

    </div>

  );

}

