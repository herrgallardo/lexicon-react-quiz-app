import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Välkomstsektion */}
        <div className="welcome-area">
          <h1>Välkommen till Min React Quiz App!</h1>
        </div>

        {/* Rad med logo och navigation */}
        <div className="header-row">
          {/* Logotypsektion */}
          <div className="logo-container">
            <img src={logo} className="App-logo" alt="logo" />
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
                <Link to="/kontakt">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main>
        {/* Outlet renderar de routade sidorna */}
        <Outlet />
      </main>
    </div>
  );
}

export default App;
