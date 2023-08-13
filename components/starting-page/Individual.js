import React from 'react'
import classes from './starting-page.module.css';


export const Individual = ({ task }) => {

  async function handleDelete() {
    const response = await fetch('/api/taskdata/deletetask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: task._id, user: task.user }), 
    }).then((response) => response.json())
      .then((data) => {
        // Process the response data
        //console.log(data);
        //refresh pag
        alert('Task deleted');
        window.location.reload();
      })
      .catch((error) => {
        alert('Error:', error);
      });
  }


  return (
    <div className={classes.showingeachrow}>
          <div>{task.name}</div>
          <div>{task.message}</div>
      <div className={ classes.buttonatrow }><button onClick={handleDelete}>Delete</button></div>
    </div>
  )
}
