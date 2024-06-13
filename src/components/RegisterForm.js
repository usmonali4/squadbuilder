import React, { useState } from 'react';
import axios from "../api/axiosConfig"


const RegisterForm = ({ onRegister }) => {
//   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    if (username.trim() === '' || password.trim() === '') {
        alert('Please fill in all fields before registering.');
        return;
      }
      e.preventDefault();
      try {
        await axios.post('/users/register', { username, password });
        console.log('Registration successful');
        onRegister(username);
      } catch (error) {
        alert("Registration failed");
        setUsername('');
        setPassword('');
        console.error('Registration failed', error);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{textAlign: 'center'}}>Register</h2>
      {/* <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div> */}
      
      <div>
        <label style={{fontSize: '20px'}}>Username:</label>
        <input style={{fontSize: '20px'}}
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label style={{fontSize: '20px'}}>Password:</label>
        <input style={{fontSize: '20px'}}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button style={{fontSize: '25px'}} type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
