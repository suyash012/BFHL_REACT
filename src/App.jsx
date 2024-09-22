import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  // Function to convert file to Base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]); // Extract Base64 part
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    setError('');
    try {
      const parsedData = JSON.parse(jsonInput); // Validate JSON input
      
      let fileBase64 = null;
      if (file) {
        // Convert file to Base64
        fileBase64 = await convertToBase64(file);
      }

      // Create the request payload
      const payload = {
        data: parsedData.data,
        file_b64: fileBase64,
      };

      // Make a POST request to the backend
      const res = await fetch('https://bfhl-nodejs-owxf.vercel.app/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      setResponse(result);
    } catch (e) {
      setError('Invalid JSON input or file upload failed.');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">123456 (Roll Number)</h1>

      {/* JSON Input Field */}
      <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">API Input</label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"data":["A","B","1"]}'
        />
      </div>

      {/* File Input Field */}
      <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">File Upload</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Submit Button */}
      <button
        className="mt-4 w-full max-w-lg bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Display Response */}
      {response && (
        <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md mt-6">
          <h2 className="text-lg font-semibold">Response</h2>
          <pre className="text-gray-700 mt-2">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
