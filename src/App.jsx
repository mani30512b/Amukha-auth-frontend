import React from 'react';
import RegisterClient from './components/RegisterClient';
import DailyPing from './components/DailyPing';
import './App.css';

function App() {
  return (
    <div className="app-wrapper">
      <h1>Client Authentication System</h1>
      <RegisterClient />
      <div className="divider"></div>
      <DailyPing />
    </div>
  );
}

export default App;
