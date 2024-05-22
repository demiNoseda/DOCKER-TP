import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');
  const [input, setInput] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/random-insert');
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const insertData = async () => {
    try {
      const response = await axios.post('http://localhost:3000/insert', { name: input });
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Insert Data</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={insertData}>Insert</button>
      <h1>Random Insert</h1>
      <button onClick={fetchData}>Insert Random Data</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
