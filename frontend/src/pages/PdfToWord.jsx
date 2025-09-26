import React, { useState } from "react";


export default function PdfToWord() {

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!file) return alert("Select a PDF file");


    const formData = new FormData();

    formData.append("file", file);


    setLoading(true);

    try {

      const res = await fetch(`${import.meta.env.VITE_API_URL}/pdf-to-word`, {

        method: "POST",

        body: formData,

      });


      if (!res.ok) throw new Error("Conversion failed");


      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;

      a.download = "converted.docx";

      document.body.appendChild(a);

      a.click();

      a.remove();

    } catch (err) {

      alert(err.message);

    }

    setLoading(false);

  };


  return (

    <div className="p-6 text-center">

      <h1 className="text-2xl font-bold mb-4">PDF → Word</h1>

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

          {loading ? "Processing..." : "Convert"}

        </button>

      </form>

    </div>

  );

}

