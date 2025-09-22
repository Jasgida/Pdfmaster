import { Link } from "react-router-dom";


const tools = [

  { title: "Summarize & Chat", link: "/summarize" },

  { title: "Merge PDFs", link: "/merge" },

  { title: "Split PDFs", link: "/split" },

  { title: "Compress PDF", link: "/compress" },

  { title: "Word → PDF", link: "/word-to-pdf" },

  { title: "PDF → Word", link: "/pdf-to-word" },

];


function Home() {

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

      {tools.map((tool, index) => (

        <Link

          key={index}

          to={tool.link}

          className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition duration-200"

        >

          <h2 className="text-lg font-semibold text-indigo-700">{tool.title}</h2>

        </Link>

      ))}

    </div>

  );

}


export default Home;

