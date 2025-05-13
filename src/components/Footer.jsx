// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        © 2025 Lexicon Quiz App — Built with love by an awesome team{' '}
        <span role="img" aria-label="purple heart">
          ❤️
        </span>
      </p>
    </footer>
  );
};

export default Footer;
