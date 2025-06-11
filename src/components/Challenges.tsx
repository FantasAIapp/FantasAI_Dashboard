import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Users, 
  Calendar, 
  Target, 
  Award, 
  Star, 
  Clock, 
  TrendingUp,
  Brain,
  Heart,
  Apple,
  AlertTriangle,
  Activity,
  Droplet,
  Footprints,
  Moon,
  Pill,
  Stethoscope,
  Thermometer,
  Activity as ActivityIcon
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  duration: string;
  participants: number;
  progress: number;
  icon: any;
  color: string;
  category: 'fitness' | 'wellness' | 'nutrition' | 'medical' | 'health';
}

const Challenges = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'fitness' | 'wellness' | 'nutrition' | 'medical' | 'health'>('all');

  const challenges: Challenge[] = [
    // Fitness Challenges
    {
      id: '30-day-workout',
      title: '30 Day Workout Challenge',
      description: 'Complete a daily workout routine for 30 days',
      duration: '30 days',
      participants: 1234,
      progress: 75,
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      category: 'fitness'
    },
    {
      id: 'step-goal',
      title: '10K Steps Daily',
      description: 'Achieve 10,000 steps every day',
      duration: '7 days',
      participants: 2345,
      progress: 90,
      icon: Footprints,
      color: 'from-orange-500 to-red-500',
      category: 'fitness'
    },
    // Wellness Challenges
    {
      id: 'meditation-streak',
      title: 'Meditation Streak',
      description: 'Meditate for at least 10 minutes daily',
      duration: '21 days',
      participants: 856,
      progress: 60,
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
      category: 'wellness'
    },
    {
      id: 'sleep-hygiene',
      title: 'Sleep Hygiene Challenge',
      description: 'Improve your sleep habits and quality',
      duration: '28 days',
      participants: 432,
      progress: 30,
      icon: Moon,
      color: 'from-indigo-500 to-purple-500',
      category: 'wellness'
    },
    // Nutrition Challenges
    {
      id: 'healthy-eating',
      title: 'Clean Eating Challenge',
      description: 'Follow a balanced meal plan for 14 days',
      duration: '14 days',
      participants: 567,
      progress: 45,
      icon: Apple,
      color: 'from-green-500 to-emerald-500',
      category: 'nutrition'
    },
    {
      id: 'water-intake',
      title: 'Hydration Challenge',
      description: 'Drink 8 glasses of water daily',
      duration: '14 days',
      participants: 678,
      progress: 55,
      icon: Droplet,
      color: 'from-cyan-500 to-blue-500',
      category: 'nutrition'
    },
    // Medical Challenges
    {
      id: 'medication-tracker',
      title: 'Medication Adherence',
      description: 'Track and maintain medication schedule',
      duration: '30 days',
      participants: 345,
      progress: 85,
      icon: Pill,
      color: 'from-red-500 to-pink-500',
      category: 'medical'
    },
    {
      id: 'vital-signs',
      title: 'Vital Signs Monitoring',
      description: 'Regular tracking of blood pressure and heart rate',
      duration: '14 days',
      participants: 289,
      progress: 70,
      icon: Stethoscope,
      color: 'from-rose-500 to-red-500',
      category: 'medical'
    },
    // Health Alerts
    {
      id: 'health-check',
      title: 'Weekly Health Check',
      description: 'Regular health monitoring and symptom tracking',
      duration: '7 days',
      participants: 456,
      progress: 65,
      icon: Thermometer,
      color: 'from-yellow-500 to-orange-500',
      category: 'health'
    },
    {
      id: 'activity-monitor',
      title: 'Activity Monitoring',
      description: 'Track daily activity levels and energy expenditure',
      duration: '21 days',
      participants: 789,
      progress: 80,
      icon: ActivityIcon,
      color: 'from-green-500 to-teal-500',
      category: 'health'
    }
  ];

  const filteredChallenges = activeCategory === 'all' 
    ? challenges 
    : challenges.filter(challenge => challenge.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Challenges', icon: Trophy },
    { id: 'fitness', label: 'Fitness', icon: Target },
    { id: 'wellness', label: 'Wellness', icon: Brain },
    { id: 'nutrition', label: 'Nutrition', icon: Apple },
    { id: 'medical', label: 'Medical', icon: Stethoscope },
    { id: 'health', label: 'Health Alerts', icon: AlertTriangle }
  ];

  // Health Alerts Section
  const healthAlerts = [
    {
      id: 'blood-pressure',
      title: 'Blood Pressure Alert',
      status: 'warning',
      message: 'Your blood pressure readings are slightly elevated',
      icon: Activity,
      action: 'Schedule a check-up'
    },
    {
      id: 'medication',
      title: 'Medication Reminder',
      status: 'info',
      message: 'Time to take your prescribed medication',
      icon: Pill,
      action: 'Mark as taken'
    },
    {
      id: 'activity',
      title: 'Activity Level',
      status: 'success',
      message: 'You\'ve met your daily activity goal',
      icon: ActivityIcon,
      action: 'View details'
    }
  ];

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
            <Trophy className="w-8 h-8 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Challenges & Health Alerts</h1>
            <p className="text-white/70">Track your progress and stay informed about your health</p>
          </div>
        </div>
      </motion.div>

      {/* Health Alerts Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#FF7A00]" />
          Health Alerts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {healthAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              className={`p-4 rounded-xl border ${
                alert.status === 'warning' 
                  ? 'border-yellow-500/50 bg-yellow-500/10' 
                  : alert.status === 'info'
                  ? 'border-blue-500/50 bg-blue-500/10'
                  : 'border-green-500/50 bg-green-500/10'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <alert.icon className={`w-5 h-5 ${
                  alert.status === 'warning' 
                    ? 'text-yellow-500' 
                    : alert.status === 'info'
                    ? 'text-blue-500'
                    : 'text-green-500'
                }`} />
                <h3 className="font-semibold text-white">{alert.title}</h3>
              </div>
              <p className="text-[#B3B3B3] text-sm mb-3">{alert.message}</p>
              <button className="text-[#FF7A00] hover:text-[#FFB347] text-sm transition-colors">
                {alert.action}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-4"
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeCategory === category.id
                  ? 'bg-[#FF7A00] text-black'
                  : 'bg-[#1E1E1E] text-white hover:bg-[#2A2A2A]'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Active Challenges */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-semibold text-white mb-6">Active Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChallenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              className="bg-[#1E1E1E] rounded-xl border border-[#FF7A00]/20 p-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${challenge.color} flex items-center justify-center`}>
                  <challenge.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{challenge.title}</h3>
                  <p className="text-sm text-[#B3B3B3]">{challenge.duration}</p>
                </div>
              </div>
              <p className="text-[#B3B3B3] text-sm mb-4">{challenge.description}</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#B3B3B3]">Progress</span>
                  <span className="text-white">{challenge.progress}%</span>
                </div>
                <div className="h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#FF7A00] to-[#FFB347] rounded-full"
                    style={{ width: `${challenge.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-[#B3B3B3]">
                    <Users className="w-4 h-4" />
                    <span>{challenge.participants}</span>
                  </div>
                  <button className="text-[#FF7A00] hover:text-[#FFB347] transition-colors">
                    Join Challenge
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Leaderboard Preview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Top Performers</h2>
          <button className="text-[#FF7A00] hover:text-[#FFB347] transition-colors">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((rank) => (
            <div key={rank} className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7A00] to-[#FFB347] flex items-center justify-center">
                  <span className="text-black font-semibold">{rank}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">User {rank}</h3>
                  <p className="text-sm text-[#B3B3B3]">3 Challenges Completed</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#FF7A00]" />
                <span className="text-white font-semibold">{1000 - (rank * 100)} pts</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Challenges; 