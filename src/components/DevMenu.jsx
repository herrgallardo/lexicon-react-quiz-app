// src/components/DevMenu.jsx
import React, { useState } from 'react';
import { deleteAllScores } from '../services/firestoreService';
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
          <button onClick={deleteAllScores}>Reset All Scores</button>
        </div>
      )}
    </div>
  );
};

export default DevMenu;
