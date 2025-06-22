import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AppShell from "../appshell/AppShell";
import "./login.css";

const Login = ({ setToken }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null); 
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(user.email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    try {
      const res = await axios.post("https://laundrycart-full-stack-amarnath10x-1.onrender.com/login", user);

      // const res = await axios.post("https://laundrycardbackend-production.up.railway.app/login", user);
      alert("Login successful");
      console.log(res)
      console.log(res.data.token)
      setToken(res.data.token);
      navigate("/");
    } catch (err) {
      alert("Login failed");
      console.log(err.response.data.message)
      console.log("error logging in", err);
    }
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setUser({ ...user, email: emailValue });

    if (typingTimeout) clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      if (emailValue.trim() !== "" && !validateEmail(emailValue)) {
        setEmailError("Please enter a valid email");
      } else {
        setEmailError("");
      }
    }, 1000);

    setTypingTimeout(timeout);
  };

  const isFormValid = user.email.trim() !== "" && user.password.trim() !== "";

  return (
    <AppShell>
      <div className="login-container">
        <div className="login-left">
          <h1>
            <span className="laundry-text">Laundry</span>
            <br />
            <span className="service-text">Service</span>
          </h1>
          <p>Doorstep Wash & Dryclean Service</p>
          <p className="dont">Don't Have An Account?</p>
          <Link to="/register">
            <button className="outline-button">Register</button>
          </Link>
        </div>

        <div className="login-right">
          <h2>SIGN IN</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              placeholder="Mobile / Email"
              value={user.email}
              onChange={handleEmailChange}
              className={emailError ? "invalid" : ""}
            />
            {emailError && <p className="error-text">{emailError}</p>}

            <div className="password-wrapper">
              <input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <span className="lock-icon">
                <i className="fa-solid fa-lock"></i>
              </span>
            </div>

            <div className="forgot-text">
              <a href="#">Forget Password?</a>
            </div>

            <button
              type="submit"
              className="solid-button"
              disabled={!isFormValid}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
};

export default Login;
