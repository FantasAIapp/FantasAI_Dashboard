
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Timer, Target, TrendingUp, Award, Zap } from 'lucide-react';

const ActivityTracker = () => {
  const [steps, setSteps] = useState(8547);
  const [heartRate, setHeartRate] = useState(72);
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [energy, setEnergy] = useState(85);
  const [workoutType, setWorkoutType] = useState('cardio');
  const [caloriesBurned, setCaloriesBurned] = useState(0);

  const workoutTypes = [
    { id: 'cardio', name: 'Cardio', icon: '🏃‍♂️', multiplier: 12 },
    { id: 'strength', name: 'Strength', icon: '💪', multiplier: 8 },
    { id: 'yoga', name: 'Yoga', icon: '🧘‍♀️', multiplier: 4 },
    { id: 'hiit', name: 'HIIT', icon: '⚡', multiplier: 15 }
  ];

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        setSteps(prev => prev + Math.floor(Math.random() * 3) + 1);
        setHeartRate(prev => {
          const baseRate = workoutType === 'hiit' ? 140 : workoutType === 'cardio' ? 120 : 95;
          return baseRate + Math.floor(Math.random() * 20);
        });
        
        const multiplier = workoutTypes.find(w => w.id === workoutType)?.multiplier || 10;
        setCaloriesBurned(prev => prev + (multiplier / 60));
      }, 1000);
    } else {
      setHeartRate(72);
    }
    return () => clearInterval(interval);
  }, [isRunning, workoutType]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return hours > 0 
      ? `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      : `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const ProgressRing = ({ value, max, color, size = 120, label, unit = '' }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / max) * circumference;

    return (
      <div className="relative flex flex-col items-center" style={{ width: size, height: size + 40 }}>
        <svg className="transform -rotate-90" width={size} height={size} viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="6"
            fill="transparent"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            stroke={color}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="text-lg font-bold">{Math.round(value)}{unit}</div>
          <div className="text-xs opacity-70">/ {max}</div>
        </div>
        <div className="text-white/70 text-sm mt-2 text-center">{label}</div>
      </div>
    );
  };

  const HeartRateGraph = () => {
    const [heartRateData, setHeartRateData] = useState([72, 74, 73, 75, 72, 76, 74, 73, 75, 74]);

    useEffect(() => {
      const interval = setInterval(() => {
        setHeartRateData(prev => {
          const newData = [...prev.slice(1), heartRate];
          return newData;
        });
      }, 2000);

      return () => clearInterval(interval);
    }, [heartRate]);

    return (
      <div className="h-32 flex items-end justify-center space-x-1 px-4">
        {heartRateData.map((rate, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-t from-red-500 to-red-400 w-3 rounded-t-full"
            style={{ height: `${(rate / 160) * 100}%` }}
            initial={{ height: 0 }}
            animate={{ height: `${(rate / 160) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>
    );
  };

  const achievementBadges = [
    { name: 'First Mile', achieved: true, icon: '🏃‍♂️' },
    { name: 'Calorie Crusher', achieved: true, icon: '🔥' },
    { name: 'Consistency King', achieved: false, icon: '👑' },
    { name: 'Heart Hero', achieved: true, icon: '❤️' }
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 orange-gradient border border-[#FF7A00]/30"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-[#FF7A00] to-[#FFB347] rounded-2xl flex items-center justify-center">
              <Timer className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Activity Tracker</h1>
              <p className="text-white/70">Real-time monitoring of your fitness activities</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#FF7A00]">{Math.round(caloriesBurned)}</div>
            <div className="text-[#B3B3B3] text-sm">Calories Burned</div>
          </div>
        </div>
      </motion.div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 text-center border border-[#FF7A00]/20"
        >
          <div className="text-4xl mb-4">👟</div>
          <h3 className="text-white text-xl font-bold mb-4">Steps Today</h3>
          <ProgressRing value={steps} max={10000} color="#10B981" label="Daily Goal" />
          <div className="mt-4 flex items-center justify-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-green-500 text-sm font-medium">+23% from yesterday</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 text-center border border-[#FF7A00]/20"
        >
          <div className="text-4xl mb-4">❤️</div>
          <h3 className="text-white text-xl font-bold mb-4">Heart Rate</h3>
          <div className="text-4xl font-bold text-white mb-2">{heartRate}</div>
          <div className="text-white/70 mb-4">BPM</div>
          <HeartRateGraph />
          <div className={`mt-2 px-3 py-1 rounded-full text-sm ${
            heartRate > 100 ? 'bg-red-500/20 text-red-400' :
            heartRate > 80 ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-green-500/20 text-green-400'
          }`}>
            {heartRate > 100 ? 'High Intensity' : heartRate > 80 ? 'Moderate' : 'Resting'}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 text-center border border-[#FF7A00]/20"
        >
          <div className="text-4xl mb-4">🔋</div>
          <h3 className="text-white text-xl font-bold mb-4">Energy Level</h3>
          <ProgressRing value={energy} max={100} color="#F59E0B" label="Feeling" unit="%" />
          <div className="mt-4 text-center">
            <div className="text-[#FFB347] font-medium text-sm">Optimal for training!</div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Workout Timer */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6 border border-[#FF7A00]/20"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
          <Target className="w-6 h-6 text-[#FF7A00]" />
          Smart Workout Timer
        </h2>
        
        {/* Workout Type Selection */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {workoutTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setWorkoutType(type.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                workoutType === type.id 
                  ? 'bg-[#FF7A00] text-black' 
                  : 'bg-[#1E1E1E] text-[#B3B3B3] hover:text-white border border-[#FF7A00]/30'
              }`}
            >
              <span>{type.icon}</span>
              {type.name}
            </button>
          ))}
        </div>
        
        <div className="text-center mb-8">
          <div className="text-7xl font-mono font-bold text-white mb-6 bg-gradient-to-r from-[#FF7A00] to-[#FFB347] bg-clip-text text-transparent">
            {formatTime(timeElapsed)}
          </div>
          
          <div className="flex justify-center gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all ${
                isRunning 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'orange-button'
              }`}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isRunning ? 'Pause' : 'Start'}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsRunning(false);
                setTimeElapsed(0);
                setCaloriesBurned(0);
              }}
              className="flex items-center gap-2 px-8 py-3 bg-[#1E1E1E] hover:bg-[#2E2E2E] text-white rounded-lg font-bold transition-all border border-[#FF7A00]/30"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </motion.button>
          </div>
        </div>

        {/* Live Workout Stats */}
        {isRunning && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="p-4 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-[#FF7A00]">{Math.round(caloriesBurned)}</div>
              <div className="text-[#B3B3B3] text-sm">Calories</div>
            </div>
            <div className="p-4 bg-[#FFB347]/10 border border-[#FFB347]/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-[#FFB347]">{steps - 8547}</div>
              <div className="text-[#B3B3B3] text-sm">New Steps</div>
            </div>
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-400">{Math.floor(timeElapsed / 60)}</div>
              <div className="text-[#B3B3B3] text-sm">Active Min</div>
            </div>
            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-400">{heartRate}</div>
              <div className="text-[#B3B3B3] text-sm">Avg BPM</div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Achievements */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6 border border-[#FF7A00]/20"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Award className="w-6 h-6 text-[#FF7A00]" />
          Achievements
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievementBadges.map((badge, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-lg text-center transition-all ${
                badge.achieved 
                  ? 'bg-[#FF7A00]/20 border border-[#FF7A00]/50' 
                  : 'bg-[#1E1E1E] border border-white/10'
              }`}
            >
              <div className="text-3xl mb-2">{badge.icon}</div>
              <div className={`font-medium ${badge.achieved ? 'text-white' : 'text-[#B3B3B3]'}`}>
                {badge.name}
              </div>
              {badge.achieved && (
                <div className="text-[#FF7A00] text-sm mt-1">Unlocked!</div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activities */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6 border border-[#FF7A00]/20"
      >
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <Zap className="w-6 h-6 text-[#FF7A00]" />
          Recent Activities
        </h2>
        
        <div className="space-y-4">
          {[
            { type: '🏃‍♂️', name: 'Morning Run', duration: '32 min', calories: 350, intensity: 'High' },
            { type: '💪', name: 'Strength Training', duration: '45 min', calories: 280, intensity: 'Medium' },
            { type: '🧘‍♀️', name: 'Yoga Session', duration: '25 min', calories: 85, intensity: 'Low' },
            { type: '⚡', name: 'HIIT Workout', duration: '20 min', calories: 220, intensity: 'High' }
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-lg border border-[#FF7A00]/20 hover:border-[#FF7A00]/40 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{activity.type}</div>
                <div>
                  <div className="text-white font-medium">{activity.name}</div>
                  <div className="text-[#B3B3B3] text-sm">{activity.duration} • {activity.calories} calories</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-green-500 font-bold text-xl">✓</div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  activity.intensity === 'High' ? 'bg-red-500/20 text-red-400' :
                  activity.intensity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {activity.intensity}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ActivityTracker;
