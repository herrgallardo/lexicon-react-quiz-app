// src/pages/Auth.jsx
import './LoginForm.css'; // Import the CSS styles for the LoginForm component

// Define the LoginForm functional component
const LoginForm = () => {
  return (
    // Main container for the login layout
    <div className="login-layout">
      {/* Container for the login form */}
      <div className="login-container">
        {/* Box that holds the login form */}
        <div className="login-box">
          <form>
            {/* Title of the login form */}
            <h1 className="login-title">Login</h1>

            {/* Input box for the email */}
            <div className="input-box">
              <input type="email" placeholder="Email" required /> {/* Email input field */}
            </div>

            {/* Input box for the password */}
            <div className="input-box">
              <input type="password" placeholder="Password" required /> {/* Password input field */}
            </div>

            {/* Login button */}
            <button type="submit" className="login-btn">Login</button>

            {/* Link to register for a new account if the user doesn't have one */}
            <div className="register-link">
              <p>
                Don't have an account? <a href="#">Register</a> {/* Hyperlink for registration */}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Export the LoginForm component for use in other parts of the application
export default LoginForm;
