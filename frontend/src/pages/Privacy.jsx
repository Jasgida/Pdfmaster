import React from "react";


export default function Privacy() {

  return (

    <div className="px-6 py-12 max-w-3xl mx-auto text-gray-800 dark:text-gray-200">

      <h2 className="text-3xl font-bold text-[#7b0c17] dark:text-red-400 mb-6">

        Privacy Policy

      </h2>

      <p className="mb-4">

        At <strong>Pdf-Masters</strong>, we respect your privacy. We do not store or share your files.

        All file processing is done securely and automatically, and your files are deleted after processing.

      </p>

      <p className="mb-4">

        We may collect basic usage statistics (like number of conversions) to improve our service, 

        but no personal data is ever stored without your consent.

      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400">

        Last updated: {new Date().toLocaleDateString()}

      </p>

    </div>

  );

}

