import React, { useState } from 'react';
import axios from "../api/axiosConfig";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    if (username.trim() === '' || password.trim() === '') {
        alert('Please fill in all fields before registering.');
        return;
    }
    e.preventDefault();
    try {
      await axios.post('/users/login', { username, password });
      onLogin(username);
    } catch (error) {
      alert("Login Failed");
      setPassword('');
      console.error('Login failed', error);
      return;
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2 style={{fontSize: '30px', textAlign: 'center'}}>Login</h2>
        <div>
          <label style={{fontSize: '20px'}}>Username:</label>
          <input style={{fontSize: '20px'}}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={{fontSize: '25px'}}>Password:</label>
          <input style={{fontSize: '20px'}}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button style={{fontSize: '25px', backgroundColor: 'green'}} type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
