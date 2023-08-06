import Link from 'next/link';

import classes from './main-navigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href='/'>
          <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/auth' className={ classes.loginnav }>Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
