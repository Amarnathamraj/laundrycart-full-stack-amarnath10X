import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import houseIcon from '../../assets/images/home.png';
import plusIcon from '../../assets/images/plus.jpg';
import menuIcon from '../../assets/images/menu.jpg';
import amarIcon from '../../assets/images/amar.jpeg';
import './Layout.css';

const Layout = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    window.location.assign('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="main-container">
      <div className="header-container">
        <div className="header-l">
          <div className="header-left">
            <h1>LAUNDRY</h1>
          </div>
          <div className="header-right">
            <a href="#pricing" className="navs-item">Pricing</a>
            <a href="#career" className="navs-item">Career</a>
            <div className="user-profile-section" ref={dropdownRef}>
              <div className="user-profile">
                <img
                  src={amarIcon}
                  alt="Profile Icon"
                  className="profile-pic"
                  onClick={handleProfileClick}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <span className="user-name">Amarnath</span>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <i class="fa-solid fa-right-from-bracket arrow"></i>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="main-wrapper">
        <div className="sidebar">
          <div className="sidebar-icons">
            <Link to="/">
              <span className="icon">
                <img src={houseIcon} alt="House Icon" className="sidebar-icon" />
              </span>
            </Link>
            <Link to="/create-order">
              <span className="icon active">
                <img src={plusIcon} alt="Plus Icon" className="sidebar-icon" />
              </span>
            </Link>
            <span className="icon">
              <i className="fa-solid fa-bars"></i>
            </span>
          </div>
        </div>

        <div className="content">
          {children}
        </div>
      </div>

      <footer className="footer">
        <p>2025 <span><i className="fa-solid fa-copyright"></i></span> Laundry</p>
      </footer>
    </div>
  );
};

export default Layout;