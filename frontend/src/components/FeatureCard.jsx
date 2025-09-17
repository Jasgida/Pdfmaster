import React, { useState } from 'react';


const FeatureCard = ({ title, description, icon }) => {

  const [file, setFile] = useState(null);

  const [isProcessing, setIsProcessing] = useState(false);

  const [downloadUrl, setDownloadUrl] = useState(null);


  const handleFileChange = (event) => {

    setFile(event.target.files[0]);

    setDownloadUrl(null);

  };


  const handleSubmit = async () => {

    if (!file) {

      alert('Please select a file first!');

      return;

    }


    setIsProcessing(true);

    const formData = new FormData();

    formData.append('file', file);


    let endpoint = '';

    switch (title) {

      case 'Summarize & Chat':

        endpoint = '/summarize';

        break;

      case 'Merge PDFs':

        formData.append('files', file); // Adjust frontend for multiple files if needed

        endpoint = '/merge';

        break;

      case 'Compress PDF':

        endpoint = '/compress';

        break;

      case 'Split PDF':

        endpoint = '/split';

        break;

      case 'PDF to Word':

        endpoint = '/pdf-to-word';

        break;

      case 'Word to PDF':

        endpoint = '/word-to-pdf';

        break;

      default:

        alert('Action not supported yet!');

        setIsProcessing(false);

        return;

    }


    try {

      const response = await fetch(endpoint, {

        method: 'POST',

        body: formData,

      });

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      setDownloadUrl(url);

      const link = document.createElement('a');

      link.href = url;

      link.download = `${title.toLowerCase().replace(' ', '-')}-${Date.now()}.pdf`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.error(`${title} error:`, error);

      alert(`An error occurred during ${title.toLowerCase()}. Check console for details.`);

    } finally {

      setIsProcessing(false);

    }

  };


  return (

    <div className="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-lg transition">

      <div className="text-3xl mb-4 text-blue-500">{icon}</div>

      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      <p className="text-gray-600 text-sm mb-4">{description}</p>

      <input

        type="file"

        className="mb-2 block w-full text-sm text-gray-600 border border-gray-300 rounded-md p-2"

        onChange={handleFileChange}

        disabled={isProcessing}

        multiple={title === 'Merge PDFs'}

      />

      <button

        className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"

        onClick={handleSubmit}

        disabled={isProcessing}

      >

        {isProcessing ? 'Processing...' : title.includes('Merge') ? 'Merge' : title.includes('Convert') ? 'Convert' : 'Process'}

      </button>

      {downloadUrl && <p className="mt-2 text-green-600">Download ready! <a href={downloadUrl} download>Click here</a></p>}

    </div>

  );

};


export default FeatureCard;
