// src/components/DevMenu.jsx
import React, { useState } from 'react';
import './DevMenu.css';

const DevMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dev-menu">
      <button className="dev-toggle" onClick={() => setIsOpen(!isOpen)}>
        DEV
      </button>
      {isOpen && (
        <div className="dev-panel">
          <h4>Dev Menu</h4>
          <button onClick={() => alert('Reset quiz')}>Reset Quiz</button>
          <button onClick={() => alert('Show token')}>Show Token</button>
          <button onClick={() => alert('Clear user')}>Clear User</button>
        </div>
      )}
    </div>
  );
};

export default DevMenu;
