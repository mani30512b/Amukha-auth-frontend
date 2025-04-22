import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegisterClient.css';
import LoadingSpinner from './LoadingSpinner';


function RegisterClient() {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    cin: '',
  });
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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlertMessage(''); // Clear previous alerts

    try {
      const res = await axios.post('https://amukha-auth-backend.onrender.com/api/register', formData);
      setAlertType('success');
      setAlertMessage(res.data.message + "\nKey: " + res.data.key);
      
      // Reset form on success
      setFormData({
        name: '',
        startDate: '',
        endDate: '',
        cin: '',
      });
    } catch (err) {
      setAlertType('error');
      setAlertMessage("Registration failed: " + (err.response?.data?.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  // Function to dismiss alert manually
  const dismissAlert = () => {
    setAlertMessage('');
    setAlertType('');
  };

  return (
    <div className="register-container">
      {loading && <LoadingSpinner />}

      {alertMessage && (
        <div className={`alert ${alertType}`}>
          {alertMessage}
          <button className="dismiss-btn" onClick={dismissAlert}>×</button>
        </div>
      )}
      
      <h2>Register a New Client</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Client Name"
          required
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cin"
          value={formData.cin}
          onChange={handleChange}
          placeholder="CIN"
          required
        />
        <button type="submit" disabled={loading}>Register</button>
      </form>
    </div>
  );
}

export default RegisterClient;