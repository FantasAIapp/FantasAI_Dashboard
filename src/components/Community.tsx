import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, MessageCircle, Trophy, TrendingUp, Star, Heart, Share2, Camera, Sparkles, Users, Target, Zap } from 'lucide-react';

const Community = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);
  const [activeTab, setActiveTab] = useState('stories');
  const [aiInsight, setAiInsight] = useState('');

  const testimonials = [
    {
      name: 'Sarah Johnson',
      avatar: '👩‍💼',
      beforeWeight: '180 lbs',
      afterWeight: '145 lbs',
      timeframe: '8 months',
      story: 'FantAsAi.app completely transformed my relationship with fitness. The AI coach knew exactly when to push me and when to let me rest.',
      achievements: ['Lost 35 lbs', '25% body fat reduction', 'Completed first 5K']
    },
    {
      name: 'Mike Chen',
      avatar: '👨‍💻',
      beforeWeight: '155 lbs',
      afterWeight: '175 lbs',
      timeframe: '6 months',
      story: 'As a busy developer, I needed something smart that could adapt to my crazy schedule. The AI workout planner was perfect.',
      achievements: ['Gained 20 lbs muscle', 'Bench press 225 lbs', 'Improved sleep quality']
    },
    {
      name: 'Emma Rodriguez',
      avatar: '👩‍🎓',
      beforeWeight: '165 lbs',
      afterWeight: '140 lbs',
      timeframe: '10 months',
      story: 'The nutrition AI taught me so much about balanced eating. I never felt like I was on a diet, just making smarter choices.',
      achievements: ['Lost 25 lbs', 'Reduced stress levels', 'Better energy all day']
    }
  ];

  const beforeAfterGallery = [
    { id: 1, category: 'Weight Loss', before: '🔴', after: '🟢', transformation: '-30 lbs' },
    { id: 2, category: 'Muscle Gain', before: '🟡', after: '💪', transformation: '+15 lbs muscle' },
    { id: 3, category: 'Endurance', before: '😴', after: '⚡', transformation: '5K to Marathon' },
    { id: 4, category: 'Strength', before: '🤏', after: '💪', transformation: '2x bench press' }
  ];

  const communityPosts = [
    {
      user: 'Alex_Fitness23',
      avatar: '🏃‍♂️',
      time: '2 hours ago',
      content: 'Just hit a new PR thanks to the AI workout suggestions! 💪',
      likes: 24,
      comments: 8
    },
    {
      user: 'HealthyMom87',
      avatar: '👩‍⚕️',
      time: '5 hours ago',
      content: 'The meal planner saved me so much time this week. AI knew exactly what my family needed!',
      likes: 18,
      comments: 12
    },
    {
      user: 'GymRat_Pro',
      avatar: '🏋️‍♂️',
      time: '1 day ago',
      content: 'Recovery day suggestions were spot on. Feeling fresh for tomorrow\'s leg day! 🦵',
      likes: 31,
      comments: 6
    }
  ];

  const aiInsights = [
    {
      type: 'achievement',
      message: 'Your progress is in the top 10% of users with similar goals!',
      icon: Trophy,
      color: 'from-[#FF7A00] to-[#FFB347]'
    },
    {
      type: 'motivation',
      message: 'Based on your activity, you\'re on track to reach your goal 2 weeks early!',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      type: 'community',
      message: 'You\'ve inspired 5 other members this week with your consistency!',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const communityStats = {
    totalMembers: '10,234',
    activeToday: '1,234',
    successStories: '2,345',
    averageProgress: '+15%'
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header with AI Insights */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 border border-[#FF7A00]/30 bg-gradient-to-r from-[#1E1E1E] to-[#2A2A2A]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-[#FF7A00] to-[#FFB347] rounded-2xl flex items-center justify-center">
              <Users className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Community Hub</h1>
              <p className="text-white/70">AI-powered insights and community support</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#FF7A00]">{communityStats.totalMembers}</div>
            <div className="text-[#B3B3B3] text-sm">Active Members</div>
          </div>
        </div>

        {/* AI Insights Carousel */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4 border border-[#FF7A00]/20 hover:border-[#FF7A00]/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${insight.color} flex items-center justify-center`}>
                  <insight.icon className="w-5 h-5 text-black" />
                </div>
                <p className="text-white text-sm">{insight.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 p-2 bg-white/5 rounded-xl border border-white/10">
        {['stories', 'gallery', 'feed'].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-[#FF7A00] text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {tab === 'stories' && <Sparkles className="w-4 h-4 inline mr-2" />}
            {tab === 'gallery' && <Camera className="w-4 h-4 inline mr-2" />}
            {tab === 'feed' && <MessageCircle className="w-4 h-4 inline mr-2" />}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Content Sections */}
      {activeTab === 'stories' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 border border-[#FF7A00]/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[#FF7A00]" />
              Success Stories
            </h2>
            <div className="text-[#B3B3B3] text-sm">
              {communityStats.successStories} stories shared
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                onClick={() => setSelectedTestimonial(index)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedTestimonial === index 
                    ? 'border-[#FF7A00]/50 bg-[#FF7A00]/20' 
                    : 'border-white/20 bg-white/10 hover:bg-white/15'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-[#FF7A00] to-[#FFB347] rounded-full flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <h3 className="text-white font-bold">{testimonial.name}</h3>
                  <p className="text-white/70 text-sm">{testimonial.timeframe}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-red-400 text-lg font-bold">{testimonial.beforeWeight}</div>
                    <div className="text-white/70 text-xs">Before</div>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <div className="text-green-400 text-lg font-bold">{testimonial.afterWeight}</div>
                    <div className="text-white/70 text-xs">After</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {testimonial.achievements.map((achievement, i) => (
                    <div key={i} className="text-white/80 text-xs bg-white/10 rounded-full px-3 py-1 flex items-center gap-2">
                      <Target className="w-3 h-3 text-[#FF7A00]" />
                      {achievement}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Selected Testimonial Detail with AI Analysis */}
          <motion.div 
            key={selectedTestimonial}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-xl"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-white italic text-lg leading-relaxed">
                  "{testimonials[selectedTestimonial].story}"
                </p>
                <div className="mt-4 text-right">
                  <span className="text-[#FF7A00]">— {testimonials[selectedTestimonial].name}</span>
                </div>
              </div>
              <div className="w-48 p-4 bg-[#1E1E1E] rounded-lg border border-[#FF7A00]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-[#FF7A00]" />
                  <span className="text-white text-sm font-medium">AI Analysis</span>
                </div>
                <p className="text-white/70 text-xs">
                  Success pattern: Consistent tracking + Balanced nutrition + Progressive overload
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {activeTab === 'gallery' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 border border-[#FF7A00]/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Camera className="w-6 h-6 text-[#FF7A00]" />
              Transformation Gallery
            </h2>
            <button className="orange-button flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Share Progress
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {beforeAfterGallery.map((item) => (
              <motion.div
                key={item.id}
                className="p-4 glass-card border border-[#FF7A00]/20 hover:border-[#FF7A00]/40 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center mb-4">
                  <div className="text-sm text-white/70 mb-2">{item.category}</div>
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-3xl">
                      {item.before}
                    </div>
                    <div className="text-[#FF7A00]">→</div>
                    <div className="w-16 h-16 bg-[#FF7A00]/20 rounded-lg flex items-center justify-center text-3xl">
                      {item.after}
                    </div>
                  </div>
                  <div className="text-[#FF7A00] font-bold">{item.transformation}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'feed' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 border border-[#FF7A00]/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-[#FF7A00]" />
              Community Feed
            </h2>
            <div className="text-[#B3B3B3] text-sm">
              {communityStats.activeToday} active today
            </div>
          </div>
          <div className="space-y-4">
            {communityPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 glass-card border border-[#FF7A00]/20 hover:border-[#FF7A00]/40 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#FF7A00] to-[#FFB347] rounded-full flex items-center justify-center text-xl">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white font-medium">{post.user}</span>
                      <span className="text-white/50 text-sm">{post.time}</span>
                    </div>
                    <p className="text-white/90 mb-3">{post.content}</p>
                    <div className="flex items-center gap-4 text-white/70 text-sm">
                      <button className="hover:text-[#FF7A00] transition-colors flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </button>
                      <button className="hover:text-[#FF7A00] transition-colors flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </button>
                      <button className="hover:text-[#FF7A00] transition-colors flex items-center gap-1">
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 p-4 glass-card border border-[#FF7A00]/20">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Share your fitness journey..."
                className="flex-1 orange-input"
              />
              <button className="orange-button flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Add Photo
              </button>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2">
                <button className="text-white/70 hover:text-[#FF7A00] transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
                <button className="text-white/70 hover:text-[#FF7A00] transition-colors">
                  <Target className="w-5 h-5" />
                </button>
                <button className="text-white/70 hover:text-[#FF7A00] transition-colors">
                  <Zap className="w-5 h-5" />
                </button>
              </div>
              <button className="orange-button px-6">
                Post
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Community;
