import { Link } from "react-router-dom";


export default function Home() {

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">

      <h1 className="text-4xl font-bold mb-6 text-wine dark:text-red-400">Pdf-Masters</h1>

      <p className="mb-10 text-lg text-gray-600 dark:text-gray-300">Your all-in-one PDF toolkit</p>


      {/* Grid of Tools */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">

        <ToolCard title="Summarize & Chat" link="/summarize" />

        <ToolCard title="Merge PDFs" link="/merge" />

        <ToolCard title="Split PDFs" link="/split" />

        <ToolCard title="Compress PDF" link="/compress" />

        <ToolCard title="PDF → Word" link="/pdf-to-word" />

        <ToolCard title="Word → PDF" link="/word-to-pdf" />

      </div>

    </div>

  );

}


function ToolCard({ title, link }) {

  return (

    <Link

      to={link}

      className="p-6 rounded-xl shadow-lg bg-gray-100 dark:bg-gray-800 hover:bg-wine hover:text-white transition flex items-center justify-center text-lg font-semibold"

    >

      {title}

    </Link>

  );

}

