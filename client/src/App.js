import logo from './logo.svg';
import './App.css';
import { useState, useEffect, Fragment } from 'react';
import Form from './components/Form';
import {Todo} from './components/Todo';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

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
              <Todo description={todo.description} priority={todo.priority} id={todo.id}/>
            </div>
            
          )
        })}
      </ul>
      <Form type='new' />
    </div>
  );
}

export default App;
