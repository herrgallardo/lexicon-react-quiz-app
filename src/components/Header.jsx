import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import ConfirmationModal from './ConfirmationModal';
import useMediaQuery from '../hooks/useMediaQuery'; // ← new
import UserProfileModal from './UserProfileModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = () => {
  const { user } = useContext(AuthContext);
  const isDesktop = useMediaQuery('(min-width: 769px)');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const navigate = useNavigate();

  // auto-close mobile menu when switching to desktop
  useEffect(() => {
    if (isDesktop) {
      setMenuOpen(false);
    }
  }, [isDesktop]);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const openLogoutModal = () => setShowLogoutModal(true);
  const openUserModal = () => setShowUserModal(true);
  const closeUserModal = () => setShowUserModal(false);
  const handleLogout = async () => {
    setShowLogoutModal(false);
    setShowUserModal(false);
    await logout();
    navigate('/login');
  };

  const LogoutButton = ({ className }) => (
    <button
      className={`logout-btn ${className}`}
      onClick={openLogoutModal}
      aria-label="Log out"
    >
      <FontAwesomeIcon icon={faSignOutAlt} />
    </button>
  );

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
          {user && (
            <li className="nav-item mobile-logout-item">
              <LogoutButton className="mobile-logout" />
            </li>
          )}
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

          {/* ───────── USER INFO ───────── */}
          {user ? (
            <span
              className="user-info desktop"
              role="button"
              aria-label="Open profile"
              onClick={openUserModal} // ✅ FIXED: call openUserModal, not nonexistent toggleUserModal
            >
              {user.displayName || user.email}
            </span>
          ) : (
            <span className="user-info desktop">Hello Guest!</span>
          )}

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

        {/* Confirmation “Log out?” modal */}
        <ConfirmationModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
          title="Log out"
          message="Are you sure you want to log out?"
          confirmText="Log Out"
          cancelText="Cancel"
        />

        {/* ✅ User profile modal */}
        {showUserModal && <UserProfileModal onClose={closeUserModal} />}
      </div>
    </header>
  );
};

export default Header;
