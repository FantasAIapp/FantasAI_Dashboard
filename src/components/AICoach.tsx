import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, Bot, User, Heart, Zap, Moon, Activity, Brain } from 'lucide-react';

const AICoach = ({ user }) => {
  const [chatMessages, setChatMessages] = useState([
    { 
      type: 'ai', 
      message: `Hey ${user.name}! 🚀 I'm your AI fitness coach. I've analyzed your metrics and you're looking great today! How can I help optimize your training?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const coachStats = {
    energyLevel: 85,
    stressLevel: 'Low 😌',
    heartRateZone: 'Zone 2 (120-140 bpm)',
    sleepScore: 85,
    recoveryStatus: 'Excellent 💚',
    readiness: 92
  };

  const quickSuggestions = [
    { text: "What should I do today?", icon: "🎯" },
    { text: "How's my recovery?", icon: "🔋" },
    { text: "Should I rest or train?", icon: "⚖️" },
    { text: "Optimize my nutrition", icon: "🥗" },
    { text: "Sleep recommendations", icon: "😴" },
    { text: "Stress management tips", icon: "🧘‍♂️" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const generateAIResponse = (message: string) => {
    const responses = {
      "What should I do today?": `Based on your energy levels (${coachStats.energyLevel}%), I recommend a moderate-intensity upper body strength session. Your recovery is excellent, so you can push harder today! 🏋️‍♂️ Focus on compound movements for maximum efficiency.`,
      "How's my recovery?": `Your recovery looks fantastic! Sleep score of ${coachStats.sleepScore}% and low stress levels indicate you're ready for action. Your HRV suggests optimal nervous system recovery. Time to challenge yourself! 🌟`,
      "Should I rest or train?": `With your current readiness score of ${coachStats.readiness}%, you're in prime condition to train! I'd suggest a 45-minute session focusing on strength training. Your body is primed for growth! 💪`,
      "Optimize my nutrition": `Your current macro split looks good, but I'd recommend increasing protein to 1.6g per kg body weight. Try adding a post-workout shake within 30 minutes. Also, your hydration could use a boost - aim for 2 more glasses today! 🥤`,
      "Sleep recommendations": `Your sleep score is solid at ${coachStats.sleepScore}%! To optimize further, try going to bed 30 minutes earlier and keep your room at 66-68°F. Consider limiting blue light 1 hour before bed. 😴`,
      "Stress management tips": `Your stress is currently low - great job! To maintain this, I recommend 10 minutes of deep breathing between workouts, and consider adding yoga or meditation to your routine. Remember, stress management is crucial for gains! 🧘‍♂️`
    };

    return responses[message] || `Great question! Based on your current metrics and progress, I'd suggest staying consistent with your routine while listening to your body. Your ${coachStats.energyLevel}% energy level shows you're doing amazingly well! Keep up the fantastic work! 🚀`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        message: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="glass-card p-4 border-l-4 border-l-[#FF7A00]"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[#B3B3B3] text-sm">{label}</p>
          <p className="text-white font-bold text-lg">{value}</p>
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Enhanced Coach Header */}
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
              <h1 className="text-3xl font-bold text-white">AI Powered Fitness Coach</h1>
              <p className="text-white/70">Your personal AI fitness companion</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">Online & Ready</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#FF7A00]">{coachStats.readiness}</div>
            <div className="text-[#B3B3B3] text-sm">Readiness Score</div>
          </div>
        </div>
      </motion.div>

      {/* Real-time Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Zap} label="Energy Level" value={`${coachStats.energyLevel}%`} color="text-[#FF7A00]" />
        <StatCard icon={Heart} label="Heart Rate Zone" value="Zone 2" color="text-red-500" />
        <StatCard icon={Moon} label="Sleep Score" value={`${coachStats.sleepScore}/100`} color="text-blue-500" />
        <StatCard icon={Activity} label="Recovery" value="Excellent" color="text-green-500" />
      </div>

      {/* Enhanced Chat Interface */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card overflow-hidden"
      >
        <div className="p-6 border-b border-[#FF7A00]/20 bg-gradient-to-r from-[#FF7A00]/10 to-[#FFB347]/10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Bot className="w-6 h-6 text-[#FF7A00]" />
            AI Conversation
          </h2>
          <p className="text-[#B3B3B3] text-sm mt-1">Get personalized advice and insights</p>
        </div>
        
        {/* Messages Container */}
        <div className="h-96 overflow-y-auto p-6 space-y-4 bg-[#0A0A0A]/50">
          <AnimatePresence>
            {chatMessages.map((msg, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-xs lg:max-w-md ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.type === 'user' ? 'bg-[#FF7A00]' : 'bg-gradient-to-r from-[#FF7A00] to-[#FFB347]'
                  }`}>
                    {msg.type === 'user' ? (
                      <User className="w-4 h-4 text-black" />
                    ) : (
                      <Bot className="w-4 h-4 text-black" />
                    )}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl ${
                    msg.type === 'user' 
                      ? 'bg-[#FF7A00] text-black' 
                      : 'glass-card border border-[#FF7A00]/30'
                  }`}>
                    <p className={msg.type === 'user' ? 'text-black' : 'text-white'}>{msg.message}</p>
                    <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-black/70' : 'text-[#B3B3B3]'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-[#FF7A00] to-[#FFB347] rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-black" />
                </div>
                <div className="glass-card px-4 py-3 rounded-2xl border border-[#FF7A00]/30">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#FF7A00] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#FF7A00] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#FF7A00] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions */}
        <div className="p-4 border-t border-[#FF7A00]/20">
          <div className="flex gap-2 mb-4 flex-wrap">
            {quickSuggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setInputMessage(suggestion.text)}
                className="px-3 py-2 bg-[#FF7A00]/10 border border-[#FF7A00]/30 text-white rounded-full text-sm hover:bg-[#FF7A00]/20 transition-all flex items-center gap-1"
              >
                <span>{suggestion.icon}</span>
                {suggestion.text}
              </motion.button>
            ))}
          </div>
          
          {/* Input Area */}
          <div className="flex gap-2 p-4 bg-[#1E1E1E] border-t border-[#FF7A00]/20">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your AI coach anything about your fitness, nutrition, or wellness..."
                className="w-full min-h-[60px] px-4 py-3 bg-[#2A2A2A] text-white rounded-xl border-2 border-[#FF7A00]/30 focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/20 outline-none transition-all resize-none pr-12 placeholder:text-[#B3B3B3] placeholder:text-sm"
                rows={1}
                style={{
                  boxShadow: '0 2px 10px rgba(255, 122, 0, 0.1)'
                }}
              />
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all ${
                  isRecording 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'text-[#B3B3B3] hover:text-[#FF7A00] hover:bg-[#FF7A00]/10'
                }`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="px-6 py-3 bg-[#FF7A00] text-white rounded-xl font-medium hover:bg-[#FF8A1A] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center min-w-[60px]"
              style={{
                boxShadow: '0 2px 10px rgba(255, 122, 0, 0.2)'
              }}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AICoach;
