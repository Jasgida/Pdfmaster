import { useState } from "react";


export default function PdfToWord() {

  const [file, setFile] = useState(null);


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!file) return;


    const formData = new FormData();

    formData.append("file", file);


    const res = await fetch("/pdf-to-word", { method: "POST", body: formData });

    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "converted.docx";

    a.click();

  };


  return (

    <div className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      <h2 className="text-3xl font-bold text-center text-wine dark:text-wine-dark mb-8">

        PDF to Word

      </h2>

      <form

        onSubmit={handleSubmit}

        className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md"

      >

        <input

          type="file"

          accept="application/pdf"

          onChange={(e) => setFile(e.target.files[0])}

          className="w-full mb-4 p-2 border rounded-lg dark:bg-gray-700"

        />

        <button

          type="submit"

          className="w-full py-2 bg-wine hover:bg-wine-dark text-white rounded-lg"

        >

          Convert

        </button>

      </form>

    </div>

  );

}

