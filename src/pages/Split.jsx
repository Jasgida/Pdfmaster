import React, { useState } from "react";


export default function Split() {

  const [file, setFile] = useState(null);


  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("pdf", file);


    const res = await fetch("http://localhost:5000/split", {

      method: "POST",

      body: formData,

    });


    if (res.ok) {

      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;

      a.download = "split.pdf";

      a.click();

    }

  };


  return (

    <div className="max-w-xl mx-auto py-12 text-center">

      <h2 className="text-2xl font-bold mb-4">Split PDF</h2>

      <form onSubmit={handleSubmit}>

        <input

          type="file"

          accept="application/pdf"

          onChange={(e) => setFile(e.target.files[0])}

          className="mb-4"

        />

        <button className="bg-wine text-white px-6 py-2 rounded">

          Split & Download

        </button>

      </form>

    </div>

  );

}

