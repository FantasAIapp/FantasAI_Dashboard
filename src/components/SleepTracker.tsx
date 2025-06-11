import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Clock, TrendingUp, Activity, Calendar, BarChart2 } from 'lucide-react';

const SleepTracker = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const sleepData = {
    averageSleep: 7.5,
    sleepQuality: 85,
    sleepSchedule: [
      { day: 'Mon', hours: 7.2, quality: 82 },
      { day: 'Tue', hours: 8.0, quality: 88 },
      { day: 'Wed', hours: 6.8, quality: 75 },
      { day: 'Thu', hours: 7.5, quality: 85 },
      { day: 'Fri', hours: 7.0, quality: 80 },
      { day: 'Sat', hours: 8.5, quality: 90 },
      { day: 'Sun', hours: 7.8, quality: 87 },
    ],
    recommendations: [
      'Try to maintain a consistent sleep schedule',
      'Avoid caffeine after 2 PM',
      'Keep your bedroom cool and dark',
      'Limit screen time before bed'
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#FF7A00]/20 to-[#FFB347]/20 backdrop-blur-lg rounded-2xl p-6 border border-[#FF7A00]/20"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FF7A00] flex items-center justify-center">
            <Moon className="w-8 h-8 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Sleep Tracker</h1>
            <p className="text-white/70">Monitor and improve your sleep quality</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-6 h-6 text-[#FF7A00]" />
            <h3 className="text-lg font-semibold text-white">Average Sleep</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{sleepData.averageSleep}h</div>
          <p className="text-[#B3B3B3] text-sm">per night</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-[#FF7A00]" />
            <h3 className="text-lg font-semibold text-white">Sleep Quality</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{sleepData.sleepQuality}%</div>
          <p className="text-[#B3B3B3] text-sm">overall quality</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-[#FF7A00]" />
            <h3 className="text-lg font-semibold text-white">Sleep Score</h3>
          </div>
          <div className="text-3xl font-bold text-white mb-1">92</div>
          <p className="text-[#B3B3B3] text-sm">excellent</p>
        </motion.div>
      </div>

      {/* Sleep Schedule */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-[#FF7A00]" />
          <h2 className="text-xl font-semibold text-white">Weekly Sleep Schedule</h2>
        </div>
        <div className="grid grid-cols-7 gap-4">
          {sleepData.sleepSchedule.map((day) => (
            <div key={day.day} className="text-center">
              <div className="text-sm text-[#B3B3B3] mb-2">{day.day}</div>
              <div className="h-32 bg-[#1E1E1E] rounded-lg p-2 flex flex-col justify-end">
                <div 
                  className="bg-[#FF7A00] rounded-t-lg transition-all duration-300"
                  style={{ height: `${(day.hours / 10) * 100}%` }}
                />
              </div>
              <div className="text-sm text-white mt-2">{day.hours}h</div>
              <div className="text-xs text-[#B3B3B3]">{day.quality}%</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <BarChart2 className="w-6 h-6 text-[#FF7A00]" />
          <h2 className="text-xl font-semibold text-white">Sleep Recommendations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sleepData.recommendations.map((recommendation, index) => (
            <div 
              key={index}
              className="p-4 bg-[#1E1E1E] rounded-lg border border-[#FF7A00]/20"
            >
              <p className="text-white">{recommendation}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SleepTracker; 