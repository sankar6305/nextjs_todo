import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import React, { useState, useEffect } from "react";
import classes from './main-actvitypanel.module.css';

const VulnChart = ({ dummydata, user }) => {

  const [tasks, setTasks] = useState([]);
  const [data1, setData1] = useState([]);
  const [actualLabel, setActualLabel] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/timer/sendtimerdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user: user }), // Sending the user email in the request body
                }).then((response) => response.json())
                .then((data) => {
                  // Process the response data
                  //console.log("i am here");
                  setData1(data.map((item) => item.duration));
                  setActualLabel(data.map((item) => item.day));
                })
                .catch((error) => {``````````````````````````````````````````````````````````
                    // Handle any errors that occurred during the fetch
                    console.error('Error:', error);
                });
            }
        fetchData();
    }, []);

  

  

  const options = {
    responsive: true,
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


 const dataset1 = {
    labels: actualLabel,
    datasets: [
      {
        data: data1,
        backgroundColor: ['#DBDAFB'],
        hoverBackgroundColor: ['#4A47EB'],
        borderRadius: 20,
        pointHoverRadius: 5,
        display: false,
        pointHoverBackgroundColor: 'blue',
        barThickness: 20,
      },
    ],
  };

  

  return (
    <div className={classes.barchart}>
      <h1>Task Activities</h1>
          {
            data1.length > 0 &&
            <Bar
          data={dataset1}
          options = {options} />
          }
        </div>
      );
    };
    export default VulnChart;
