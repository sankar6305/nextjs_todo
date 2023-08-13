import React from 'react';
import { Bar, Line } from 'react-chartjs-2'; // Import Line along with Bar from react-chartjs-2
import classes from './main-actvitypanel.module.css';
import { useSession } from 'next-auth/react';
import {useEffect, useState} from 'react';

const YourComponent = ({ dummydata, user }) => {

  const [tasks, setTasks] = useState([]);
  const [data1, setData1] = useState([]);
  const [actualLabel, setActualLabel] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/timer/sendBarData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user }), // Sending the user email in the request body
      })
        .then((response) => response.json())
        .then((data) => {
          // Process the response data
          console.log('i am here');
          setData1(data.map((item) => item.count));
          setActualLabel(data.map((item) => item.day));
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error('Error:', error);
        });
    }
    fetchData();
  }, []);



  const labelweek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dummydata.map((item) => {
    data1.push(item.count);
  });

  const options = {
     maintainAspectRatio: false, // Set to false to allow custom aspect ratio
    aspectRatio: 4,
    scales: {
      x: {
        grid: {
          display: true,
          color: '#ffffff',
          borderDash: [3, 3],
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: '#F3F3F3',
          borderDash: [3, 3],
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };



  const lineDataset = { // Line chart dataset configuration
    labels: actualLabel,
    datasets: [
      {
        data: data1,
        borderColor: '#4A47EB', // Line color
        borderWidth: 2, // Line width
        pointBackgroundColor: '#DBDAFB', // Point color
        pointRadius: 6, // Point radius
        fill: false, // No fill under the line
      },
    ],
  };

  return (
    <div>
      <h1>Task Activities</h1>
      {data1.length > 0 && (
        <div className={ classes.linechart}  >
          <Line data={lineDataset} options={options} /> {/* Include Line chart */}
        </div>
      )}
    </div>
  );
};

export default YourComponent;
