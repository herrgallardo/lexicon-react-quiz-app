
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ text = "Min Logo" }) => {
  return (
    <div className="logo">
      <Link to="/" className="text-xl font-bold flex items-center">
        {/* Du kan ersätta denna div med en bild om du har en logobild */}
        <div className="w-8 h-8 bg-blue-500 rounded-full mr-2"></div>
        {text}
      </Link>
    </div>
  );
};

export default Logo;
