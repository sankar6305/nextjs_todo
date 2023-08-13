import classes from './starting-page.module.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AddTask } from './AddTask';
import { Showtasks } from './showtasks'


function StartingPageContent() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

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

  function AddButtonClicked() {
    isVisible ? setIsVisible(false) : setIsVisible(true);
  }

  return (
    <>
      <div className={ classes.aligncenter}>
        <section className={classes.starting}>
        <h1>Welcome on <u> {user}! </u></h1>
        </section>
        <AddTask user={user} />
      </div>
      <Showtasks user={user} />
      </>
  );
}

export default StartingPageContent;
