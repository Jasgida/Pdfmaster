import React, { useState } from "react";

import axios from "axios";


function MergePdf() {

  const [files, setFiles] = useState([]);


  const handleFileChange = (e) => setFiles(Array.from(e.target.files));


  const handleUpload = async () => {

    if (!files.length) return alert("Please upload at least one file");

    const formData = new FormData();

    files.forEach((file) => formData.append("pdfs", file));

    try {

      const response = await axios.post("https://pdf-masters.com/api/merge", formData, {

        responseType: "blob",

      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "merged.pdf");

      document.body.appendChild(link);

      link.click();

    } catch (err) {

      console.error("Merge error:", err);

      alert("Error merging PDFs: " + (err.response?.data?.error || err.message));

    }

  };


  return (

    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg max-w-2xl mx-auto">

      <h2 className="text-2xl font-bold text-wine mb-4">Merge PDFs</h2>

      <input type="file" multiple onChange={handleFileChange} className="mt-4 block w-full" />

      <button onClick={handleUpload} className="mt-4 bg-wine text-white px-4 py-2 rounded hover:bg-wine-dark">

        Upload & Merge

      </button>

    </div>

  );

}


export default MergePdf;
