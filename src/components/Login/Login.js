import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Login.css";

const Login = ({ setIsLoggedIn }) => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginUser = localStorage.getItem("user");

    if (!loginUser) {
      alert("No user found in localStorage");
      return;
    }

    const parsedUser = JSON.parse(loginUser);

    if (!parsedUser || !parsedUser.email || !parsedUser.Password) {
      alert("Invalid user data");
      return;
    }

    
    if (parsedUser.email === details.email && parsedUser.Password === details.password) {
      console.log("Login successful");

      
      localStorage.setItem("isloggedin", 'true');

    
      setIsLoggedIn(true);

      navigate("/home", { replace: true });
    } else {
      alert("Wrong credentials");
    }
  };

  return (
    <div className="container-fluid">
      <div className="login-header">
        <p style={{fontSize:"30px"}}>Movie Wizz</p>
      </div>
      <div className="login-content">
        <div className="login-box">
          <h5>MOVIE WIZ</h5>
          <form className="form-fields" onSubmit={handleSubmit}>
            <input
              type="email"
              value={details.email}
              onChange={(e) => setDetails({ ...details, email: e.target.value })}
              id="email"
              placeholder="E-mail"
              className="form-input"
              required
            />
            <input
              type="password"
              value={details.password}
              onChange={(e) => setDetails({ ...details, password: e.target.value })}
              id="password"
              placeholder="Password"
              className="form-input"
              required
            />
            <button className="create-account" type="submit">
              Sign in
            </button>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
      <div className="login-footer">
        <p>© 2024 Moviewiz. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;
