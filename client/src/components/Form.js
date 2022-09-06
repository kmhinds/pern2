import React, { useState } from "react";

const createTodo = ({priority, description}) => { 
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
  }).catch((err) => {
      console.error(err)
    }
  )
}


export default function Form({descriptionPassed, priorityPassed, type, id, onAfterSave = () => null}) {

  const [description, setDescription] = useState(descriptionPassed || '');
  const [priority, setPriority] = useState(priorityPassed || 'low');
  
  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (type === 'new') {
      try {
        console.log('running new')
        await createTodo({description, priority})
        console.log('onAfterSave ran')
        onAfterSave();
      } catch(err) {
        console.error(err)
      }
    } else {editTodo({description, priority, id}).then(() => {onAfterSave()})}
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