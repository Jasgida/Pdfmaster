import React from "react";


export default function Terms() {

  return (

    <div className="px-6 py-12 max-w-3xl mx-auto text-gray-800 dark:text-gray-200">

      <h2 className="text-3xl font-bold text-[#7b0c17] dark:text-red-400 mb-6">

        Terms of Service

      </h2>

      <p className="mb-4">

        By using <strong>Pdf-Masters</strong>, you agree to use the service responsibly.

        You may not use this service for illegal purposes or to distribute harmful files.

      </p>

      <p className="mb-4">

        We provide this service “as is” without warranties. We are not responsible for any

        data loss or misuse of the platform. Please ensure you keep backups of important files.

      </p>

      <p className="text-sm text-gray-500 dark:text-gray-400">

        Last updated: {new Date().toLocaleDateString()}

      </p>

    </div>

  );

}

