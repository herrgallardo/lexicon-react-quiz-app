import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import ConfirmationModal from './ConfirmationModal';
import useMediaQuery from '../hooks/useMediaQuery';
import './Header.css';

const Header = () => {
  const { user } = useContext(AuthContext);
  const isDesktop = useMediaQuery('(min-width: 769px)');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDesktop) {
      setMenuOpen(false);
    }
  }, [isDesktop]);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const openLogoutModal = () => setShowLogoutModal(true);
  const handleLogout = async () => {
    setShowLogoutModal(false);
    await logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <a href="/">
            <img src="/images/logo.png" alt="Quizify Logo" />
          </a>
        </div>

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
        </ul>

        <div className="actions">
          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>

          {user ? (
            <span
              className="user-info desktop"
              role="button"
              aria-label="Log out"
              tabIndex={0}
              onClick={openLogoutModal}
              onKeyDown={e => (e.key === "Enter" || e.key === " ") && openLogoutModal()}
            >
             {user.email ? user.email.split('@')[0] : "Guest"}
            </span>
          ) : (
            <span className="user-info desktop">Hello Guest!</span>
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
