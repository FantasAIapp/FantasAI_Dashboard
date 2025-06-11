import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Droplets, 
  Flame, 
  Activity, 
  Moon, 
  Target,
  TrendingUp,
  Brain,
  Heart,
  Clock
} from 'lucide-react';
import ActivityChart from './charts/ActivityChart';
import NutritionChart from './charts/NutritionChart';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  fitnessAge: number;
  level: string;
}

interface EnhancedDashboardProps {
  user: User;
}

const EnhancedDashboard: React.FC<EnhancedDashboardProps> = ({ user }) => {
  const [metrics, setMetrics] = useState({
    calories: 1840,
    activeMinutes: 67,
    waterIntake: 6,
    energy: 85,
    strength: 72,
    endurance: 91,
    fatigue: 25,
    sleepScore: 88,
    stressLevel: 'Low'
  });

  const [todaysPlan, setTodaysPlan] = useState({
    type: 'Upper Body Strength',
    duration: '45 min',
    intensity: 'High',
    aiSuggestion: 'Perfect energy levels for strength training! 💪'
  });

  const [weeklyProgress, setWeeklyProgress] = useState([
    { day: 'Mon', calories: 1650, completed: true },
    { day: 'Tue', calories: 1890, completed: true },
    { day: 'Wed', calories: 2100, completed: true },
    { day: 'Thu', calories: 1840, completed: true },
    { day: 'Fri', calories: 0, completed: false },
    { day: 'Sat', calories: 0, completed: false },
    { day: 'Sun', calories: 0, completed: false }
  ]);

  const [aiHighlights] = useState([
    { 
      type: 'alert', 
      message: 'Time for hydration! You\'re 2 glasses behind today', 
      priority: 'high',
      action: 'Drink water now',
      icon: Droplets
    },
    { 
      type: 'tip', 
      message: 'Great energy levels! Perfect time for strength training', 
      priority: 'medium',
      action: 'Start workout',
      icon: Zap
    },
    { 
      type: 'recovery', 
      message: 'Consider a rest day tomorrow based on your intensity', 
      priority: 'low',
      action: 'Plan recovery',
      icon: Moon
    },
    {
      type: 'nutrition',
      message: 'You\'re 200 calories below target. Add a healthy snack!',
      priority: 'medium',
      action: 'Add meal',
      icon: Target
    }
  ]);

  const ProgressRing = ({ value, max, color, label, size = 120 }: any) => {
    const circumference = 2 * Math.PI * 45;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / max) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size} viewBox="0 0 100 100">
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
          <div className="text-xl font-bold">{value}</div>
          <div className="text-xs text-[#B3B3B3]">{label}</div>
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
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* User Stats Card */}
        <div className="col-span-1 md:col-span-2 p-6 rounded-xl bg-[#121212] border border-[#1E1E1E]">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Welcome back, {user.name}!</h2>
              <p className="text-[#B3B3B3]">Here's your fitness overview for today</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/30">
              <span className="text-sm font-medium text-[#FF7A00]">{user.level}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-[#1E1E1E]">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-[#FF7A00]" />
                <span className="text-sm text-[#B3B3B3]">Calories</span>
              </div>
              <div className="text-2xl font-bold text-white">1,842</div>
              <div className="text-xs text-[#B3B3B3]">+12% from yesterday</div>
            </div>
            <div className="p-4 rounded-lg bg-[#1E1E1E]">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-[#FF7A00]" />
                <span className="text-sm text-[#B3B3B3]">Steps</span>
              </div>
              <div className="text-2xl font-bold text-white">8,547</div>
              <div className="text-xs text-[#B3B3B3]">75% of daily goal</div>
            </div>
            <div className="p-4 rounded-lg bg-[#1E1E1E]">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-4 h-4 text-[#FF7A00]" />
                <span className="text-sm text-[#B3B3B3]">Water</span>
              </div>
              <div className="text-2xl font-bold text-white">1.8L</div>
              <div className="text-xs text-[#B3B3B3]">6/8 glasses</div>
            </div>
            <div className="p-4 rounded-lg bg-[#1E1E1E]">
              <div className="flex items-center gap-2 mb-2">
                <Moon className="w-4 h-4 text-[#FF7A00]" />
                <span className="text-sm text-[#B3B3B3]">Sleep</span>
              </div>
              <div className="text-2xl font-bold text-white">7.5h</div>
              <div className="text-xs text-[#B3B3B3]">Good quality</div>
            </div>
          </div>
        </div>

        {/* AI Insights Card */}
        <div className="col-span-1 p-6 rounded-xl bg-[#121212] border border-[#1E1E1E]">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-[#FF7A00]" />
            <h3 className="text-lg font-semibold text-white">AI Insights</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[#1E1E1E]">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#FF7A00]/20">
                  <Target className="w-4 h-4 text-[#FF7A00]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Today's Focus</h4>
                  <p className="text-xs text-[#B3B3B3]">Based on your recent activity, focus on upper body strength training today.</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-[#1E1E1E]">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#FF7A00]/20">
                  <Heart className="w-4 h-4 text-[#FF7A00]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Recovery Status</h4>
                  <p className="text-xs text-[#B3B3B3]">Your body is well-recovered. Ready for intense training!</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-[#1E1E1E]">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#FF7A00]/20">
                  <TrendingUp className="w-4 h-4 text-[#FF7A00]" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white mb-1">Progress Update</h4>
                  <p className="text-xs text-[#B3B3B3]">You're on track to reach your monthly goals. Keep it up!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 border-l-4 border-l-[#FF7A00]"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[#B3B3B3] text-sm">Calories Burned</p>
              <p className="text-2xl font-bold text-white">{metrics.calories}</p>
              <p className="text-[#B3B3B3] text-xs">Goal: 2000</p>
            </div>
            <Flame className="w-8 h-8 text-[#FF7A00]" />
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-[#FF7A00] h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(metrics.calories / 2000) * 100}%` }}
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 border-l-4 border-l-[#FFB347]"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[#B3B3B3] text-sm">Water Intake</p>
              <p className="text-2xl font-bold text-white">{metrics.waterIntake}/8</p>
              <p className="text-[#B3B3B3] text-xs">Glasses today</p>
            </div>
            <Droplets className="w-8 h-8 text-[#FFB347]" />
          </div>
          <div className="grid grid-cols-8 gap-1">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className={`h-3 rounded ${
                  i < metrics.waterIntake ? 'bg-[#FFB347]' : 'bg-white/20'
                } transition-all duration-300`}
                style={{ transitionDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6 border-l-4 border-l-[#FF7A00]"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[#B3B3B3] text-sm">Active Minutes</p>
              <p className="text-2xl font-bold text-white">{metrics.activeMinutes}</p>
              <p className="text-[#B3B3B3] text-xs">Goal: 150/week</p>
            </div>
            <Activity className="w-8 h-8 text-[#FF7A00]" />
          </div>
          <div className="text-center">
            <div className="text-[#FF7A00] font-bold">+23 from yesterday</div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6 border-l-4 border-l-[#FFB347]"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[#B3B3B3] text-sm">Sleep Score</p>
              <p className="text-2xl font-bold text-white">{metrics.sleepScore}/100</p>
              <p className="text-[#B3B3B3] text-xs">Excellent</p>
            </div>
            <Moon className="w-8 h-8 text-[#FFB347]" />
          </div>
          <div className="text-center">
            <div className="text-[#FFB347] font-bold">7.5 hrs last night</div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart />
        <NutritionChart />
      </div>

      {/* Today's AI Plan */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-6 h-6 text-[#FF7A00]" />
          <h2 className="text-xl font-bold text-white">Today's AI-Generated Plan</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-6 h-6 text-[#FF7A00]" />
              <h3 className="text-white font-bold">Workout</h3>
            </div>
            <p className="text-white font-medium mb-1">{todaysPlan.type}</p>
            <p className="text-[#B3B3B3] text-sm">{todaysPlan.duration} • {todaysPlan.intensity} intensity</p>
          </div>
          
          <div className="p-4 bg-[#FFB347]/10 border border-[#FFB347]/30 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <Brain className="w-6 h-6 text-[#FFB347]" />
              <h3 className="text-white font-bold">AI Insight</h3>
            </div>
            <p className="text-[#B3B3B3] text-sm">{todaysPlan.aiSuggestion}</p>
          </div>
          
          <div className="p-4 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-6 h-6 text-[#FF7A00]" />
              <h3 className="text-white font-bold">Recovery</h3>
            </div>
            <p className="text-[#B3B3B3] text-sm">Bedtime: 10:30 PM for optimal recovery</p>
          </div>
        </div>
      </motion.div>

      {/* Performance Rings */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-[#FF7A00]" />
          Performance Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-items-center">
          <ProgressRing value={metrics.energy} max={100} color="#FF7A00" label="Energy" />
          <ProgressRing value={metrics.strength} max={100} color="#FFB347" label="Strength" />
          <ProgressRing value={metrics.endurance} max={100} color="#FF7A00" label="Endurance" />
          <ProgressRing value={100 - metrics.fatigue} max={100} color="#FFB347" label="Recovery" />
        </div>
      </motion.div>

      {/* AI Highlights */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <Brain className="w-6 h-6 text-[#FF7A00]" />
          AI Highlights & Smart Alerts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiHighlights.map((highlight, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className={`p-4 rounded-xl border glass-card ${
                highlight.priority === 'high' ? 'border-red-500/30 bg-red-500/5' :
                highlight.priority === 'medium' ? 'border-[#FFB347]/30 bg-[#FFB347]/5' :
                'border-green-500/30 bg-green-500/5'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <highlight.icon className={`w-5 h-5 ${
                      highlight.priority === 'high' ? 'text-red-400' :
                      highlight.priority === 'medium' ? 'text-[#FFB347]' :
                      'text-green-400'
                    }`} />
                    <span className="text-white font-medium">{highlight.message}</span>
                  </div>
                  <button className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    highlight.priority === 'high' ? 'bg-red-500 text-white hover:bg-red-600' :
                    highlight.priority === 'medium' ? 'bg-[#FFB347] text-black hover:bg-[#FF7A00]' :
                    'bg-green-500 text-white hover:bg-green-600'
                  }`}>
                    {highlight.action}
                  </button>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs uppercase tracking-wide ${
                  highlight.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                  highlight.priority === 'medium' ? 'bg-[#FFB347]/20 text-[#FFB347]' :
                  'bg-green-500/20 text-green-300'
                }`}>
                  {highlight.priority}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Weekly Progress Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-[#FF7A00]" />
          Weekly Progress
        </h2>
        <div className="grid grid-cols-7 gap-3">
          {weeklyProgress.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-[#B3B3B3] text-sm mb-2 font-medium">{day.day}</div>
              <div 
                className={`h-24 rounded-xl flex items-end justify-center p-3 transition-all duration-500 ${
                  day.completed ? 'bg-[#FF7A00]/20 border border-[#FF7A00]/30' : 'bg-white/5 border border-white/10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {day.completed && (
                  <div className="text-white text-sm font-bold">{day.calories}</div>
                )}
              </div>
              <div className="text-sm mt-2">
                {day.completed ? (
                  <span className="text-[#FF7A00]">✓</span>
                ) : (
                  <span className="text-[#B3B3B3]">○</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedDashboard;
