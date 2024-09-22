import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const API_URL = 'https://bfhl-nodejs-owxf.vercel.app/bfhl'; // Replace with your actual API URL

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highest_alphabet', label: 'Highest Alphabet' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      const result = await axios.post(API_URL, parsedInput);
      setResponse(result.data);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Invalid JSON format');
      } else {
        setError('An error occurred while processing your request');
        console.error(err);
      }
    }
  };

  const filterResponse = () => {
    if (!response) return null;

    const filteredResponse = {};
    selectedOptions.forEach(option => {
      if (response[option.value]) {
        filteredResponse[option.value] = response[option.value];
      }
    });

    return filteredResponse;
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">BFHL Frontend</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON input (e.g., { "data": ["M","1","334","4","B"] })'
          className="w-full p-2 border rounded mb-4 h-32"
        />
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {response && (
        <div className="mb-4">
          <Select
            isMulti
            options={options}
            onChange={setSelectedOptions}
            placeholder="Select filter options"
            className="mb-4"
          />
          <div className="bg-gray-100 p-4 rounded">
            <pre className="whitespace-pre-wrap break-words">
              {JSON.stringify(filterResponse(), null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
