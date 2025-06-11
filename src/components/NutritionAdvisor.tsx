import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Plus, 
  Brain, 
  Target, 
  Utensils, 
  Apple, 
  Coffee, 
  Zap, 
  Sparkles,
  TrendingUp,
  Droplets,
  Flame,
  Activity,
  ChevronRight,
  Clock,
  Heart,
  Share2,
  MessageCircle,
  BarChart3,
  ChefHat,
  Salad,
  Scale,
  Dumbbell
} from 'lucide-react';

const NutritionAdvisor = () => {
  const [selectedGoal, setSelectedGoal] = useState('weight-loss');
  const [mealPlan, setMealPlan] = useState<any>(null);
  const [foodQuery, setFoodQuery] = useState('');
  const [foodResponse, setFoodResponse] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [aiInsights, setAiInsights] = useState([
    {
      type: 'achievement',
      message: 'You\'re 85% on track with your protein goals!',
      icon: TrendingUp,
      color: 'from-[#FF7A00] to-[#FFB347]'
    },
    {
      type: 'suggestion',
      message: 'Consider adding more leafy greens to boost micronutrients',
      icon: Salad,
      color: 'from-green-500 to-emerald-500'
    },
    {
      type: 'alert',
      message: 'Time to hydrate! You\'re 2 glasses behind today',
      icon: Droplets,
      color: 'from-blue-500 to-cyan-500'
    }
  ]);

  const [loggedFoods, setLoggedFoods] = useState([
    { 
      name: 'Grilled Chicken Breast', 
      calories: 185, 
      time: '12:30 PM', 
      macros: { protein: 35, carbs: 0, fat: 4 },
      image: '🍗'
    },
    { 
      name: 'Brown Rice Bowl', 
      calories: 220, 
      time: '12:30 PM', 
      macros: { protein: 5, carbs: 45, fat: 2 },
      image: '🍚'
    },
    { 
      name: 'Greek Yogurt with Berries', 
      calories: 130, 
      time: '3:15 PM', 
      macros: { protein: 15, carbs: 18, fat: 2 },
      image: '🫐'
    }
  ]);

  const goals = {
    'weight-loss': { name: 'Weight Loss', color: 'from-red-500 to-orange-500', icon: '🔥', calories: 1800 },
    'muscle-gain': { name: 'Muscle Gain', color: 'from-blue-500 to-purple-500', icon: '💪', calories: 2500 },
    'maintenance': { name: 'Maintenance', color: 'from-green-500 to-teal-500', icon: '⚖️', calories: 2200 }
  };

  const featuredRecipes = [
    {
      name: 'Protein Power Smoothie',
      image: '🥤',
      calories: 320,
      time: '5 min',
      ingredients: ['Protein powder', 'Banana', 'Spinach', 'Almond milk'],
      macros: { protein: 25, carbs: 35, fat: 8 }
    },
    {
      name: 'Quinoa Buddha Bowl',
      image: '🥗',
      calories: 450,
      time: '15 min',
      ingredients: ['Quinoa', 'Chickpeas', 'Avocado', 'Mixed greens'],
      macros: { protein: 18, carbs: 55, fat: 16 }
    },
    {
      name: 'Salmon & Sweet Potato',
      image: '🐟',
      calories: 520,
      time: '25 min',
      ingredients: ['Salmon fillet', 'Sweet potato', 'Broccoli', 'Olive oil'],
      macros: { protein: 35, carbs: 40, fat: 22 }
    }
  ];

  const nutritionStats = {
    calories: {
      current: 1840,
      goal: 2200,
      trend: '+5%'
    },
    macros: {
      protein: { current: 120, goal: 150, unit: 'g' },
      carbs: { current: 180, goal: 220, unit: 'g' },
      fat: { current: 65, goal: 75, unit: 'g' }
    },
    water: {
      current: 6,
      goal: 8,
      unit: 'glasses'
    },
    meals: {
      current: 3,
      goal: 5,
      unit: 'meals'
    }
  };

  const generateAiMealPlan = () => {
    const plans = {
      'weight-loss': {
        breakfast: { 
          name: 'Protein Smoothie Bowl', 
          calories: 280, 
          macros: 'P: 25g | C: 30g | F: 8g',
          image: '🥤',
          description: 'Berry protein smoothie with granola topping',
          aiTip: 'High protein breakfast helps control hunger throughout the day'
        },
        lunch: { 
          name: 'Grilled Chicken Salad', 
          calories: 320, 
          macros: 'P: 35g | C: 15g | F: 12g',
          image: '🥗',
          description: 'Mixed greens with grilled chicken and vinaigrette',
          aiTip: 'Perfect balance of protein and fiber for sustained energy'
        },
        dinner: { 
          name: 'Baked Salmon & Vegetables', 
          calories: 380, 
          macros: 'P: 40g | C: 20g | F: 15g',
          image: '🐟',
          description: 'Herb-crusted salmon with roasted vegetables',
          aiTip: 'Omega-3 rich meal to support recovery and metabolism'
        },
        snack: { 
          name: 'Greek Yogurt & Berries', 
          calories: 150, 
          macros: 'P: 15g | C: 18g | F: 2g',
          image: '🫐',
          description: 'Low-fat Greek yogurt with fresh berries',
          aiTip: 'Casein protein helps maintain muscle during sleep'
        }
      },
      // ... other plans ...
    };
    
    setMealPlan(plans[selectedGoal as keyof typeof plans] || plans['weight-loss']);
  };

  const askAiAboutFood = () => {
    const responses = [
      {
        message: `${foodQuery} has excellent protein content and fits your ${goals[selectedGoal].name.toLowerCase()} goals!`,
        analysis: 'High in protein, moderate carbs, low fat',
        recommendation: 'Great choice for muscle building',
        icon: TrendingUp
      },
      {
        message: `${foodQuery} is a perfect choice! High in nutrients and aligns with your macro targets.`,
        analysis: 'Balanced macros, rich in micronutrients',
        recommendation: 'Consider pairing with complex carbs',
        icon: Target
      },
      {
        message: `${foodQuery} is okay in moderation. While it has some benefits, try balancing with more vegetables.`,
        analysis: 'Moderate calories, could use more fiber',
        recommendation: 'Add leafy greens for better nutrition',
        icon: Salad
      }
    ];
    
    setFoodResponse(responses[Math.floor(Math.random() * responses.length)]);
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
              <Apple className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AI Nutrition Advisor</h1>
              <p className="text-white/70">Smart meal planning and nutrition guidance</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#FF7A00]">{nutritionStats.calories.current}</div>
            <div className="text-[#B3B3B3] text-sm">Calories Today</div>
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
        {['overview', 'meal-plan', 'tracker', 'recipes'].map((tab) => (
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
            {tab === 'overview' && <BarChart3 className="w-4 h-4 inline mr-2" />}
            {tab === 'meal-plan' && <ChefHat className="w-4 h-4 inline mr-2" />}
            {tab === 'tracker' && <Activity className="w-4 h-4 inline mr-2" />}
            {tab === 'recipes' && <Salad className="w-4 h-4 inline mr-2" />}
            {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </motion.button>
        ))}
      </div>

      {/* Content Sections */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Daily Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-4 border-l-4 border-l-[#FF7A00]"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-[#B3B3B3] text-sm">Calories</p>
                  <p className="text-xl font-bold text-white">{nutritionStats.calories.current}</p>
                </div>
                <Flame className="w-6 h-6 text-[#FF7A00]" />
              </div>
              <div className="w-full bg-[#1E1E1E] rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#FF7A00] to-[#FFB347] h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(nutritionStats.calories.current / nutritionStats.calories.goal) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[#B3B3B3] text-xs mt-1">
                <span>Goal: {nutritionStats.calories.goal}</span>
                <span className="text-[#FF7A00]">{nutritionStats.calories.trend}</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-4 border-l-4 border-l-blue-500"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-[#B3B3B3] text-sm">Protein</p>
                  <p className="text-xl font-bold text-white">
                    {nutritionStats.macros.protein.current}g
                  </p>
                </div>
                <Dumbbell className="w-6 h-6 text-blue-500" />
              </div>
              <div className="w-full bg-[#1E1E1E] rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(nutritionStats.macros.protein.current / nutritionStats.macros.protein.goal) * 100}%` }}
                />
              </div>
              <p className="text-blue-400 text-xs mt-1">Goal: {nutritionStats.macros.protein.goal}g</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-4 border-l-4 border-l-green-500"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-[#B3B3B3] text-sm">Water</p>
                  <p className="text-xl font-bold text-white">
                    {nutritionStats.water.current}/{nutritionStats.water.goal}
                  </p>
                </div>
                <Droplets className="w-6 h-6 text-green-500" />
              </div>
              <div className="w-full bg-[#1E1E1E] rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(nutritionStats.water.current / nutritionStats.water.goal) * 100}%` }}
                />
              </div>
              <p className="text-green-400 text-xs mt-1">{nutritionStats.water.goal - nutritionStats.water.current} more to go</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-4 border-l-4 border-l-purple-500"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-[#B3B3B3] text-sm">Meals</p>
                  <p className="text-xl font-bold text-white">
                    {nutritionStats.meals.current}/{nutritionStats.meals.goal}
                  </p>
                </div>
                <Utensils className="w-6 h-6 text-purple-500" />
              </div>
              <div className="w-full bg-[#1E1E1E] rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(nutritionStats.meals.current / nutritionStats.meals.goal) * 100}%` }}
                />
              </div>
              <p className="text-purple-400 text-xs mt-1">On track</p>
            </motion.div>
          </div>

          {/* AI Food Assistant */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 border border-[#FF7A00]/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Brain className="w-6 h-6 text-[#FF7A00]" />
              AI Nutrition Assistant
            </h2>
            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={foodQuery}
                  onChange={(e) => setFoodQuery(e.target.value)}
                  placeholder="Ask about any food... (e.g., pizza, quinoa salad, protein bar)"
                  className="orange-input pr-12"
                />
                <Camera className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#B3B3B3] hover:text-[#FF7A00] cursor-pointer" />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={askAiAboutFood}
                className="orange-button px-6 flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                Ask AI
              </motion.button>
            </div>
            
            {foodResponse && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <foodResponse.icon className="w-5 h-5 text-[#FF7A00]" />
                      <p className="text-white font-medium">{foodResponse.message}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="p-3 bg-[#1E1E1E] rounded-lg">
                        <p className="text-[#B3B3B3] text-sm mb-1">Analysis</p>
                        <p className="text-white text-sm">{foodResponse.analysis}</p>
                      </div>
                      <div className="p-3 bg-[#1E1E1E] rounded-lg">
                        <p className="text-[#B3B3B3] text-sm mb-1">Recommendation</p>
                        <p className="text-white text-sm">{foodResponse.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}

      {activeTab === 'meal-plan' && (
        <div className="space-y-6">
          {/* Goal Selection */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 border border-[#FF7A00]/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Target className="w-6 h-6 text-[#FF7A00]" />
              Select Your Nutrition Goal
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {Object.entries(goals).map(([key, goal]) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedGoal(key)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedGoal === key 
                      ? 'border-[#FF7A00]/50 bg-[#FF7A00]/20' 
                      : 'border-white/20 bg-white/5 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-4xl mb-3">{goal.icon}</div>
                  <div className={`text-xl font-bold mb-2 text-transparent bg-gradient-to-r ${goal.color} bg-clip-text`}>
                    {goal.name}
                  </div>
                  <div className="text-[#B3B3B3] text-sm">{goal.calories} cal/day</div>
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generateAiMealPlan}
              className="orange-button w-full py-3 flex items-center justify-center gap-2"
            >
              <Brain className="w-5 h-5" />
              Generate AI Meal Plan
            </motion.button>
          </motion.div>

          {/* Generated Meal Plan */}
          {mealPlan && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-6 border border-[#FF7A00]/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <ChefHat className="w-6 h-6 text-[#FF7A00]" />
                  Today's AI-Generated Meal Plan
                </h2>
                <button className="orange-button flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Plan
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(mealPlan).map(([meal, details]: [string, any]) => (
                  <motion.div 
                    key={meal}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-4 border border-[#FF7A00]/20 hover:border-[#FF7A00]/40 transition-all"
                  >
                    <div className="text-center mb-3">
                      <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-r from-[#FF7A00] to-[#FFB347] rounded-lg flex items-center justify-center text-3xl">
                        {details.image}
                      </div>
                      <h3 className="text-white font-bold capitalize text-lg">{meal}</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="text-white font-medium">{details.name}</div>
                      <div className="text-[#FF7A00] font-bold">{details.calories} cal</div>
                      <div className="text-[#B3B3B3] text-sm">{details.macros}</div>
                      <div className="text-white/70 text-xs">{details.description}</div>
                      <div className="mt-3 p-2 bg-[#1E1E1E] rounded-lg">
                        <div className="flex items-center gap-2 text-[#FF7A00] text-xs">
                          <Brain className="w-3 h-3" />
                          AI Tip
                        </div>
                        <p className="text-white/70 text-xs mt-1">{details.aiTip}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {activeTab === 'tracker' && (
        <div className="space-y-6">
          {/* Food Logger */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 border border-[#FF7A00]/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Activity className="w-6 h-6 text-[#FF7A00]" />
                Food Logger
              </h2>
              <button className="orange-button flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Food
              </button>
            </div>
            <div className="space-y-4">
              {loggedFoods.map((food, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 glass-card border border-[#FF7A00]/20 hover:border-[#FF7A00]/40 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#FF7A00] to-[#FFB347] rounded-lg flex items-center justify-center text-2xl">
                      {food.image}
                    </div>
                    <div>
                      <div className="text-white font-medium">{food.name}</div>
                      <div className="text-[#B3B3B3] text-sm">{food.time}</div>
                      <div className="text-[#FF7A00] text-xs">
                        P: {food.macros.protein}g | C: {food.macros.carbs}g | F: {food.macros.fat}g
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#FF7A00] font-bold text-lg">{food.calories}</div>
                    <div className="text-[#B3B3B3] text-sm">cal</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {activeTab === 'recipes' && (
        <div className="space-y-6">
          {/* Featured Recipes */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 border border-[#FF7A00]/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Salad className="w-6 h-6 text-[#FF7A00]" />
                Featured Recipes
              </h2>
              <button className="orange-button flex items-center gap-2">
                <ChefHat className="w-4 h-4" />
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredRecipes.map((recipe, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-4 border border-[#FF7A00]/20 hover:border-[#FF7A00]/40 transition-all cursor-pointer"
                >
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-r from-[#FF7A00] to-[#FFB347] rounded-lg flex items-center justify-center text-4xl">
                      {recipe.image}
                    </div>
                    <h3 className="text-white font-bold">{recipe.name}</h3>
                    <div className="flex justify-center gap-4 mt-2 text-sm text-[#B3B3B3]">
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4 text-[#FF7A00]" />
                        {recipe.calories} cal
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#FF7A00]" />
                        {recipe.time}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#B3B3B3]">Protein:</span>
                      <span className="text-white">{recipe.macros.protein}g</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#B3B3B3]">Carbs:</span>
                      <span className="text-white">{recipe.macros.carbs}g</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#B3B3B3]">Fat:</span>
                      <span className="text-white">{recipe.macros.fat}g</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <button className="orange-button py-2 px-4 text-sm flex items-center gap-2">
                      <ChefHat className="w-4 h-4" />
                      View Recipe
                    </button>
                    <button className="text-white/70 hover:text-[#FF7A00] transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default NutritionAdvisor;
