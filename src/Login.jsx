// src/Login.jsx
import React, { useState } from "react";
import { FaMusic } from "react-icons/fa";
import './Login.css';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      let response;
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (isRegistering) {
        response = await axios.post(
          'http://localhost:5000/api/register',
          { email, password },
          config
        );
        setMessage('Registration successful! Please log in.');
        setEmail('');
        setPassword('');
        setIsRegistering(false);
      } else {
        response = await axios.post(
          'http://localhost:5000/api/login',
          { email, password },
          config
        );
        setMessage('Login successful!');
        localStorage.setItem('authToken', response.data.token);
        onLoginSuccess();
      }
      console.log(response.data);

    } catch (err) {
      console.error('Authentication error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      {/* login-container and login-overlay are handled by CSS */}
      
      {/* Wrapper for centering the card, fixed positioning to ensure it's on top */}
      <div className="login-card-wrapper"> 
          <div className="login-card">
            <div className="login-icon-wrapper">
              <div className="login-icon-background">
                <FaMusic className="login-music-icon" />
              </div>
            </div>
            <h2 className="login-title">
              Welcome to Harmony
            </h2>
            <p className="login-subtitle">
              {isRegistering ? 'Create your account' : 'Sign in to continue listening'}
            </p>

            <form className="login-form" onSubmit={handleSubmit}>
              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="form-label">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="error" style={{ marginTop: '10px' }}>{error}</p>}
              {message && <p className="success" style={{ marginTop: '10px' }}>{message}</p>}

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" className="remember-me-checkbox" />
                  Remember me
                </label>
                {/* MODIFIED: Contact link changed to LinkedIn */}
                <a href="https://www.linkedin.com/in/bharath-kumar-bollam-a14b94316/" target="_blank" rel="noopener noreferrer" className="forgot-password">
                  Connect on LinkedIn
                </a>
              </div>

              <button
                type="submit"
                className="sign-in-button"
              >
                {isRegistering ? 'Register' : 'Sign in'}
              </button>

              <p className="signup-text">
                {isRegistering ? 'Already have an account?' : 'Don’t have an account?'}{" "}
                <a href="#" className="signup-link" onClick={() => setIsRegistering(!isRegistering)}>
                  {isRegistering ? 'Sign in' : 'Sign up'}
                </a>
              </p>
            </form>
          </div>
      </div>
    </div>
  );
};

export default Login;