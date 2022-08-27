import React, { useState } from "react";

// Form is not pre filling with existing description data

const createTodo = async ({priority, description}) =>  {
  return fetch(
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
}

const editTodo = async ({priority, description, id}) =>  {
  return fetch(
    process.env.REACT_APP_SERVER_ENDPOINT + '/todos/' + id,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        priority: priority,
        description: description,
        id: id
      })
    }
  ).then((res) => {
    console.log(res)
  }).catch((err) => {
      console.error(err)
    }
  )
}


export default function Form({descriptionPassed, priorityPassed, type, id}) {

  const [description, setDescription] = useState(descriptionPassed || '');
  const [priority, setPriority] = useState(priorityPassed || 'low');
  
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'new') {
      createTodo({description, priority});
    }
    console.log('submit')
  }
  return (
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
  );
}