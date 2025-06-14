import React from "react";
import { Link } from "react-router-dom";
import "./AppShell.css";

const AppShell = ({ children }) => {
  return (
    <div className="app-shell-container">
      <header className="header">
        <div className="logo">LAUNDRY</div>
        <nav className="nav-links">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/pricing" className="nav-item">Pricing</Link>
          <Link to="/career" className="nav-item">Career</Link>
          <Link to="/login" className="nav-item sign-in-nav">Sign In</Link>
        </nav>
      </header>

      {children}

      <footer className="footer-login">
        <div className="earn">
        <p className="refer">Now Refer & Earn ₹500 for every referral*</p>
        <small>* Terms and conditions will be applied</small>
        </div>

        <div className="social">
          <div className="about">
            <p>ABOUT US</p>
            <p>Door step wash and dry cleaning service</p>
          </div>
          <div className="hom">
            <p>Home</p>
            <p>Sign in</p>
            <p>Register</p>
          </div>
          <div className="pric">
            <p>Pricing</p>
          </div>
          <div className="car">
            <p>Career</p>
            <p>Blogs</p>
            <p>Create</p>
          </div>
          <div className="con">
            <p>Contact</p>
          </div>
          <div>
            <div className="soc">SOCIAL MEDIA</div>
            <div className="brands">
              <span><i className="fa-brands fa-square-facebook"></i></span>
              <span><i className="fa-brands fa-square-instagram"></i></span>
              <span><i className="fa-brands fa-linkedin"></i></span>
            </div>
          </div>
        </div>
      </footer>

      <footer className="footer-bar">
  <p>
    2025 <span className="copyright-icon"><i class="fa-solid fa-copyright"></i></span> Laundry
  </p>
</footer>
    </div>
  );
};

export default AppShell;