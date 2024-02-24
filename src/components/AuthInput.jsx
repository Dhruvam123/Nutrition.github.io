import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import classes from './AuthInput.module.css';

const AuthInput = ({ onevent }) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { flag, setAuthData } = useAuth();
  const navigate = useNavigate();

  async function handleLogin() {
    setSubmitted(true);
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username: enteredEmail,
        password: enteredPassword,
      });

      const { token, role } = response.data;

      // Store the token in local storage or a secure storage mechanism
      localStorage.setItem('token', token);

      // Set flag to true and store username and role
      setAuthData(true, enteredEmail, role);

      // Redirect based on the user's role
      if (role === 'Dietitian') {
        navigate('/mainpage');
      } else if (role === 'Nutritionist') {
        navigate('/mainpage/doctor');
      }

      console.log('Login successful:', response.data);
    } catch (error) {
      setAuthData(false, '', ''); // Reset flag, username, and role on login error
      console.error('Error during login:', error.message);
    }
  }

  const emailNotValid = submitted;
  const passwordNotValid = submitted;

  return (
    <div className={classes.authinputs}>
      <div className={classes.controls}>
        <p className='paragraph'>
          <label>Email</label>
          <input
            type="email"
            autoComplete="off" // Add autoComplete off
            className={emailNotValid ? classes.invalid : undefined}
            onChange={(event) => setEnteredEmail(event.target.value)}
          />
        </p>
        <p>
          <label>Password</label>
          <input
            type="password"
            autoComplete="off" // Add autoComplete off
            className={passwordNotValid ? classes.invalid : undefined}
            onChange={(event) => setEnteredPassword(event.target.value)}
          />
        </p>
      </div>
      <div className={classes.actions}>
        <button type="button" className={classes.textbutton} onClick={onevent}>
          Create a new account
        </button>

        <button
          className={classes.button}
          onClick={handleLogin}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default AuthInput;
