
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Calendar, Award, Plus, Edit3, Check, X } from 'lucide-react';

const GoalPlanning = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Lose 10 lbs',
      category: 'Weight Loss',
      target: 10,
      current: 3,
      unit: 'lbs',
      deadline: '2024-08-01',
      priority: 'high',
      status: 'in-progress'
    },
    {
      id: 2,
      title: 'Run 5K under 25 minutes',
      category: 'Cardio',
      target: 25,
      current: 28,
      unit: 'min',
      deadline: '2024-07-15',
      priority: 'medium',
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Bench Press 200 lbs',
      category: 'Strength',
      target: 200,
      current: 165,
      unit: 'lbs',
      deadline: '2024-09-01',
      priority: 'high',
      status: 'in-progress'
    },
    {
      id: 4,
      title: 'Daily Water Intake',
      category: 'Nutrition',
      target: 8,
      current: 6,
      unit: 'glasses',
      deadline: 'Daily',
      priority: 'medium',
      status: 'in-progress'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    category: 'Weight Loss',
    target: '',
    unit: '',
    deadline: '',
    priority: 'medium'
  });

  const categories = [
    { name: 'Weight Loss', icon: '⚖️', color: 'from-red-500 to-orange-500' },
    { name: 'Strength', icon: '💪', color: 'from-blue-500 to-purple-500' },
    { name: 'Cardio', icon: '❤️', color: 'from-pink-500 to-red-500' },
    { name: 'Nutrition', icon: '🥗', color: 'from-green-500 to-emerald-500' },
    { name: 'Flexibility', icon: '🧘‍♀️', color: 'from-purple-500 to-pink-500' },
    { name: 'Sleep', icon: '😴', color: 'from-indigo-500 to-blue-500' }
  ];

  const addGoal = () => {
    if (newGoal.title && newGoal.target) {
      const goal = {
        id: Date.now(),
        ...newGoal,
        target: parseFloat(newGoal.target),
        current: 0,
        status: 'not-started'
      };
      setGoals([...goals, goal]);
      setNewGoal({
        title: '',
        category: 'Weight Loss',
        target: '',
        unit: '',
        deadline: '',
        priority: 'medium'
      });
      setShowAddModal(false);
    }
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500/50 bg-red-500/10';
      case 'medium': return 'border-[#FFB347]/50 bg-[#FFB347]/10';
      case 'low': return 'border-green-500/50 bg-green-500/10';
      default: return 'border-[#FF7A00]/50 bg-[#FF7A00]/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <Check className="w-5 h-5 text-green-500" />;
      case 'in-progress': return <TrendingUp className="w-5 h-5 text-[#FF7A00]" />;
      default: return <Target className="w-5 h-5 text-[#B3B3B3]" />;
    }
  };

  const GoalCard = ({ goal }) => {
    const progress = getProgressPercentage(goal.current, goal.target);
    const category = categories.find(c => c.name === goal.category);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className={`glass-card p-6 border ${getPriorityColor(goal.priority)} relative overflow-hidden`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${category?.color} flex items-center justify-center`}>
              <span className="text-lg">{category?.icon}</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{goal.title}</h3>
              <p className="text-[#B3B3B3] text-sm">{goal.category}</p>
            </div>
          </div>
          {getStatusIcon(goal.status)}
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#B3B3B3] text-sm">Progress</span>
            <span className="text-white font-medium">
              {goal.current} / {goal.target} {goal.unit}
            </span>
          </div>
          <div className="w-full bg-[#1E1E1E] rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-[#FF7A00] to-[#FFB347] h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="text-right mt-1">
            <span className="text-[#FF7A00] font-bold text-sm">{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#FF7A00]" />
            <span className="text-[#B3B3B3]">{goal.deadline}</span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            goal.priority === 'high' ? 'bg-red-500/20 text-red-400' :
            goal.priority === 'medium' ? 'bg-[#FFB347]/20 text-[#FFB347]' :
            'bg-green-500/20 text-green-400'
          }`}>
            {goal.priority}
          </div>
        </div>

        {/* AI Suggestion */}
        {progress > 50 && progress < 100 && (
          <div className="mt-4 p-3 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg">
            <p className="text-[#FF7A00] text-xs font-medium">
              🤖 AI Tip: You're {Math.round(progress)}% there! Increase intensity by 10% this week to stay on track.
            </p>
          </div>
        )}
      </motion.div>
    );
  };

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
              <Target className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Goal Planning</h1>
              <p className="text-white/70">Track your fitness milestones and achievements</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="orange-button flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Goal
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 border-l-4 border-l-[#FF7A00]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#B3B3B3] text-sm">Total Goals</p>
              <p className="text-2xl font-bold text-white">{goals.length}</p>
            </div>
            <Target className="w-8 h-8 text-[#FF7A00]" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 border-l-4 border-l-green-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#B3B3B3] text-sm">Completed</p>
              <p className="text-2xl font-bold text-white">
                {goals.filter(g => g.status === 'completed').length}
              </p>
            </div>
            <Award className="w-8 h-8 text-green-500" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4 border-l-4 border-l-[#FFB347]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#B3B3B3] text-sm">In Progress</p>
              <p className="text-2xl font-bold text-white">
                {goals.filter(g => g.status === 'in-progress').length}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-[#FFB347]" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-4 border-l-4 border-l-blue-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#B3B3B3] text-sm">Avg Progress</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(goals.reduce((acc, goal) => acc + getProgressPercentage(goal.current, goal.target), 0) / goals.length)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </motion.div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <GoalCard goal={goal} />
          </motion.div>
        ))}
      </div>

      {/* Add Goal Modal */}
      {showAddModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#121212] border border-[#FF7A00]/30 rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <Plus className="w-6 h-6 text-[#FF7A00]" />
                Add New Goal
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#B3B3B3] hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white/70 mb-2 font-medium">Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  className="orange-input w-full"
                  placeholder="e.g., Run 5K under 25 minutes"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-2 font-medium">Category</label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                  className="orange-input w-full"
                >
                  {categories.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 mb-2 font-medium">Target</label>
                  <input
                    type="number"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                    className="orange-input w-full"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-2 font-medium">Unit</label>
                  <input
                    type="text"
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                    className="orange-input w-full"
                    placeholder="minutes"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-2 font-medium">Deadline</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  className="orange-input w-full"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-2 font-medium">Priority</label>
                <select
                  value={newGoal.priority}
                  onChange={(e) => setNewGoal({...newGoal, priority: e.target.value})}
                  className="orange-input w-full"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={addGoal}
                  className="orange-button flex-1"
                >
                  Create Goal
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#1E1E1E] text-white rounded-lg hover:bg-[#2E2E2E] transition-colors border border-[#FF7A00]/30"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default GoalPlanning;
