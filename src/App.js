import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  // Set the document title to your roll number
  useEffect(() => {
    document.title = '21BPS1518'; // Replace 'YourRollNumber' with your actual roll number
  }, []);

  const handleSubmit = async () => {
    try {
      setError('');
      // Validate JSON format
      const parsedData = JSON.parse(jsonInput);
      
      // Send POST request to the backend
      const res = await axios.post('https://sarthak-bajaj-test-gzvp.onrender.com/bfhl', { data: parsedData.data });
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON format or API error.');
    }
  };

  const handleDropdownChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!response) return null;
    let filteredResponse = {};
    
    if (selectedOptions.includes('Alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes('Highest lowercase alphabet')) {
      filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return (
      <div className="response">
        <h3>Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>21BPS1518</h1>
      <textarea
        rows="5"
        placeholder='Enter JSON here...'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <div className="error">{error}</div>}
      {response && (
        <>
          <select multiple onChange={handleDropdownChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
