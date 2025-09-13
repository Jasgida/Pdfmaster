import React, { useState } from "react";


export default function Merge() {

  const [files, setFiles] = useState(null);


  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    for (let file of files) {

      formData.append("pdfs", file);

    }


    const res = await fetch("http://localhost:5000/merge", {

      method: "POST",

      body: formData,

    });


    if (res.ok) {

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;

      a.download = "merged.pdf";

      a.click();

    }

  };


  return (

    <div className="max-w-xl mx-auto py-12 text-center">

      <h2 className="text-2xl font-bold mb-4">Merge PDFs</h2>

      <form onSubmit={handleSubmit}>

        <input

          type="file"

          multiple

          accept="application/pdf"

          onChange={(e) => setFiles(e.target.files)}

          className="mb-4"

        />

        <button className="bg-wine text-white px-6 py-2 rounded">

          Merge & Download

        </button>

      </form>

    </div>

  );

}

