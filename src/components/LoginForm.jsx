import React, { useState, useEffect } from 'react';
import classes from './LoginForm.module.css';
import axios from 'axios';

const LoginForm = ({ onevent }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    description: '',
    gender: '',
    role: 'Dietitian',
    age: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post('http://localhost:3001/saveData', formData);

      // Assuming your server sends a token upon successful login
      const token = response.data.token;

      // Store the token in local storage or a secure storage mechanism
      localStorage.setItem('token', token);

      // Perform any other actions, e.g., redirect to a protected route
      // For simplicity, this example just logs the response
      console.log('Login successful:', response.data);

      // You might also want to redirect the user to a different page
    } catch (error) {
      console.error('Error during login:', error.message);
    }

    setFormData({
      username: '',
      password: '',
      description: '',
      gender: '',
      role: 'Dietitian',
      age: '',
    });
  };

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem('formData'));
    if (storedFormData) {
      setFormData(storedFormData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  return (
    <div className={classes.container}>
      <form className={classes.accountform} onSubmit={handleSubmit}>
        <div className='grid-flow-row'>
          <h2 className={classes.heading2}>Create an Account</h2>
          <i className={`fa fa-times float-end ${classes.heading2}`} onClick={onevent}></i>
        </div>

        <label htmlFor="username" className={classes.label}>
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className={classes.input}
          required
          onChange={handleChange}
          value={formData.username}
          autoComplete="off"
        />

        <label htmlFor="age" className={classes.label}>
          Age:
        </label>
        <input
          type="number"
          id="age"
          name="age"
          className={classes.input}
          onChange={handleChange}
          value={formData.age}
          required
          autoComplete="off"
        />

        <label htmlFor="gender" className={classes.label}>
          Gender:
        </label>
        <input
          type="text"
          id="gender"
          name="gender"
          className={classes.input}
          onChange={handleChange}
          value={formData.gender}
          required
          autoComplete="off"
        />

        <label htmlFor="password" className={classes.label}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className={classes.input}
          onChange={handleChange}
          value={formData.password}
          required
          autoComplete="off"
        />

        <label htmlFor="description" className={classes.label}>
          Description:
        </label>
        <input
          type="text"
          id="description"
          name="description"
          className={classes.input}
          onChange={handleChange}
          value={formData.description}
          required
          autoComplete="off"
        />

        <label htmlFor="role" className={classes.label}>
          Role:
        </label>
        <select
          value={formData.role}
          onChange={handleChange}
          className={classes.input}
          name="role"
          autoComplete="off"
        >
          <option value="Nutritionist">Nutritionist</option>
          <option value="Dietitian">Dietitian</option>
        </select>

        <button type="submit" className={classes.button}>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
