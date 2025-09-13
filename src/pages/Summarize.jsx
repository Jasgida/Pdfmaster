import React, { useState } from "react";


export default function Summarize() {

  const [file, setFile] = useState(null);

  const [summary, setSummary] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("pdf", file);


    const res = await fetch("http://localhost:5000/summarize", {

      method: "POST",

      body: formData,

    });


    if (res.ok) {

      const data = await res.json();

      setSummary(data.summary);

    }

  };


  return (

    <div className="max-w-xl mx-auto py-12 text-center">

      <h2 className="text-2xl font-bold mb-4">Summarize PDF</h2>

      <form onSubmit={handleSubmit}>

        <input

          type="file"

          accept="application/pdf"

          onChange={(e) => setFile(e.target.files[0])}

          className="mb-4"

        />

        <button className="bg-wine text-white px-6 py-2 rounded">

          Summarize

        </button>

      </form>

      {summary && (

        <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded">

          <h3 className="font-semibold mb-2">Summary:</h3>

          <p>{summary}</p>

        </div>

      )}

    </div>

  );

}

