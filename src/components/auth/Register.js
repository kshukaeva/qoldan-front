import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FcGoogle} from "react-icons/fc";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
          "http://localhost:8100/api/auth/register",
          state,
          {
            headers: {
              'content-type': 'application/json'
            }
          }
      );
      const { token } = response.data;

      localStorage.setItem("token", response.data.token);
      localStorage.setItem('username', state.email);
      navigate('/all');
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <main className='login'>
    <div className="login-container">
    <div className="login-form">
      <div className="login-register-container">
      <div className="small-container">
        <Link to="/login" className='login-m-title'>Login</Link>
        <div className="register-m-container">
        <h2 className='register-m-title'>Register</h2>
        </div>
      </div>
      </div>  
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
              type="text"
              name="firstname"
              value={state.firstname}
              onChange={handleChange}
              required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
              type="text"
              name="lastname"
              value={state.lastname}
              onChange={handleChange}
              required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              required
          />
        </div>
      <div className="login-button-container">
        <button type="submit">Register</button>
        </div>
    </form>
      {/*<div className="google-button-container">*/}
      {/*  <div className="google-icon-text-container">*/}
      {/*    <div className="google-icon-container">*/}
      {/*      <FcGoogle/>*/}
      {/*    </div>*/}
      {/*    <h3 className="google-text">Sign Up with Google</h3>*/}
      {/*  </div>*/}
      {/*</div>*/}
  </div>

  </div>  
</main>

  );
}


