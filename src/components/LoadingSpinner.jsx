// src/components/LoadingSpinner.jsx
import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="loading-overlay">
      <div className="spinner"></div>
      <p>Processing...</p>
    </div>
  );
}

export default LoadingSpinner;
