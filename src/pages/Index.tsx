import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from '../components/AppSidebar';
import { useUser, useAuth } from '@clerk/clerk-react';
import EnhancedDashboard from '../components/EnhancedDashboard';
import AICoach from '../components/AICoach';
import WorkoutPlanner from '../components/WorkoutPlanner';
import HealthTools from '../components/HealthTools';
import ActivityTracker from '../components/ActivityTracker';
import GoalPlanning from '../components/GoalPlanning';
import WellnessHub from '../components/WellnessHub';
import NutritionAdvisor from '../components/NutritionAdvisor';
import Community from '../components/Community';
import UserManagement from '../components/UserManagement';
import SleepTracker from '../components/SleepTracker';
import Meditation from '../components/Meditation';
import Challenges from '../components/Challenges';
import StressImpact from '../components/StressImpact';

const Index = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLogout = async () => {
    await signOut();
  };

  const getPageTitle = (activeTab: string) => {
    const titles: { [key: string]: string } = {
      'dashboard': 'Dashboard',
      'ai-coach': 'AI Coach',
      'workout': 'Workouts',
      'tracker': 'Activity Tracker',
      'goals': 'Goals',
      'nutrition': 'Nutrition Advisor',
      'tools': 'Health Tools',
      'sleep': 'Sleep Tracker',
      'meditation': 'Meditation & Mindfulness',
      'wellness': 'Wellness Hub',
      'community': 'Community',
      'challenges': 'Challenges',
      'stress': 'Stress Impact',
      'user-management': 'User Management',
      'api-keys': 'API Keys',
      'devices': 'Connected Devices'
    };
    return titles[activeTab] || 'Dashboard';
  };

  const renderActiveComponent = () => {
    if (!user) return null;
    
    const userData = {
      id: user.id,
      name: user.fullName || user.username || 'User',
      email: user.primaryEmailAddress?.emailAddress || '',
      avatar: user.imageUrl || '💪',
      fitnessAge: 25, // Default value, can be updated in user management
      level: 'Intermediate' // Default value, can be updated in user management
    };

    switch (activeTab) {
      case 'dashboard':
        return <EnhancedDashboard user={userData} />;
      case 'ai-coach':
        return <AICoach user={userData} />;
      case 'workout':
        return <WorkoutPlanner user={userData} />;
      case 'tracker':
        return <ActivityTracker user={userData} />;
      case 'goals':
        return <GoalPlanning user={userData} />;
      case 'nutrition':
        return <NutritionAdvisor />;
      case 'tools':
        return <HealthTools user={userData} />;
      case 'sleep':
        return <SleepTracker />;
      case 'meditation':
        return <Meditation />;
      case 'wellness':
        return <WellnessHub user={userData} />;
      case 'community':
        return <Community user={userData} />;
      case 'challenges':
        return <Challenges />;
      case 'stress':
        return <StressImpact />;
      case 'user-management':
      case 'api-keys':
      case 'devices':
        return <UserManagement user={userData} onUpdateUser={() => {}} activeTab={activeTab} />;
      default:
        return <EnhancedDashboard user={userData} />;
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-white text-xl">Please sign in to access the dashboard</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            user={user}
            onLogout={handleLogout}
          />
          <SidebarInset className="flex-1 w-full">
            <header className="flex h-16 shrink-0 items-center gap-4 border-b border-[#1E1E1E] px-4 lg:px-6 bg-[#0A0A0A]/95 backdrop-blur-lg sticky top-0 z-40">
              {/* Mobile Menu Button Spacer */}
              <div className="w-10 sm:hidden" />
              
              <div className="flex-1 min-w-0 ml-0 sm:ml-0">
                <h1 className="text-base lg:text-xl font-semibold text-white truncate">
                  {getPageTitle(activeTab)}
                </h1>
                <p className="text-xs lg:text-sm text-[#B3B3B3] truncate">
                  Welcome back, {user.fullName || user.username}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 lg:gap-3">
                  <div className="px-2 lg:px-3 py-1 lg:py-1.5 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/30">
                    <span className="text-xs lg:text-sm font-medium text-[#FF7A00]">Pro Member</span>
                  </div>
                </div>
                {/* Mobile Pro Badge */}
                <div className="sm:hidden px-2 py-1 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/30">
                  <span className="text-xs font-medium text-[#FF7A00]">Pro</span>
                </div>
              </div>
            </header>
            
            <main className="flex-1 p-4 lg:p-6">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="h-full max-w-[2000px] mx-auto"
              >
                {renderActiveComponent()}
              </motion.div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
