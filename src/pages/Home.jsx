import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Home.css';
 
const Home = () => {
  const { user, authInitialized } = useContext(AuthContext);
  const navigate = useNavigate();
 
  // Function to get display name consistent with other components
  const getDisplayName = () => {
    if (user?.displayName) {
      return user.displayName;
    }
    // If no display name, extract username from email
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'Guest';
  };
 
  // Handle navigation based on auth state
  const handlePlayNow = () => {
    if (user) {
      // If user is logged in, go to quiz
      navigate('/quiz');
    } else {
      // If not logged in, go to login page
      navigate('/login');
    }
  };
 
  return (
    <div className="home-page">
      <div className="home-container">
        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="home-title">Welcome to Quizify</h1>
          <p className="home-subtitle">
            Test your knowledge with our interactive quiz platform
          </p>
        </div>
 
        {/* Description Section */}
        <div className="description-section">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🧠</div>
              <h3>Challenge Yourself</h3>
              <p>
                Thousands of questions across multiple categories and difficulty
                levels
              </p>
            </div>
 
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Track Your Progress</h3>
              <p>See your scores and compete with others on the leaderboard</p>
            </div>
 
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant Feedback</h3>
              <p>Get immediate results and learn from your answers</p>
            </div>
          </div>
 
          <div className="game-info">
            <h2>How to Play</h2>
            <ul className="info-list">
              <li>Choose your preferred category and difficulty level</li>
              <li>Answer multiple-choice or true/false questions</li>
              <li>Get instant feedback on your answers</li>
              <li>View your final score and compete on the leaderboard</li>
            </ul>
          </div>
        </div>
 
        {/* Call to Action */}
        <div className="cta-section">
          <button className="play-now-btn" onClick={handlePlayNow}>
            <span>Play Now</span>
            <span className="play-arrow">→</span>
          </button>
          <p className="auth-hint">
            {authInitialized &&
              (user
                ? `Welcome back, ${getDisplayName()}!`
                : 'Sign in to save your scores and track progress')}
          </p>
        </div>
      </div>
    </div>
  );
};
 
export default Home;
