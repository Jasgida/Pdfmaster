// src/components/Navbar.jsx

import React from "react";


export default function Navbar() {

  return (

    <nav className="bg-gray-100 dark:bg-gray-800 shadow px-6 py-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold text-wine">Pdfmaster</h1>

      <div className="space-x-4">

        <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-wine">Home</a>

        <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-wine">Features</a>

        <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-wine">About</a>

      </div>

    </nav>

  );

}

