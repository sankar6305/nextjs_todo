import Link from 'next/link';

import classes from './main-navigation.module.css';
import TaskComponent from './settingBUtton';

function MainNavigation() {

  const StoreButton = () => {
    console.log("StoreButton");
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
          <div className={classes.logo}>ToDo</div>
      </Link>
      <nav className = {classes.remain} >
        <ul>
          <li>
            <Link href='/auth' className={ classes.loginnav }>Login</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href='/activity' className={ classes.loginnav }>Activity</Link>
          </li>
        </ul>
        <ul>
          <li>
            <TaskComponent />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;


