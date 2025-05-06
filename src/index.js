import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Header from './Components/header';
import Home from './Components/home';
import About from './Components/about';
import Login from './Components/login';
import User from './Components/user';
import Contact from './Components/contact'; 
import reportWebVitals from './reportWebVitals'; // Importerat reportWebVitals

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="user" element={<User />} />
          <Route path="kontakt" element={<Contact />} /> {/* Ändrat till Kontakt */}
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
