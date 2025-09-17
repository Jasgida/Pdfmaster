import React, { useState } from "react";

import axios from "axios";


function MergePdf() {

  const [file1, setFile1] = useState(null);

  const [file2, setFile2] = useState(null);

  const [loading, setLoading] = useState(false);


  const handleUpload = async () => {

    if (!file1 || !file2) {

      alert("Please upload two PDF files.");

      return;

    }


    const formData = new FormData();

    formData.append("file1", file1);

    formData.append("file2", file2);


    try {

      setLoading(true);

      const response = await axios.post("http://localhost:5000/api/merge", formData, {

        responseType: "blob",

      });


      // Automatic download

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "merged.pdf");

      document.body.appendChild(link);

      link.click();

    } catch (error) {

      console.error("Error merging PDFs:", error);

      alert("Failed to merge PDFs");

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="p-6 text-center">

      <h1 className="text-2xl font-bold mb-4">Merge PDFs</h1>

      <input type="file" accept="application/pdf" onChange={(e) => setFile1(e.target.files[0])} />

      <input type="file" accept="application/pdf" onChange={(e) => setFile2(e.target.files[0])} />

      <button

        onClick={handleUpload}

        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"

        disabled={loading}

      >

        {loading ? "Processing..." : "Merge"}

      </button>

    </div>

  );

}


export default MergePdf;

