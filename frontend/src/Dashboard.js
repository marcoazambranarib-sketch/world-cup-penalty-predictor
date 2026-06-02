import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// Your hardcoded summary statistics
const footData = [
  { name: 'Right Foot', conversion: 73.1 },
  { name: 'Left Foot', conversion: 71.5 },
];

const keeperData = [
  { name: 'Dive Left', value: 38 },
  { name: 'Dive Right', value: 39 },
  { name: 'Stay Center', value: 23 },
];

const pressureData = [
  { kick: 'Kick 1', rate: 80 },
  { kick: 'Kick 2', rate: 76 },
  { kick: 'Kick 3', rate: 73 },
  { kick: 'Kick 4', rate: 70 },
  { kick: 'Kick 5', rate: 71 },
  { kick: 'Kick 6+ (Sudden Death)', rate: 64 },
];

const COLORS = ['#ef4444', '#3b82f6', '#10b981']; // Red, Blue, Green

const Dashboard = () => {
  return (
    <div style={{ backgroundColor: '#111827', color: 'white', padding: '2rem', borderRadius: '10px', marginTop: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#60a5fa' }}>Historical Analytics (1982 - 2022)</h2>
      
      {/* Top KPIs */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '3rem' }}>
        <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', width: '30%' }}>
          <h3 style={{ margin: 0, color: '#9ca3af' }}>Total Kicks Analyzed</h3>
          <p style={{ fontSize: '2rem', margin: '10px 0', fontWeight: 'bold' }}>772</p>
        </div>
        <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', width: '30%' }}>
          <h3 style={{ margin: 0, color: '#9ca3af' }}>Overall Conversion Base</h3>
          <p style={{ fontSize: '2rem', margin: '10px 0', fontWeight: 'bold', color: '#10b981' }}>72.4%</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem', marginBottom: '3rem' }}>
        
        {/* Bar Chart: Foot Dominance */}
        <div style={{ width: '50%', height: 300, backgroundColor: '#1f2937', padding: '1rem', borderRadius: '8px' }}>
          <h4 style={{ textAlign: 'center', color: '#9ca3af' }}>Conversion by Foot Dominance</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={footData}>
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis domain={[0, 100]} stroke="#9ca3af" />
              <Tooltip cursor={{fill: '#374151'}} />
              <Bar dataKey="conversion" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Keeper Tendencies */}
        <div style={{ width: '50%', height: 300, backgroundColor: '#1f2937', padding: '1rem', borderRadius: '8px' }}>
          <h4 style={{ textAlign: 'center', color: '#9ca3af' }}>Keeper Dive Distribution</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={keeperData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                {keeperData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Line Chart: Sudden Death Pressure */}
      <div style={{ width: '100%', height: 350, backgroundColor: '#1f2937', padding: '1rem', borderRadius: '8px' }}>
        <h4 style={{ textAlign: 'center', color: '#9ca3af' }}>Performance Degradation vs. Shootout Pressure</h4>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={pressureData}>
            <XAxis dataKey="kick" stroke="#9ca3af" />
            <YAxis domain={[50, 90]} stroke="#9ca3af" />
            <Tooltip contentStyle={{backgroundColor: '#1f2937', border: 'none'}} />
            <Line type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={3} dot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};
export default Dashboard;
