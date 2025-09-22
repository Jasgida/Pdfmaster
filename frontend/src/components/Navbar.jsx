import { Link } from "react-router-dom";


function Navbar() {

  return (

    <nav className="bg-indigo-600 text-white shadow">

      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        <Link to="/" className="text-xl font-bold tracking-wide">

          Pdfmaster

        </Link>

        <div className="space-x-4">

          <Link to="/" className="hover:text-gray-200">Home</Link>

          <Link to="/merge" className="hover:text-gray-200">Merge</Link>

          <Link to="/split" className="hover:text-gray-200">Split</Link>

          <Link to="/compress" className="hover:text-gray-200">Compress</Link>

          <Link to="/word-to-pdf" className="hover:text-gray-200">Word → PDF</Link>

          <Link to="/pdf-to-word" className="hover:text-gray-200">PDF → Word</Link>

          <Link to="/summarize" className="hover:text-gray-200">Summarize</Link>

        </div>

      </div>

    </nav>

  );

}


export default Navbar;

