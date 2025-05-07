// src/components/Header.jsx
// --------------------------------------------------
// Simple header with a logout button
// Uses Firebase logout logic and redirects user to /auth
// --------------------------------------------------

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  return (
    <header style={{ padding: '1rem', textAlign: 'right' }}>
      {user && <button onClick={handleLogout}>Log out</button>}
    </header>
  );
};

export default Header;
