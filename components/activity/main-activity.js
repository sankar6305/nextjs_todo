import React from 'react';
import classes from './main-actvitypanel.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import VulnChart from './bar-chart';
import Linechart from './line-chart';
import Calender from './calender';


const Main_activity = () => {

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
  const dummydata = [
    { id: '1', count: 11 },
    { id: '2', count: 8 },
    { id: '3', count: 13 },
    { id: '4', count: 14 },
    { id: '5', count: 15 },
    { id: '6', count: 9 },
    { id: '7', count: 7 },
  ];
  const dummydata1 = [
    { id: '1', count: 11 },
    { id: '2', count: 8 },
    { id: '3', count: 3 },
    { id: '4', count: 9 },
    { id: '5', count: 15 },
    { id: '6', count: 9 },
    { id: '7', count: 7 },
  ];

  return (
    <div>
      <div className={classes.Toplayers}>
        <div className={classes.Toplayers_barchart}>
          <VulnChart dummydata = {dummydata} user={user} />
        </div>
        <div className={classes.Toplayers_linechart}>
          <Linechart dummydata={dummydata1} user={ user } />
        </div>
      </div>
      <div className={classes.calender} >
        <Calender user={ user } />
      </div>
    </div>
  )
}

export default Main_activity

