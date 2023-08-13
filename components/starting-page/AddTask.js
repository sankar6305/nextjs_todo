import React from 'react'
import { useState } from 'react'
import classes from './starting-page.module.css';
import DatePicker from 'react-datepicker';

export const AddTask = ({ user }) => {


    const [formData, setFormData] = useState({
        name: '',
        message: '',
        user: user,
        startDate: new Date(),
        endDate: new Date(),
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    

    async function handleSubmit(event) {
        event.preventDefault();
        const value = user;
        const response = await fetch('/api/taskdata/tasking', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
        }
        setFormData((prevData) => ({
            ...prevData,
            ['name']: '',
            ['message']: '',

        }));
        alert('Task added');
        window.location.reload();
        return data;
    }


  return (
      <div className={classes.AddingTask}>
            <h1>Add a new task</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Task name </label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Description</label>
                <textarea name="message" value={formData.message} onChange={handleChange} />
              </div>
              <div>
                <label>Start Date </label>
                <input type='date' name="startDate" value={formData.startDate} onChange={handleChange} />
            </div>
            <div>
                <label>End Date</label>
                <input type='date' name="endDate" value={formData.endDate} onChange={handleChange} />
            </div>
              <button type="submit">Submit</button>
          </form>
    </div>
  )
}
