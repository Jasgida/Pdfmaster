import React, { useState } from "react";

import axios from "axios";


function MergePdf() {

  const [file, setFile] = useState(null);


  const handleFileChange = (e) => {

    setFile(e.target.files[0]);

  };


  const handleUpload = async () => {

    if (!file) return alert("Please upload a file");


    const formData = new FormData();

    formData.append("file", file);


    try {

      // Use backend service name in Docker

      const response = await axios.post("http://backend:5000/merge", formData, {

        responseType: "blob",

      });


      // Trigger download

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "merged.pdf");

      document.body.appendChild(link);

      link.click();

    } catch (err) {

      console.error(err);

      alert("Error merging PDF");

    }

  };


  return (

    <div>

      <h2>Merge PDFs</h2>

      <input type="file" onChange={handleFileChange} />

      <button onClick={handleUpload}>Upload & Merge</button>

    </div>

  );

}


export default MergePdf;

