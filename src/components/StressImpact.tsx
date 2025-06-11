import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Activity, Heart, Moon, Zap, Target, TrendingUp, Clock } from 'lucide-react';

interface StressMetrics {
  stressLevel: number;
  recoveryScore: number;
  sleepQuality: number;
  energyLevel: number;
  lastWorkout: string;
  recommendedActivity: string;
}

const StressImpact: React.FC = () => {
  const [metrics, setMetrics] = useState<StressMetrics>({
    stressLevel: 35,
    recoveryScore: 85,
    sleepQuality: 78,
    energyLevel: 82,
    lastWorkout: '2 hours ago',
    recommendedActivity: 'Moderate Intensity Cardio'
  });

  const stressGuidance = {
    low: {
      workout: 'High Intensity Training',
      duration: '45-60 minutes',
      activities: ['HIIT', 'Strength Training', 'Sprint Intervals'],
      tips: [
        'Perfect time for challenging workouts',
        'Focus on progressive overload',
        'Push your limits with proper form'
      ]
    },
    moderate: {
      workout: 'Moderate Intensity Cardio',
      duration: '30-45 minutes',
      activities: ['Steady State Cardio', 'Light Strength Training', 'Yoga'],
      tips: [
        'Balance intensity with recovery',
        'Include active recovery days',
        'Stay hydrated and monitor heart rate'
      ]
    },
    high: {
      workout: 'Low Intensity Recovery',
      duration: '20-30 minutes',
      activities: ['Walking', 'Stretching', 'Meditation', 'Light Yoga'],
      tips: [
        'Focus on stress reduction',
        'Prioritize sleep and recovery',
        'Consider taking a rest day'
      ]
    }
  };

  const getStressLevel = (level: number) => {
    if (level <= 30) return 'low';
    if (level <= 70) return 'moderate';
    return 'high';
  };

  const currentStressLevel = getStressLevel(metrics.stressLevel);
  const guidance = stressGuidance[currentStressLevel];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 orange-gradient border border-[#FF7A00]/30"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-[#FF7A00] to-[#FFB347] rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Stress Impact Analysis</h1>
              <p className="text-white/70">Personalized workout guidance based on stress levels</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#FF7A00]">{metrics.recoveryScore}%</div>
            <div className="text-[#B3B3B3] text-sm">Recovery Score</div>
          </div>
        </div>
      </motion.div>

      {/* Stress Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          icon={Activity} 
          label="Stress Level" 
          value={`${metrics.stressLevel}%`} 
          color={metrics.stressLevel <= 30 ? 'text-green-500' : metrics.stressLevel <= 70 ? 'text-yellow-500' : 'text-red-500'} 
        />
        <MetricCard 
          icon={Heart} 
          label="Recovery Score" 
          value={`${metrics.recoveryScore}%`} 
          color="text-[#FF7A00]" 
        />
        <MetricCard 
          icon={Moon} 
          label="Sleep Quality" 
          value={`${metrics.sleepQuality}%`} 
          color="text-blue-500" 
        />
        <MetricCard 
          icon={Zap} 
          label="Energy Level" 
          value={`${metrics.energyLevel}%`} 
          color="text-[#FFB347]" 
        />
      </div>

      {/* Workout Guidance */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <Target className="w-6 h-6 text-[#FF7A00]" />
          Recommended Workout Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">Today's Recommendation</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white">
                  <Activity className="w-5 h-5 text-[#FF7A00]" />
                  <span>{guidance.workout}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Clock className="w-5 h-5 text-[#FF7A00]" />
                  <span>{guidance.duration}</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#1E1E1E] border border-[#FF7A00]/20 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">Recommended Activities</h3>
              <ul className="space-y-2">
                {guidance.activities.map((activity, index) => (
                  <li key={index} className="flex items-center gap-2 text-white">
                    <div className="w-1.5 h-1.5 bg-[#FF7A00] rounded-full" />
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-[#1E1E1E] border border-[#FF7A00]/20 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">Training Tips</h3>
              <ul className="space-y-2">
                {guidance.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-white">
                    <div className="w-1.5 h-1.5 bg-[#FF7A00] rounded-full mt-2" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">Recovery Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-white">
                  <span>Last Workout</span>
                  <span className="text-[#FF7A00]">{metrics.lastWorkout}</span>
                </div>
                <div className="flex items-center justify-between text-white">
                  <span>Next Workout</span>
                  <span className="text-[#FF7A00]">In 2 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Insights */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
          <Brain className="w-6 h-6 text-[#FF7A00]" />
          AI Insights
        </h2>
        <div className="space-y-3">
          <div className="p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
            <p className="text-white">💡 Based on your stress levels, consider incorporating more mindfulness exercises into your routine.</p>
          </div>
          <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
            <p className="text-white">🎯 Your recovery score is excellent! You're ready for more challenging workouts.</p>
          </div>
          <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
            <p className="text-white">⚡ Energy levels suggest you should focus on quality over quantity in your workouts today.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const MetricCard = ({ icon: Icon, label, value, color }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="glass-card p-4 flex items-center gap-4"
  >
    <div className={`w-12 h-12 rounded-xl bg-[#1E1E1E] flex items-center justify-center ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <div className="text-sm text-[#B3B3B3]">{label}</div>
      <div className={`text-xl font-bold ${color}`}>{value}</div>
    </div>
  </motion.div>
);

export default StressImpact; 