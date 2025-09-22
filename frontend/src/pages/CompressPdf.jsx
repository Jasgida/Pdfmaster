import { useState } from "react";

import axios from "axios";


function CompressPdf() {

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);


  const handleUpload = async (e) => {

    e.preventDefault();

    if (!file) return alert("Please upload a PDF");


    const formData = new FormData();

    formData.append("file", file);


    setLoading(true);

    try {

      const res = await axios.post("http://localhost:5000/compress-pdf", formData, {

        responseType: "blob",

      });

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "compressed.pdf");

      document.body.appendChild(link);

      link.click();

    } catch (err) {

      alert("Failed to compress PDF");

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">

      <h1 className="text-xl font-bold mb-4 text-indigo-700">Compress PDF</h1>

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

          {loading ? "Compressing..." : "Compress"}

        </button>

      </form>

    </div>

  );

}


export default CompressPdf;

