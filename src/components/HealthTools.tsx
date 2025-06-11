import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Activity, Heart, Brain, Droplets, Moon, Timer, Sparkles, TrendingUp, Target, Zap, Info } from 'lucide-react';
import BMICalculator from './calculators/BMICalculator';
import BMRCalculator from './calculators/BMRCalculator';
import HeartRateCalculator from './calculators/HeartRateCalculator';
import BodyFatCalculator from './calculators/BodyFatCalculator';
import MacroCalculator from './calculators/MacroCalculator';
import HydrationCalculator from './calculators/HydrationCalculator';
import SleepOptimizer from './calculators/SleepOptimizer';
import FitnessAgeCalculator from './calculators/FitnessAgeCalculator';

const HealthTools: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showAiInsights, setShowAiInsights] = useState(false);

  const aiInsights = [
    {
      title: "Personalized Recommendations",
      description: "AI analyzes your metrics to provide customized health and fitness advice",
      icon: Sparkles,
      color: "#FF7A00"
    },
    {
      title: "Progress Tracking",
      description: "Track your improvements over time with AI-powered insights",
      icon: TrendingUp,
      color: "#FF7A00"
    },
    {
      title: "Smart Goal Setting",
      description: "AI helps set realistic and achievable goals based on your profile",
      icon: Target,
      color: "#FF7A00"
    }
  ];

  const tools = [
    {
      id: 'bmi',
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index and understand your weight category',
      icon: Calculator,
      color: '#FF7A00',
      component: BMICalculator,
      aiFeatures: [
        'Personalized weight management recommendations',
        'Trend analysis of BMI changes over time',
        'Customized exercise and nutrition plans'
      ],
      tips: [
        'BMI is a starting point for health assessment',
        'Consider body composition for a complete picture',
        'Regular monitoring helps track progress'
      ]
    },
    {
      id: 'bmr',
      title: 'BMR & TDEE Calculator',
      description: 'Calculate your Basal Metabolic Rate and Total Daily Energy Expenditure',
      icon: Activity,
      color: '#FF7A00',
      component: BMRCalculator,
      aiFeatures: [
        'Adaptive calorie recommendations based on activity',
        'Smart meal planning suggestions',
        'Energy balance optimization'
      ],
      tips: [
        'BMR changes with body composition',
        'Activity level significantly affects TDEE',
        'Regular updates ensure accuracy'
      ]
    },
    {
      id: 'heart-rate',
      title: 'Heart Rate Zones',
      description: 'Calculate your target heart rate zones for optimal training',
      icon: Heart,
      color: '#FF7A00',
      component: HeartRateCalculator,
      aiFeatures: [
        'Dynamic zone adjustments based on fitness level',
        'Workout intensity recommendations',
        'Recovery optimization'
      ],
      tips: [
        'Resting heart rate indicates fitness level',
        'Different zones serve different training purposes',
        'Monitor changes over time'
      ]
    },
    {
      id: 'body-fat',
      title: 'Body Fat Calculator',
      description: 'Estimate your body fat percentage using the US Navy method',
      icon: Brain,
      color: '#FF7A00',
      component: BodyFatCalculator,
      aiFeatures: [
        'Body composition trend analysis',
        'Customized fat loss strategies',
        'Progress tracking and predictions'
      ],
      tips: [
        'Measurements should be consistent',
        'Consider multiple measurement methods',
        'Track changes over time'
      ]
    },
    {
      id: 'macro',
      title: 'Macro Calculator',
      description: 'Calculate your ideal macronutrient distribution based on your goals',
      icon: Activity,
      color: '#FF7A00',
      component: MacroCalculator,
      aiFeatures: [
        'Dynamic macro adjustments based on progress',
        'Meal planning assistance',
        'Goal-specific recommendations'
      ],
      tips: [
        'Macros should align with your goals',
        'Consider activity level and lifestyle',
        'Regular adjustments may be needed'
      ]
    },
    {
      id: 'hydration',
      title: 'Hydration Calculator',
      description: 'Calculate your daily water intake needs based on various factors',
      icon: Droplets,
      color: '#FF7A00',
      component: HydrationCalculator,
      aiFeatures: [
        'Smart hydration reminders',
        'Activity-based adjustments',
        'Climate and environment considerations'
      ],
      tips: [
        'Hydration needs vary by activity',
        'Consider climate and environment',
        'Monitor urine color for hydration status'
      ]
    },
    {
      id: 'sleep',
      title: 'Sleep Optimizer',
      description: 'Optimize your sleep schedule and get personalized recommendations',
      icon: Moon,
      color: '#FF7A00',
      component: SleepOptimizer,
      aiFeatures: [
        'Sleep quality analysis',
        'Smart bedtime recommendations',
        'Sleep cycle optimization'
      ],
      tips: [
        'Consistent sleep schedule is key',
        'Quality matters as much as quantity',
        'Consider sleep environment'
      ]
    },
    {
      id: 'fitness-age',
      title: 'Fitness Age Calculator',
      description: 'Calculate your biological age based on fitness metrics and lifestyle',
      icon: Timer,
      color: '#FF7A00',
      component: FitnessAgeCalculator,
      aiFeatures: [
        'Comprehensive fitness assessment',
        'Lifestyle impact analysis',
        'Improvement recommendations'
      ],
      tips: [
        'Multiple factors affect fitness age',
        'Regular exercise can improve score',
        'Lifestyle choices matter'
      ]
    }
  ];

  const openModal = (toolId: string) => {
    setActiveModal(toolId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Health & Fitness Tools</h2>
        <button
          onClick={() => setShowAiInsights(!showAiInsights)}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg text-[#FF7A00] hover:bg-[#FF7A00]/20 transition-colors"
        >
          <Sparkles className="w-5 h-5" />
          <span>AI Insights</span>
        </button>
      </div>

      {showAiInsights && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {aiInsights.map((insight, index) => (
            <div
              key={index}
              className="bg-[#1E1E1E] rounded-lg p-4 border border-[#FF7A00]/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${insight.color}20` }}>
                  <insight.icon className="w-6 h-6" style={{ color: insight.color }} />
                </div>
                <h3 className="text-white font-medium">{insight.title}</h3>
              </div>
              <p className="text-[#B3B3B3] text-sm">{insight.description}</p>
            </div>
          ))}
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <motion.div
            key={tool.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#1E1E1E] rounded-lg p-4 cursor-pointer border border-[#FF7A00]/10 hover:border-[#FF7A00]/30 transition-colors"
            onClick={() => openModal(tool.id)}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${tool.color}20` }}>
                <tool.icon className="w-6 h-6" style={{ color: tool.color }} />
              </div>
              <h3 className="text-white font-medium">{tool.title}</h3>
            </div>
            <p className="text-[#B3B3B3] text-sm mb-3">{tool.description}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#FF7A00] text-sm">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2 text-[#B3B3B3] text-sm">
                <Info className="w-4 h-4" />
                <span>{tool.tips[0]}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-[#1E1E1E] rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {tools.find(t => t.id === activeModal)?.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Sparkles className="w-4 h-4 text-[#FF7A00]" />
                  <span className="text-[#FF7A00] text-sm">AI-Powered Calculator</span>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-[#B3B3B3] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <h4 className="text-white font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#FF7A00]" />
                  AI Features
                </h4>
                <ul className="space-y-1">
                  {tools.find(t => t.id === activeModal)?.aiFeatures.map((feature, index) => (
                    <li key={index} className="text-[#B3B3B3] text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-1.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-medium flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#FF7A00]" />
                  Pro Tips
                </h4>
                <ul className="space-y-1">
                  {tools.find(t => t.id === activeModal)?.tips.map((tip, index) => (
                    <li key={index} className="text-[#B3B3B3] text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-1.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4">
              {tools.find(t => t.id === activeModal)?.component && 
                React.createElement(tools.find(t => t.id === activeModal)!.component)}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HealthTools;
