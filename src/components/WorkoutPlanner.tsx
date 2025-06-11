
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Target, Brain, Activity } from 'lucide-react';
import WorkoutCalendar from './calendar/WorkoutCalendar';

const WorkoutPlanner = () => {
  const [selectedGoal, setSelectedGoal] = useState('strength');
  const [activeView, setActiveView] = useState('planner');

  const workoutPlans = {
    strength: {
      name: 'Strength Building',
      color: 'from-red-500 to-orange-500',
      schedule: [
        { day: 'Monday', type: 'Upper Body', intensity: 'High', duration: '60min', emoji: '💪' },
        { day: 'Tuesday', type: 'Lower Body', intensity: 'High', duration: '55min', emoji: '🦵' },
        { day: 'Wednesday', type: 'Rest', intensity: 'Low', duration: '30min', emoji: '🧘‍♂️' },
        { day: 'Thursday', type: 'Push Day', intensity: 'Medium', duration: '50min', emoji: '🏋️‍♂️' },
        { day: 'Friday', type: 'Pull Day', intensity: 'Medium', duration: '50min', emoji: '🎯' },
        { day: 'Saturday', type: 'Full Body', intensity: 'High', duration: '65min', emoji: '🔥' },
        { day: 'Sunday', type: 'Active Recovery', intensity: 'Low', duration: '20min', emoji: '🚶‍♂️' }
      ]
    },
    cardio: {
      name: 'Cardio Focus',
      color: 'from-blue-500 to-cyan-500',
      schedule: [
        { day: 'Monday', type: 'HIIT Training', intensity: 'High', duration: '30min', emoji: '⚡' },
        { day: 'Tuesday', type: 'Steady Cardio', intensity: 'Medium', duration: '45min', emoji: '🏃‍♂️' },
        { day: 'Wednesday', type: 'Strength', intensity: 'Medium', duration: '40min', emoji: '💪' },
        { day: 'Thursday', type: 'Interval Run', intensity: 'High', duration: '35min', emoji: '🏃‍♀️' },
        { day: 'Friday', type: 'Cross Training', intensity: 'Medium', duration: '50min', emoji: '🚴‍♂️' },
        { day: 'Saturday', type: 'Long Cardio', intensity: 'Low', duration: '60min', emoji: '🌊' },
        { day: 'Sunday', type: 'Rest', intensity: 'Low', duration: '0min', emoji: '😴' }
      ]
    },
    hybrid: {
      name: 'Hybrid Training',
      color: 'from-purple-500 to-pink-500',
      schedule: [
        { day: 'Monday', type: 'Strength + Cardio', intensity: 'High', duration: '70min', emoji: '🔥' },
        { day: 'Tuesday', type: 'Yoga Flow', intensity: 'Low', duration: '45min', emoji: '🧘‍♀️' },
        { day: 'Wednesday', type: 'HIIT Circuit', intensity: 'High', duration: '40min', emoji: '⚡' },
        { day: 'Thursday', type: 'Functional', intensity: 'Medium', duration: '50min', emoji: '🎯' },
        { day: 'Friday', type: 'Cardio Blast', intensity: 'High', duration: '35min', emoji: '💥' },
        { day: 'Saturday', type: 'Full Body', intensity: 'Medium', duration: '60min', emoji: '💪' },
        { day: 'Sunday', type: 'Active Recovery', intensity: 'Low', duration: '30min', emoji: '🚶‍♂️' }
      ]
    }
  };

  const currentPlan = workoutPlans[selectedGoal];

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'High': return 'bg-red-500/30 border-red-500/50';
      case 'Medium': return 'bg-yellow-500/30 border-yellow-500/50';
      case 'Low': return 'bg-green-500/30 border-green-500/50';
      default: return 'bg-gray-500/30 border-gray-500/50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#FF7A00]/20 to-[#FFB347]/20 backdrop-blur-lg rounded-2xl p-6 border border-[#FF7A00]/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-6xl">📆</div>
            <div>
              <h1 className="text-3xl font-bold text-white">Intelligent Workout Planner</h1>
              <p className="text-white/70">AI-powered training schedules adapted to your goals</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveView('planner')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeView === 'planner'
                  ? 'bg-[#FF7A00] text-black'
                  : 'bg-white/10 text-[#B3B3B3] hover:text-white'
              }`}
            >
              <Target className="w-4 h-4 inline mr-2" />
              Planner
            </button>
            <button
              onClick={() => setActiveView('calendar')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeView === 'calendar'
                  ? 'bg-[#FF7A00] text-black'
                  : 'bg-white/10 text-[#B3B3B3] hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Calendar
            </button>
          </div>
        </div>
      </motion.div>

      {activeView === 'calendar' ? (
        <WorkoutCalendar />
      ) : (
        <>
          {/* Goal Selection */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Select Your Training Goal</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(workoutPlans).map(([key, plan]) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedGoal(key)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedGoal === key 
                      ? 'border-[#FF7A00]/50 bg-[#FF7A00]/20' 
                      : 'border-white/20 bg-white/10 hover:bg-white/15'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`text-2xl font-bold text-transparent bg-gradient-to-r ${plan.color} bg-clip-text mb-2`}>
                    {plan.name}
                  </div>
                  <div className="text-white/70 text-sm">
                    {key === 'strength' && 'Build muscle & increase power'}
                    {key === 'cardio' && 'Improve endurance & burn fat'}
                    {key === 'hybrid' && 'Balanced strength & cardio'}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Weekly Schedule */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Weekly Schedule</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {currentPlan.schedule.map((workout, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`p-4 rounded-xl border ${getIntensityColor(workout.intensity)} backdrop-blur-sm`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{workout.emoji}</div>
                    <div className="text-white font-bold text-sm mb-1">{workout.day}</div>
                    <div className="text-white text-xs mb-2">{workout.type}</div>
                    <div className="text-white/70 text-xs mb-1">{workout.duration}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      workout.intensity === 'High' ? 'bg-red-500/50' :
                      workout.intensity === 'Medium' ? 'bg-yellow-500/50' :
                      'bg-green-500/50'
                    } text-white`}>
                      {workout.intensity}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Recommendations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Brain className="w-6 h-6 text-[#FF7A00]" />
              AI Recommendations
            </h2>
            <div className="space-y-3">
              <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <p className="text-white">💡 Based on your recovery metrics, consider reducing intensity by 10% this week.</p>
              </div>
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-white">🎯 Your consistency is excellent! You're on track to exceed your monthly goals.</p>
              </div>
              <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                <p className="text-white">⚡ Energy levels suggest adding 5 minutes to your cardio sessions would be optimal.</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default WorkoutPlanner;
