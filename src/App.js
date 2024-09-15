import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isloggedin") === 'true');

  useEffect(() => {
 
    const loginStatus = localStorage.getItem("isloggedin") === 'true';
    setIsLoggedIn(loginStatus);
  }, []);  

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route
            exact
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
