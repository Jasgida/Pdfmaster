import { useState } from "react";

import axios from "axios";


function MergePdf() {

  const [files, setFiles] = useState([]);

  const [loading, setLoading] = useState(false);


  const handleUpload = async (e) => {

    e.preventDefault();

    if (!files.length) return alert("Please upload at least 2 PDFs");


    const formData = new FormData();

    for (let f of files) {

      formData.append("files", f);

    }


    setLoading(true);

    try {

      const res = await axios.post("http://localhost:5000/merge-pdf", formData, {

        responseType: "blob",

      });


      // download file

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "merged.pdf");

      document.body.appendChild(link);

      link.click();

    } catch (err) {

      console.error(err);

      alert("Failed to merge PDFs");

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">

      <h1 className="text-xl font-bold mb-4 text-indigo-700">Merge PDFs</h1>

      <form onSubmit={handleUpload}>

        <input

          type="file"

          accept="application/pdf"

          multiple

          onChange={(e) => setFiles([...e.target.files])}

          className="block w-full mb-4"

        />

        <button

          type="submit"

          disabled={loading}

          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"

        >

          {loading ? "Merging..." : "Merge"}

        </button>

      </form>

    </div>

  );

}


export default MergePdf;

