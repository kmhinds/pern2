import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  
  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_ENDPOINT).then( async (res) => {
      const data = await res.json();
      console.log(data);
      setData(data);
      setLoading(false);
    })
  }, [])

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
