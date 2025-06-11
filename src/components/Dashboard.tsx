
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Dashboard = ({ user }) => {
  const [metrics, setMetrics] = useState({
    calories: 1840,
    activeMinutes: 67,
    waterIntake: 6,
    energy: 85,
    strength: 72,
    endurance: 91
  });

  const [aiHighlights] = useState([
    { type: 'alert', message: '💧 Time for hydration! You\'re 2 glasses behind today', priority: 'high' },
    { type: 'tip', message: '🎯 Great energy levels! Perfect time for strength training', priority: 'medium' },
    { type: 'recovery', message: '😴 Consider a rest day tomorrow based on your intensity', priority: 'low' }
  ]);

  const ProgressRing = ({ value, max, color, label }) => {
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / max) * circumference;

    return (
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            fill="transparent"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-xs opacity-70">{label}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center gap-4">
          <div className="text-6xl">{user.avatar}</div>
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, {user.name}!</h1>
            <p className="text-white/70">Ready to crush your fitness goals today? 🚀</p>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70">Calories Burned</p>
              <p className="text-3xl font-bold text-white">{metrics.calories}</p>
            </div>
            <div className="text-4xl">🔥</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70">Active Minutes</p>
              <p className="text-3xl font-bold text-white">{metrics.activeMinutes}</p>
            </div>
            <div className="text-4xl">🏃‍♂️</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70">Water Intake</p>
              <p className="text-3xl font-bold text-white">{metrics.waterIntake}/8</p>
            </div>
            <div className="text-4xl">💧</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70">Fitness Age</p>
              <p className="text-3xl font-bold text-white">{user.fitnessAge}</p>
            </div>
            <div className="text-4xl">⚡</div>
          </div>
        </motion.div>
      </div>

      {/* Progress Rings */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Your Stats Today</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          <ProgressRing value={metrics.energy} max={100} color="#10B981" label="Energy" />
          <ProgressRing value={metrics.strength} max={100} color="#F59E0B" label="Strength" />
          <ProgressRing value={metrics.endurance} max={100} color="#EF4444" label="Endurance" />
        </div>
      </motion.div>

      {/* AI Highlights */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <h2 className="text-2xl font-bold text-white mb-6">🧠 AI Highlights</h2>
        <div className="space-y-4">
          {aiHighlights.map((highlight, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className={`p-4 rounded-lg border ${
                highlight.priority === 'high' ? 'bg-red-500/20 border-red-500/30' :
                highlight.priority === 'medium' ? 'bg-yellow-500/20 border-yellow-500/30' :
                'bg-green-500/20 border-green-500/30'
              }`}
            >
              <p className="text-white">{highlight.message}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
