import logo from './logo.svg';
import './App.css';
import { useState, useEffect, Fragment } from 'react';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      process.env.REACT_APP_SERVER_ENDPOINT + '/todos',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          priority: priority,
          description: description
        })
      }
    ).then((res) => {
      console.log(res)
    }).catch((err) => {
        console.error(err)
      }
    )
    console.log('submit')
  }

  useEffect(() => {
    fetch(process.env.REACT_APP_SERVER_ENDPOINT + '/todos').then( async (res) => {
      const data = await res.json();
      setData(data);
      setLoading(false);
    })
  }, [])

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h1>
        todos:
      </h1>
        <ul>
          {data.map((todo)=>{
            return (
              <div key={todo.id}>
                <li>Description: {todo.description} Priority: {todo.priority}</li>
              </div>
              
            )
          })}
        </ul>
      {JSON.stringify(data)}
      <form>
          <label htmlFor='description' >Description</label>
          <input name='description' id='description' type='text' value={description} onChange={(e)=> setDescription(e.target.value)} required></input>
          <label htmlFor='priority' >Priority</label>
          <select name='priority' id='priority' value={priority} onChange={(e)=> {
            setPriority(e.target.value)
          }} required>
            <option value='low'>Low</option>
            <option value='mid'>Mid</option>
            <option value='high'>High</option>
          </select>
          <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
    
  );
}

export default App;
