import React, { useState, useEffect } from 'react';
import classes from './main-navigation.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


function getDateWithoutTime(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Adding 1 because months are zero-based
    const day = date.getDate();
    
    // Create a string in the format "YYYY-MM-DD"
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    
    return formattedDate;
}

function TaskComponent() {

    const router = useRouter();
    const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const { data, status } = useSession();
  if (status === 'loading') {
    return (<section className={classes.starting}>
      
      <h1>Loading......!</h1>
    </section>)
  }

  if (status === 'unauthenticated') {
    return (<section className={classes.starting}>
      
      <h1>Login First!</h1>
    </section>) 
  }

  if (data) {
    var user = data.user.email;
 }
    
  function getDayOfWeekAsString(date) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
}

  const handleButtonClick = () => {
    if (!isTimerStarted) {
      const now = new Date();
      setStartTime(now);
      setIsTimerStarted(true);
    } else {
        elapsedTime = startTime ? (new Date() - startTime) / 1000 : 0;
        fetch('http://localhost:3000/api/timer/timercount', {
            method: 'POST',
            body: JSON.stringify({
                user: user,
                duration: elapsedTime,
                date: getDateWithoutTime(new Date()),
                day: getDayOfWeekAsString(new Date()),
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

      setStartTime(null);
      setIsTimerStarted(false);
    }
  };

  var elapsedTime = startTime ? (new Date() - startTime) / 1000 : 0;

  return (
    <div>
    <button className={ classes.startingbutton } onClick={handleButtonClick}>
        {isTimerStarted ? 'End Timer' : 'Start Timer'}
      </button>
    </div>
  );
}


export default TaskComponent;
