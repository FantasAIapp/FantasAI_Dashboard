import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Loader2, Mic, StopCircle, Pause, Play } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface MeditationTimer {
  id: string;
  duration: number;
  isActive: boolean;
  remainingTime: number;
}

const AIAgent = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI wellness coach. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [activeTimers, setActiveTimers] = useState<MeditationTimer[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Demo meditation timers
  const meditationTimers = [
    { id: '1', duration: 300, label: '5 min Quick Meditation' },
    { id: '2', duration: 600, label: '10 min Focus Session' },
    { id: '3', duration: 900, label: '15 min Deep Relaxation' },
    { id: '4', duration: 1200, label: '20 min Mindfulness' }
  ];

  // Demo responses for the AI
  const demoResponses = {
    greeting: [
      "I'm here to support your wellness journey. What would you like to focus on today?",
      "Welcome! I can help you with meditation, stress management, or general wellness advice.",
      "Hello! I'm ready to assist you with your wellness goals. How can I help?"
    ],
    meditation: [
      "I recommend starting with a 5-minute breathing exercise. Would you like me to guide you through it?",
      "For stress relief, try this 10-minute mindfulness meditation. Shall we begin?",
      "I can help you with a body scan meditation. It's great for relaxation. Would you like to try?"
    ],
    stress: [
      "Let's practice some deep breathing exercises together. Ready to start?",
      "I can guide you through a quick stress relief technique. Would you like to try?",
      "For immediate stress relief, try this 3-minute breathing exercise. Shall we begin?"
    ],
    sleep: [
      "I can help you with a sleep meditation routine. Would you like to try a 15-minute session?",
      "Let's practice some relaxation techniques to help you sleep better. Ready to start?",
      "I have a calming bedtime meditation that might help. Would you like to try it?"
    ]
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Update timers every second
    const timerInterval = setInterval(() => {
      setActiveTimers(prevTimers => 
        prevTimers.map(timer => ({
          ...timer,
          remainingTime: timer.isActive ? Math.max(0, timer.remainingTime - 1) : timer.remainingTime
        })).filter(timer => timer.remainingTime > 0 || timer.isActive)
      );
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI typing
    const typingMessage: Message = {
      id: 'typing',
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };

    setMessages(prev => [...prev, typingMessage]);

    // Simulate AI response after a delay
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
      const response = generateAIResponse(inputValue);
      const aiMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return demoResponses.greeting[Math.floor(Math.random() * demoResponses.greeting.length)];
    } else if (lowerInput.includes('meditation')) {
      return demoResponses.meditation[Math.floor(Math.random() * demoResponses.meditation.length)];
    } else if (lowerInput.includes('stress')) {
      return demoResponses.stress[Math.floor(Math.random() * demoResponses.stress.length)];
    } else if (lowerInput.includes('sleep')) {
      return demoResponses.sleep[Math.floor(Math.random() * demoResponses.sleep.length)];
    }
    return "I understand. How can I help you with your wellness journey today?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Add actual voice recording functionality here
  };

  const startTimer = (duration: number) => {
    const newTimer: MeditationTimer = {
      id: Date.now().toString(),
      duration,
      isActive: true,
      remainingTime: duration
    };
    setActiveTimers(prev => [...prev, newTimer]);
  };

  const toggleTimer = (timerId: string) => {
    setActiveTimers(prev =>
      prev.map(timer =>
        timer.id === timerId
          ? { ...timer, isActive: !timer.isActive }
          : timer
      )
    );
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#FF7A00]/20 to-[#FFB347]/20 backdrop-blur-lg rounded-2xl p-6 border border-[#FF7A00]/20 mb-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#FF7A00] flex items-center justify-center">
            <Bot className="w-8 h-8 text-black" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">AI Wellness Coach</h1>
            <p className="text-white/70">Your personal guide to better health and wellness</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Meditation Timers */}
      <div className="glass-card p-4 mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Meditation Timers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {meditationTimers.map(timer => (
            <button
              key={timer.id}
              onClick={() => startTimer(timer.duration)}
              className="p-4 bg-[#1E1E1E] rounded-lg border border-[#FF7A00]/20 hover:border-[#FF7A00] transition-colors"
            >
              <div className="text-[#FF7A00] font-semibold">{formatTime(timer.duration)}</div>
              <div className="text-[#B3B3B3] text-sm">{timer.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Timers */}
      {activeTimers.length > 0 && (
        <div className="glass-card p-4 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Active Sessions</h2>
          <div className="space-y-4">
            {activeTimers.map(timer => (
              <div
                key={timer.id}
                className="flex items-center justify-between p-4 bg-[#1E1E1E] rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleTimer(timer.id)}
                    className="w-10 h-10 rounded-full bg-[#FF7A00] flex items-center justify-center"
                  >
                    {timer.isActive ? (
                      <Pause className="w-5 h-5 text-black" />
                    ) : (
                      <Play className="w-5 h-5 text-black" />
                    )}
                  </button>
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {formatTime(timer.remainingTime)}
                    </div>
                    <div className="text-[#B3B3B3] text-sm">
                      {timer.isActive ? 'In Progress' : 'Paused'}
                    </div>
                  </div>
                </div>
                <div className="w-32 h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF7A00] transition-all duration-1000"
                    style={{
                      width: `${(timer.remainingTime / timer.duration) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 glass-card p-4 mb-6 overflow-y-auto">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex gap-4 mb-6 ${
                message.type === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'user' ? 'bg-[#FF7A00]' : 'bg-[#1E1E1E]'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-black" />
                ) : message.isTyping ? (
                  <Loader2 className="w-4 h-4 text-[#FF7A00] animate-spin" />
                ) : (
                  <Bot className="w-4 h-4 text-[#FF7A00]" />
                )}
              </div>
              <div className={`flex-1 max-w-[80%] ${
                message.type === 'user' ? 'text-right' : ''
              }`}>
                <div className={`inline-block p-4 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-[#FF7A00] text-black'
                    : 'bg-[#1E1E1E] text-white'
                }`}>
                  {message.isTyping ? (
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#FF7A00] rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-[#FF7A00] rounded-full animate-bounce delay-100" />
                      <span className="w-2 h-2 bg-[#FF7A00] rounded-full animate-bounce delay-200" />
                    </div>
                  ) : (
                    message.content
                  )}
                </div>
                <div className="text-[#B3B3B3] text-xs mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="glass-card p-4">
        <div className="flex items-end gap-4">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full p-4 pr-12 bg-[#1E1E1E] text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#FF7A00] min-h-[60px] max-h-[120px]"
              rows={1}
            />
            <button
              onClick={toggleRecording}
              className={`absolute right-4 bottom-4 p-2 rounded-full transition-colors ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-[#FF7A00] hover:bg-[#FFB347]'
              }`}
            >
              {isRecording ? (
                <StopCircle className="w-5 h-5 text-white" />
              ) : (
                <Mic className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="p-4 bg-[#FF7A00] text-black rounded-lg hover:bg-[#FFB347] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAgent; 