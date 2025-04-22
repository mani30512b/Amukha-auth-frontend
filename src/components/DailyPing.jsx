import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import './DailyPing.css';
import LoadingSpinner from './LoadingSpinner';

function DailyPing() {
  const [cin, setCin] = useState('');
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  // Auto-dismiss alerts after 5 seconds
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage('');
        setAlertType('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handlePing = async () => {
    if (!cin || !key) {
      setAlertType('error');
      setAlertMessage('Please enter both CIN and Key');
      return;
    }

    setLoading(true);
    const today = new Date().toISOString().split('T')[0];
    const hash = sha256(key + today).toString();

    try {
      const res = await axios.post('https://amukha-auth-backend.onrender.com/api/ping', {
        cin,
        hash
      });
      setAlertType('success');
      setAlertMessage(res.data.message);
    } catch (err) {
      setAlertType('error');
      setAlertMessage("Ping failed: " + (err.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const dismissAlert = () => {
    setAlertMessage('');
    setAlertType('');
  };

  return (
    <div className="ping-container">
      {loading && <LoadingSpinner />}

      {alertMessage && (
        <div className={`alert ${alertType}`}>
          <span className="alert-message">{alertMessage}</span>
          <button className="dismiss-btn" onClick={dismissAlert}>×</button>
        </div>
      )}

      <h2 className="ping-title">Daily Ping</h2>
      
      <input
        type="text"
        placeholder="CIN"
        value={cin}
        onChange={(e) => setCin(e.target.value)}
      />
      
      <input
        type="text"
        placeholder="Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      
      <button 
        className="ping-button" 
        onClick={handlePing} 
        disabled={loading}
      >
        Ping Server
      </button>
    </div>
  );
}

export default DailyPing;
