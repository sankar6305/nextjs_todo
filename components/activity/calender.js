import React from 'react';
import classes from './main-actvitypanel.module.css';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, TimelineViews, Resize, DragAndDrop, ResourcesDirective, ResourceDirective, TimelineMonth, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import { useState, useEffect } from 'react';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';


function DOTHeremainLOgin(tasks) {
  //sorting in ascending order by EndTime
  tasks.sort(function (a, b) {
    return a.EndTime - b.EndTime;
  });
  console.log(tasks);
  return tasks;
}

const Calender = ({ user }) => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log("i am in calender")
      const response = await fetch('/api/taskdata/showtasking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user }), // Sending the user email in the reqSSuest body
      })
        .then((response) => response.json())
        .then((data) => {
          // Process the response data
          console.log('i am here');
          const temp = [];
          for (var i = 0; i < data.length; i++) {
            const eachData = {
              Id: data[i].Id,
              Subject: data[i].name,
              StartTime: new Date(data[i].StartTime),
              EndTime: new Date(data[i].EndTime),
              IsAllDay: false,
              ProjectId: 1,
              TaskId:(i+1) % 7,
            }
            temp.push(eachData);
          }
          const tr = DOTHeremainLOgin(temp);
          setTasks(tr);
          console.log(temp);
        })
        .catch((error) => {
          // Handle any errors that occurred during the fetch
          console.error('Error:', error);
        });
    }
    fetchData();
  }, []);

  

  
  const tasks1 = new DataManager(tasks);

  
    const workDays = [0, 1, 2, 3, 4, 5];
    const projectData = [
        { text: 'PROJECT 1', id: 1, color: '#cb6bb2' }
    ];
    const categoryData = [
        { text: '', id: 1, groupId: 1, color: '#df5286' },
        { text: '', id: 2, groupId: 1, color: '#7fa900' },
        { text: '', id: 3, groupId: 1, color: '#ea7a57' },
        { text: '', id: 4, groupId: 1, color: '#5978ee' },
        { text: '', id: 5, groupId: 1, color: '#df5286' },
        { text: '', id: 6, groupId: 1, color: '#00bdae' }
    ];


  const eventTemplate = (props) => {
    const startDate = new Date(props.StartTime);
    const formattedDate = startDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    const endDate = new Date(props.EndTime);
    const formattedDate1 = endDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    return (
      <div className={classes.customisedViews}>
        <div>{props.Subject}</div>
        <div>{formattedDate} - {formattedDate1}</div>
      </div>
    );
  };

  return (<div className='schedule-control-section'>
            <div className='col-lg-12 control-section'>
                <div className='control-wrapper'>
                    <ScheduleComponent readonly={true} cssClass='timeline-resource-grouping' width='100%' height='650px' selectedDate={new Date()} workDays={workDays} eventSettings={{ dataSource: tasks }} group={{ resources: ['Projects', 'Categories'] }}>
                        <ResourcesDirective>
                            <ResourceDirective field='ProjectId' title='Choose Project' name='Projects' allowMultiple={false} dataSource={projectData} textField='text' idField='id' colorField='color'/>
                            <ResourceDirective field='TaskId' title='Category' name='Categories' allowMultiple={true} dataSource={categoryData} textField='text' idField='id' groupIDField='groupId' colorField='color'/>
                        </ResourcesDirective>
                        <ViewsDirective>
                            <ViewDirective option='TimelineMonth' isSelected={true} eventTemplate={eventTemplate}/>
                        </ViewsDirective>
                        <Inject services={[TimelineMonth]}/>
                    </ScheduleComponent>
                </div>
            </div>
        </div>);
}

export default Calender
