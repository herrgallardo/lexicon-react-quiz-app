// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {year} Lexicon Quiz App — Built with React by Team Awesome</p>
    </footer>
  );
};

export default Footer;
