import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './MainPage';
import AdminPage from './AdminPage';
import './App.css'; // Import your CSS file for styling

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Main Page</Link>
              </li>
              <li>
                <Link to="/admin">Admin Page</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>

        <footer>
          <div className="social-links">
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
