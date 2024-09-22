import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [isValidJson, setIsValidJson] = useState(true);
  const [response, setResponse] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  // Handles changes to the input field
  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  // Handles submission of the form and calls the backend API
  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput); // Parse JSON input
      setIsValidJson(true); // Valid JSON input
      
      const res = await fetch('https://bfhl-nodejs-owxf.vercel.app/bfhl', { // Replace with your deployed backend API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData), // Send the parsed data as the request body
      });

      const result = await res.json();
      setResponse(result); // Store the response

    } catch (error) {
      setIsValidJson(false); // Invalid JSON input
    }
  };

  // Handles dropdown changes
  const handleDropdownChange = (e) => {
    const options = [...e.target.selectedOptions].map(option => option.value);
    setDropdownOptions(options);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-gray-700">Enter JSON Input</h1>

        <textarea 
          value={jsonInput} 
          onChange={handleInputChange} 
          placeholder='{"data": ["A", "C", "z"]}' 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 h-32"
        />

        <button 
          onClick={handleSubmit} 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold"
        >
          Submit
        </button>

        {!isValidJson && <p className="mt-2 text-red-500">Invalid JSON format</p>}

        {response && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Multi Filter</h2>
            <select 
              multiple 
              onChange={handleDropdownChange} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 h-32"
            >
              <option value="Alphabets">Alphabets</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
            </select>

            <h3 className="text-lg font-semibold mb-2 text-gray-700">Filtered Response</h3>
            <div className="text-gray-800">
              {dropdownOptions.includes('Alphabets') && response.alphabets.length > 0 && (
                <p>Alphabets: {response.alphabets.join(', ')}</p>
              )}
              {dropdownOptions.includes('Numbers') && response.numbers.length > 0 && (
                <p>Numbers: {response.numbers.join(', ')}</p>
              )}
              {dropdownOptions.includes('Highest Lowercase Alphabet') && response.highest_lowercase_alphabet.length > 0 && (
                <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
