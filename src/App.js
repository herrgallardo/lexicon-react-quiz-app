// src/App.js

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Quiz from './pages/Quiz';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Global header (e.g. logout, nav) */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
        <Footer /> {/* Global footer */}
      </div>
    </Router>
  );
}

export default App;
