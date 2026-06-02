import React, { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard';

function App() {
  const [shooter, setShooter] = useState('Lionel Messi');
  const [team, setTeam] = useState('ARG');
  const [foot, setFoot] = useState('L');
  const [keeperDive, setKeeperDive] = useState('C');
  const [probability, setProbability] = useState(null);

  const getPrediction = async () => {
    try {
      const res = await fetch('https://world-cup-penalty-predictor.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shooter, team, foot, keeper_dive: keeperDive }),
      });
      const data = await res.json();
      setProbability(data.goal_probability);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("Could not connect to the AI server. Is your Flask app running?");
    }
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>World Cup Penalty Predictor</h1>
        <p className="subtitle">Powered by PyTorch & Gradient Boosting</p>
      </header>
      
      <div className="content-grid">
        <div className="control-panel">
          <h2>Matchup Scenario</h2>
          <div className="input-group">
            <label>Shooter Name</label>
            <input type="text" value={shooter} onChange={(e) => setShooter(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Team (3 Letters)</label>
            <input type="text" value={team} onChange={(e) => setTeam(e.target.value.toUpperCase())} maxLength="3" />
          </div>
          <div className="input-group">
            <label>Shooter's Dominant Foot</label>
            <select value={foot} onChange={(e) => setFoot(e.target.value)}>
              <option value="R">Right</option>
              <option value="L">Left</option>
            </select>
          </div>
          <div className="input-group">
            <label>Keeper's Predicted Dive</label>
            <select value={keeperDive} onChange={(e) => setKeeperDive(e.target.value)}>
              <option value="L">Left</option>
              <option value="C">Center (Stay)</option>
              <option value="R">Right</option>
            </select>
          </div>
          <button className="predict-btn" onClick={getPrediction}>Analyze Matchup</button>
        </div>

        {probability !== null && (
          <div className="result-panel">
            <h2>Goal Probability</h2>
            <div className={`probability-circle ${probability > 75 ? 'high' : probability > 50 ? 'med' : 'low'}`}>
              {probability}%
            </div>
            <p className="analysis-text">
              {probability > 75 ? "High likelihood of conversion based on historical placement and keeper tendencies." : 
               probability > 50 ? "Coin toss scenario. High shootout pressure may affect outcome." : 
               "Advantage Keeper. The shooter's historical data suggests a highly telegraphed placement."}
            </p>
          </div>
        )}
      </div>
      <Dashboard />
    </div>
  );
}

export default App;