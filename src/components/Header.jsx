import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import useMediaQuery from '../hooks/useMediaQuery';
import UserProfileModal from './UserProfileModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
 
const Header = () => {
  const { user } = useContext(AuthContext);
  const isDesktop = useMediaQuery('(min-width: 769px)');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
 
  // auto-close mobile menu when switching to desktop
  useEffect(() => {
    if (isDesktop) {
      setMenuOpen(false);
    }
  }, [isDesktop]);
 
  const toggleMenu = () => setMenuOpen((open) => !open);
  const openUserModal = () => setShowUserModal(true);
  const closeUserModal = () => setShowUserModal(false);
 
  // Get display name or fallback to email username part
  const getDisplayName = () => {
    if (user?.displayName) {
      return user.displayName;
    }
    // If no display name, extract username from email
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'Guest';
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
 
          {/* ───────── USER INFO ───────── */}
          {user ? (
            <div
              className="user-info desktop"
              role="button"
              aria-label="Open profile"
              onClick={openUserModal}
            >
              <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
              <span className="user-name">{getDisplayName()}</span>
            </div>
          ) : (
            <div className="user-info desktop">
              <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
              <span className="user-name">Hello Guest!</span>
            </div>
          )}
        </div>
 
        {/* ✅ User profile modal */}
        {showUserModal && <UserProfileModal onClose={closeUserModal} />}
      </div>
    </header>
  );
};
 
export default Header;
 
 
