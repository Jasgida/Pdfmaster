import { useState } from "react";


export default function Summarize() {

  const [file, setFile] = useState(null);

  const [summary, setSummary] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!file) return;


    const formData = new FormData();

    formData.append("file", file);


    const res = await fetch("/summarize", { method: "POST", body: formData });

    const data = await res.json();

    setSummary(data.summary || "Error summarizing PDF.");

  };


  return (

    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      <h2 className="text-3xl font-bold text-center text-wine dark:text-wine-dark mb-8">

        Summarize & Chat

      </h2>

      <form

        onSubmit={handleSubmit}

        className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md"

      >

        <input

          type="file"

          accept="application/pdf"

          onChange={(e) => setFile(e.target.files[0])}

          className="w-full mb-4 p-2 border rounded-lg dark:bg-gray-700"

        />

        <button

          type="submit"

          className="w-full py-2 bg-wine hover:bg-wine-dark text-white rounded-lg"

        >

          Summarize

        </button>

      </form>

      {summary && (

        <div className="max-w-xl mx-auto mt-6 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">

          <h3 className="font-semibold mb-2">Summary:</h3>

          <p>{summary}</p>

        </div>

      )}

    </div>

  );

}

