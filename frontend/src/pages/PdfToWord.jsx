import React, { useState } from "react";

import API_URL from "../api";


export default function PdfToWord() {

  const [file, setFile] = useState(null);


  const handleUpload = async () => {

    const formData = new FormData();

    formData.append("file", file);


    const res = await fetch(`${API_URL}/pdf-to-word`, {

      method: "POST",

      body: formData,

    });


    if (res.ok) {

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;

      a.download = "converted.docx";

      a.click();

    }

  };


  return (

    <div className="p-6">

      <h2 className="text-xl font-bold mb-4">Convert PDF to Word</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button

        className="bg-wine text-white px-4 py-2 rounded mt-4"

        onClick={handleUpload}

      >

        Convert

      </button>

    </div>

  );

}

