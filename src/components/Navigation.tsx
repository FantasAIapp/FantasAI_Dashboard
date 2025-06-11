import React from 'react';
import { motion } from 'framer-motion';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user?: any;
  onLogout?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, user, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'ai-coach', label: 'AI Coach', icon: '🧠' },
    { id: 'workout', label: 'Workout', icon: '💪' },
    { id: 'nutrition', label: 'Nutrition', icon: '🥗' },
    { id: 'tools', label: 'Tools', icon: '🧮' },
    { id: 'tracker', label: 'Tracker', icon: '⏱️' },
    { id: 'goals', label: 'Goals', icon: '🎯' },
    { id: 'wellness', label: 'Wellness', icon: '📚' },
    { id: 'community', label: 'Community', icon: '👥' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-3xl">💪</span>
            AI Powered Fitness
          </div>
          
          <div className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </motion.button>
            ))}
          </div>

          <div className="hidden md:block lg:hidden">
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value)}
              className="bg-black/20 text-white border border-white/20 rounded-lg px-3 py-2"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id} className="bg-gray-900">
                  {item.icon} {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* User Profile & Logout */}
          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-white">
                <span className="text-2xl">{user.avatar}</span>
                <span className="font-medium">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value)}
              className="bg-black/20 text-white border border-white/20 rounded-lg px-3 py-2 text-sm"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id} className="bg-gray-900">
                  {item.icon} {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
