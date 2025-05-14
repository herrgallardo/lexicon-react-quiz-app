import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import ConfirmationModal from './ConfirmationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  // close mobile menu when switching to desktop
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)');
    const handler = (e) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const openLogoutModal = () => setShowLogoutModal(true);
  const handleLogout = async () => {
    await logout();
    setShowLogoutModal(false);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo positioned absolutely */}
        <div className="logo">
          <a href="/">
            <img src="/images/logo.png" alt="Quizify Logo" />
          </a>
        </div>

        {/* Navigation centered in grid */}
        <ul className={`nav-list${menuOpen ? ' active' : ''}`}>
          <li className="nav-item">
            <a
              href="/"
              className="nav-link"
              onClick={() => menuOpen && setMenuOpen(false)}
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/quiz"
              className="nav-link"
              onClick={() => menuOpen && setMenuOpen(false)}
            >
              Quiz
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/about"
              className="nav-link"
              onClick={() => menuOpen && setMenuOpen(false)}
            >
              About
            </a>
          </li>
          {user && (
            <li className="nav-item">
              <button
                className="logout-btn mobile"
                onClick={openLogoutModal}
                aria-label="Log out"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </li>
          )}
        </ul>

        {/* Actions on the right */}
        <div className="actions">
          {/* Hamburger for mobile */}
          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>

          {/* Desktop logout */}
          {user && (
            <button
              className="logout-btn desktop"
              onClick={openLogoutModal}
              aria-label="Log out"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          )}
        </div>

        <ConfirmationModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
          title="Log out"
          message="Are you sure you want to log out?"
          confirmText="Log Out"
          cancelText="Cancel"
        />
      </div>
    </header>
  );
};

export default Header;
