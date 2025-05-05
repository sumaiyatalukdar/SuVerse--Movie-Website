import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css'; // Ensure the CSS file is correctly linked
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { Link } from 'react-router-dom';
import { logout } from '../../firebase';

const Navbar = () => {
  const navRef = useRef(null); // Ensure the ref is initialized
  const [searchVisible, setSearchVisible] = useState(false);
  const searchRef = useRef(null);

  // Scroll event listener to toggle the 'nav-dark' class
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current?.classList.add('nav-dark');
      } else {
        navRef.current?.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        {/* Logo and Menu */}
        <img src={logo} alt="Logo" />
        <ul>
          <li>
            <Link to="/TVShows">Home</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/new-popular">New & Popular</Link>
          </li>
          <li>
            <Link to="/contact-us">Contact Us</Link>
          </li>
          <li>
            <Link to="/our-plans">Our Plans</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        {/* Search Bar */}
        <div className={`search-container ${searchVisible ? 'active' : ''}`} ref={searchRef}>
          {!searchVisible && (
            <img
              src={search_icon}
              alt="Search Icon"
              className="search-icon"
              onClick={() => setSearchVisible(true)}
            />
          )}
          {searchVisible && (
            <input
              type="text"
              className="search-bar"
              placeholder="Titles, people, genres"
              autoFocus
            />
          )}
        </div>
        {/* Notifications and Profile */}
        <p>Children</p>
        <img src={bell_icon} alt="Notifications" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="Profile" className="icons" />
          <img src={caret_icon} alt="Caret" />
          <div className="dropdown">
            <p p onClick={() => logout()}>Exit Profile</p>
            <ul>
             <li><Link to="/AboutUs">About Us</Link></li>
             <li><Link to="/theatres">Find Theatres</Link></li>
             <li><a href="https://support.google.com/" target="_blank" rel="noopener noreferrer">Help Centre</a></li>
            </ul>
            <p onClick={() => logout()}>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
