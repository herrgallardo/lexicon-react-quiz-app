// Header.jsx - React component for a quiz app header with a responsive hamburger menu
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import './Header.css'; // Import CSS for styling

function Header() {
  // State to manage menu visibility
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo section */}
        <div className="logo">
          <a href="/">
            <img src="/images/logo.png" alt="Quizify Logo" />
          </a>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"> {user && <button onClick={handleLogout}>Log out</button>}</div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Navigation menu - toggled on mobile */}
        <div> {user && <button onClick={handleLogout}>Log out</button>}</div>
        <ul className={`nav-list ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/quiz" className="nav-link">
              Quiz
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
