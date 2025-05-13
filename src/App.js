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
import DevMenu from './components/DevMenu';

// Pages
import Quiz from './pages/Quiz';
import Auth from './pages/Auth';
import LoginForm from './pages/LoginForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Global header (e.g. logout, nav) */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/LoginForm" replace />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/LoginForm" element={<LoginForm />} />
          </Routes>
        </div>
        <DevMenu />
        <Footer /> {/* Global footer */}
      </div>
    </Router>
  );
}

export default App;
