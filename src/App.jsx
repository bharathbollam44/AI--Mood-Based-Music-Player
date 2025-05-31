// src/App.jsx
import React, { useState, useEffect } from 'react'; // <--- ADD useEffect
import Login from './Login';
import MusicPlayer from './MusicPlayer';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // <--- ADD this useEffect block
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // In a real app, you'd validate the token with the backend to ensure it's still valid.
      // For now, we'll assume if a token exists, the user is logged in.
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div id="app-container">
      {isLoggedIn ? (
        <MusicPlayer />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;