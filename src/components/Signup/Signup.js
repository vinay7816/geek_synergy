import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    Password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(details));
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <div className="signup-header">
        <p style={{fontSize:"30px"}}>Movie Wizz</p>
      </div>
      <div className="signup-content d-flex justify-content-center align-items-center">
        <div className="signup-box">
          <h5>MOVIE WIZ</h5>
          <form className="form-fields" onSubmit={handleSubmit}>
            <input
              type="text"
              value={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              id="name"
              placeholder="User-name"
              className="form-input"
              required
            />
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
              value={details.Password}
              onChange={(e) => setDetails({ ...details, Password: e.target.value })}
              id="Password"
              placeholder="Password"
              className="form-input"
              required
            />
            <button className="create-account" type="submit">
              Sign up
            </button>
          </form>
          <p>
            Already have an account?<Link to="/">Sign in</Link>
          </p>
        </div>
      </div>
      <div className="signup-footer">
        <p>© 2024 Reachinbox. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Signup;
