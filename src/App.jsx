import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    try {
      // Parse the input JSON string to ensure it's valid JSON
      const parsedData = JSON.parse(jsonInput);

      // Send POST request to the backend
      const res = await fetch('https://bfhl-nodejs-owxf.vercel.app/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Send data as JSON
        },
        body: JSON.stringify({
          data: parsedData.data,       // Send the data you want in the body
          file_b64: parsedData.file_b64, // Optional base64 file data
        }),
      });

      const result = await res.json();  // Parse the response JSON
      setResponse(result);              // Update the response state with the result
    } catch (e) {
      setError('Invalid JSON input or server error.');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Send POST Request</h1>

      {/* JSON Input Field */}
      <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">API Input</label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"data":["A","B","1"],"file_b64":"BASE_64_STRING"}'
        />
        <button
          className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
          onClick={handleSubmit}
        >
          Submit
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Response Display */}
      {response && (
        <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-semibold">Server Response</h2>
          <pre className="text-gray-700 mt-2">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
