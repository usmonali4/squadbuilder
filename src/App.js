import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Room from './components/Room';
import Activity from './components/Activity';  // Import Activity component
import ProjectManagement from './components/task_manager/ProjectManagement';
import MainRoom from './components/MainRoom';
import './index';


const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogin = (username) => {
    console.log("Login data:", username);
    setUsername(username);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
  };

  const handleRegister = (username) => {
    console.log("Register data:", username);
    setUsername(username);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', "true");
    localStorage.setItem('username', username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
  };
  

  return (
    <Router>
      <Routes>
        <Route path='/room' element={ !isLoggedIn ? <Navigate to="/" /> :
          <Room onLogout={handleLogout} />
        }/>

        <Route path='/activity' element={<Activity username={username} />} />  {/* New route */}
        <Route path='/projects' element={<ProjectManagement />} />  {/* New route */}
        <Route path='/room/:id' element={ !isLoggedIn ? <Navigate to="/" /> :
          <MainRoom onLogout={handleLogout} />} />

        <Route path="/" element={ isLoggedIn ? <Navigate to="/room" /> :
            <div className="App">
            <h1 style={{fontSize: '45px'}}>Welcome to SquadBuilder</h1>
            <h3 style={{fontSize: '25px', textAlign: 'center', paddingBottom: '5px'}}>Let's do group activities together</h3>
            {isLogin ? (
              <LoginForm onLogin={handleLogin} />
            ) : (
              <RegisterForm onRegister={handleRegister} />
            )}
            <button style={{fontSize: '20px'}} className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
