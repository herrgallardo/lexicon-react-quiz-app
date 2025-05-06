import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

const Header = () => {
  return (
    <header className="app-header">
      {/* Logotypområde */}
      <div className="logo-container">
        <img src={logo} className="app-logo" alt="logo" />
      </div>
      {/* Navigationsmeny */}
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/user">User</Link>
          </li>
          <li>
            <Link to="/kontakt">Kontakt</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
