import React, { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  Home, 
  Brain, 
  Dumbbell, 
  Apple, 
  Calculator, 
  Activity, 
  Target, 
  BookOpen, 
  Users,
  LogOut,
  Zap,
  Heart,
  TrendingUp,
  Settings,
  User,
  Key,
  Smartphone,
  LayoutDashboard,
  Moon,
  Trophy,
  Target as TargetIcon,
  BookOpen as BookOpenIcon,
  HeartPulse,
  Menu,
  X
} from 'lucide-react';
import { User as ClerkUser } from '@clerk/clerk-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';

interface AppSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user?: ClerkUser;
  onLogout?: () => void;
}

export function AppSidebar({ activeTab, setActiveTab, user, onLogout }: AppSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      title: 'Dashboard',
      items: [
        { name: 'Overview', href: 'dashboard', icon: LayoutDashboard },
        { name: 'AI Coach', href: 'ai-coach', icon: Brain },
      ]
    },
    {
      title: 'Fitness',
      items: [
        { name: 'Workouts', href: 'workout', icon: Dumbbell },
        { name: 'Activity', href: 'tracker', icon: Activity },
        { name: 'Goals', href: 'goals', icon: TargetIcon },
      ]
    },
    {
      title: 'Health',
      items: [
        { name: 'Nutrition', href: 'nutrition', icon: Apple },
        { name: 'Tools', href: 'tools', icon: Calculator },
        { name: 'Stress Impact', href: 'stress', icon: HeartPulse },
        { name: 'Sleep', href: 'sleep', icon: Moon },
        { name: 'Meditation', href: 'meditation', icon: Brain },
      ]
    },
    {
      title: 'Community',
      items: [
        { name: 'Wellness Hub', href: 'wellness', icon: BookOpenIcon },
        { name: 'Community', href: 'community', icon: Users },
        { name: 'Challenges', href: 'challenges', icon: Trophy },
      ]
    },
    {
      title: 'Settings',
      items: [
        { name: 'User Management', href: 'user-management', icon: User },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#0A0A0A] border border-[#1E1E1E] text-[#FF7A00] lg:hidden"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-[#0A0A0A] border-r border-[#1E1E1E] z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-4 border-b border-[#1E1E1E] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FFB347] flex items-center justify-center">
                    <Zap className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-white">FantAsAi.app</h1>
                    <p className="text-xs text-[#B3B3B3]">AI-Powered Fitness</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-lg text-[#B3B3B3] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                {navigationItems.map((group) => (
                  <div key={group.title} className="mb-6">
                    <h3 className="px-4 py-2 text-xs font-medium text-[#B3B3B3]">
                      {group.title}
                    </h3>
                    <div className="space-y-1">
                      {group.items.map((item) => (
                        <button
                          key={item.href}
                          onClick={() => {
                            setActiveTab(item.href);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                            activeTab === item.href
                              ? 'bg-[#FF7A00]/10 text-[#FF7A00]'
                              : 'text-[#B3B3B3] hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {user && (
                <div className="p-4 border-t border-[#1E1E1E] mt-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.imageUrl} alt={user.fullName || user.username || 'User'} />
                      <AvatarFallback className="bg-[#FF7A00]/20 text-[#FF7A00]">
                        {user.fullName?.[0] || user.username?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {user.fullName || user.username || 'User'}
                      </p>
                      <p className="text-xs text-[#B3B3B3] truncate">
                        {user.primaryEmailAddress?.emailAddress || 'No email'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:block w-64 border-r border-[#1E1E1E] bg-[#0A0A0A]">
        <SidebarHeader className="p-4 border-b border-[#1E1E1E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FFB347] flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">FantAsAi.app</h1>
              <p className="text-xs text-[#B3B3B3]">AI-Powered Fitness</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          {navigationItems.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel className="px-4 py-2 text-xs font-medium text-[#B3B3B3]">
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        onClick={() => setActiveTab(item.href)}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors ${
                          activeTab === item.href
                            ? 'bg-[#FF7A00]/10 text-[#FF7A00]'
                            : 'text-[#B3B3B3] hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-[#1E1E1E]">
          {user && (
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.imageUrl} alt={user.fullName || user.username || 'User'} />
                <AvatarFallback className="bg-[#FF7A00]/20 text-[#FF7A00]">
                  {user.fullName?.[0] || user.username?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.fullName || user.username || 'User'}
                </p>
                <p className="text-xs text-[#B3B3B3] truncate">
                  {user.primaryEmailAddress?.emailAddress || 'No email'}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
