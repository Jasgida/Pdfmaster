import React, { useState } from "react";


export default function CompressPdf() {

  const [file, setFile] = useState(null);


  const handleCompress = async () => {

    if (!file) return alert("Please upload a PDF");


    const formData = new FormData();

    formData.append("file", file);


    const response = await fetch("http://localhost:3000/compress-pdf", {

      method: "POST",

      body: formData,

    });


    if (!response.ok) {

      alert("Error compressing PDF");

      return;

    }


    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "compressed.pdf";

    link.click();

  };


  return (

    <div className="p-6 text-center">

      <h1 className="text-2xl font-bold mb-4">Compress PDF</h1>

      <input

        type="file"

        accept="application/pdf"

        onChange={(e) => setFile(e.target.files[0])}

        className="mb-4"

      />

      <button

        onClick={handleCompress}

        className="bg-purple-500 text-white px-4 py-2 rounded"

      >

        Compress

      </button>

    </div>

  );

}

