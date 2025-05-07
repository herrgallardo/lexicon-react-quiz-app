// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {year} Lexicon Quiz App. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
