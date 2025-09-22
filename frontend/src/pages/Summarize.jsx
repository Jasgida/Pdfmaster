import { useState } from "react";

import axios from "axios";


function Summarize() {

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [summary, setSummary] = useState("");


  const handleUpload = async (e) => {

    e.preventDefault();

    if (!file) return alert("Please upload a PDF");


    const formData = new FormData();

    formData.append("file", file);


    setLoading(true);

    try {

      const res = await axios.post("http://localhost:5000/summarize", formData);

      setSummary(res.data.summary || "No summary generated.");

    } catch (err) {

      alert("Failed to summarize PDF");

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">

      <h1 className="text-xl font-bold mb-4 text-indigo-700">Summarize & Chat</h1>

      <form onSubmit={handleUpload}>

        <input

          type="file"

          accept="application/pdf"

          onChange={(e) => setFile(e.target.files[0])}

          className="block w-full mb-4"

        />

        <button

          type="submit"

          disabled={loading}

          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"

        >

          {loading ? "Summarizing..." : "Summarize"}

        </button>

      </form>

      {summary && (

        <div className="mt-4 p-4 bg-gray-100 rounded">

          <h2 className="font-semibold mb-2">Summary:</h2>

          <p>{summary}</p>

        </div>

      )}

    </div>

  );

}


export default Summarize;

