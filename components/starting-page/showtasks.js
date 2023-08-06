import React from 'react'
import { useEffect, useState } from 'react'
import { Individual } from './Individual'
import classes from './starting-page.module.css';   

export const Showtasks = ({ user }) => {
    
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/taskdata/showtasking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: user }), // Sending the user email in the request body
                })
                .then((response) => response.json())
                .then((data) => {
                    // Process the response data
                    console.log(data);
                    setTasks(data);
                })
                .catch((error) => {
                    // Handle any errors that occurred during the fetch
                    console.error('Error:', error);
                });
            }
        fetchData();
    }, []);



  return (
      <div>
        <div className={ classes.tasktag}>
            <h1>Tasks</h1>
        </div>
        <div className={classes.showingeachHeading}>
          <h1>Task</h1>
          <h1>Task Description</h1>
          <h1>Delete the task</h1>
          </div>
          {tasks.map((task) => (
            <Individual key={task._id} task={task} />
        ))}
          
    </div>
  )
}
