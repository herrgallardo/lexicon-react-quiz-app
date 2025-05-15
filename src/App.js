// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import DevMenu from './components/DevMenu';

// Pages
import Home from './pages/Home';
import Quiz from './pages/Quiz';

import LoginForm from './pages/LoginForm';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="App">
        <Header /> {/* Global header (e.g. logout, nav) */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <DevMenu />
        <Footer /> {/* Global footer */}
      </div>
    </Router>
  );
}

export default App;
