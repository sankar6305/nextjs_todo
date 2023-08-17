import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import classes from './auth-form.module.css';
import { useRouter } from 'next/router';

 function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

async function creatingUser(email, password) {
    console.log(email)
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
    }

    return data;
  }

function AuthForm() {

  // if (req.method !== 'POST') return;
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    console.log(enteredEmail)
    
    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (!result.error) {
        // set some auth state
        router.replace('/');
      }
      else alert("Create account first!!!");

    } else { 
      try {
        await creatingUser(enteredEmail, enteredPassword);
        console.log("Successfull created!!!");
        alert("Now login with your credentials!!!");
      }
      catch (error) {
        alert(error);
      }
    }

  }

  return (
    <div className={classes.EntireLog}>
    <section className={classes.auth}  >
      <h1>Hi there!</h1>
      <h4> {isLogin ? 'Have we met before?' : 'Is this our first interaction?'}</h4>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
          <div className={classes.actions}>
            <div>
              <button>{isLogin ? 'Login' : 'Create Account'}</button>
            </div>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
      </section>
      <div className={classes.auth_image}>
        <img src="/Checklist.jpg" alt="auth_image" />
      </div>
      </div>
  );
}

export default AuthForm;
