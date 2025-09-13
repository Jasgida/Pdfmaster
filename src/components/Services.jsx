import React from "react";


const services = [

  {

    title: "Summarize & Chat",

    description:

      "Unlock insights from your documents instantly. Our AI-powered tool summarizes dense reports and lets you chat with your PDF to find answers fast.",

  },

  {

    title: "Merge PDFs",

    description:

      "Combine multiple PDFs into a single, organized document. Simplify your workflow securely and efficiently.",

  },

  {

    title: "Split PDF",

    description:

      "Extract specific pages or split large PDFs into smaller files. Manage your documents with precision.",

  },

  {

    title: "Compress PDF",

    description:

      "Reduce file size without losing quality. Make your documents easier to email, store, and share.",

  },

  {

    title: "PDF to Word",

    description:

      "Convert your PDFs into editable Word documents while preserving formatting.",

  },

  {

    title: "Word to PDF",

    description:

      "Turn your Word files into secure, professional PDFs that look the same on every device.",

  },

];


const Services = () => {

  return (

    <section className="py-16 px-6 bg-white dark:bg-gray-900">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {services.map((service, index) => (

          <div

            key={index}

            className="p-6 rounded-xl shadow-md border bg-gray-50 dark:bg-gray-800 dark:border-gray-700"

          >

            <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">

              {service.title}

            </h3>

            <p className="text-gray-600 dark:text-gray-300">

              {service.description}

            </p>

          </div>

        ))}

      </div>

    </section>

  );

};


export default Services;

