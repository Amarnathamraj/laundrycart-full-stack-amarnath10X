import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppShell from "../appshell/AppShell";
import "./register.css";

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    district: '',
    address: '',
    pincode: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://laundrycart-full-stack-amarnath10x-1.onrender.com/register", {

     // const res = await fetch("https://laundrycardbackend-production.up.railway.app/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log(data);
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      console.log("Registration failed", err);
    }
  };

  return (
    <AppShell>
      <div className="register-page">
        <div className="left-section">
          <h2 className="laundry-text">Laundry<br/> Service</h2>
          <p>Doorstep Wash &<br/>Dryclean Service</p>
          <p>Already Have Account</p>
          <Link to="/login" className="sign-in-btn">Sign In</Link>
        </div>

        <div className="form-section">
          <h2>REGISTER</h2>
          <form onSubmit={handlesubmit}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                placeholder="Phone"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
              <select
                value={user.state}
                onChange={(e) => setUser({ ...user, state: e.target.value })}
              >
                <option value="">State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Telangana">Telangana</option>
                {/* Add more states */}
              </select>
            </div>

            <div className="form-row">
              <select
                value={user.district}
                onChange={(e) => setUser({ ...user, district: e.target.value })}
              >
                <option value="">District</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Vijayawada">Vijayawada</option>
              </select>
              <input
                type="text"
                placeholder="Address"
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                placeholder="Pincode"
                value={user.pincode}
                onChange={(e) => setUser({ ...user, pincode: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>

            <div className="form-row">
              <input
                type="password"
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              />
            </div>

            <div className="checkbox-section">
              <input type="checkbox" required />
              <span>
                I agree to <a href="#">Terms & Conditions</a>, receiving marketing and promotional materials
              </span>
            </div>

            <button type="submit" className="register-btn">Register</button>
          </form>

          
        </div>
      </div>
    </AppShell>
  );
};

export default Register;