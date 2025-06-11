import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, Flame, Droplets, Brain } from 'lucide-react';

interface MacroResult {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  advice: string;
}

const MacroCalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintain');
  const [result, setResult] = useState<MacroResult | null>(null);

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  const goalAdjustments = {
    lose: -500,
    maintain: 0,
    gain: 500
  };

  const calculateMacros = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (w > 0 && h > 0 && a > 0) {
      // Calculate BMR using Mifflin-St Jeor Equation
      let bmr = 0;
      if (gender === 'male') {
        bmr = 10 * w + 6.25 * h - 5 * a + 5;
      } else {
        bmr = 10 * w + 6.25 * h - 5 * a - 161;
      }

      // Calculate TDEE
      const tdee = bmr * activityMultipliers[activityLevel as keyof typeof activityMultipliers];
      
      // Adjust calories based on goal
      const adjustedCalories = tdee + goalAdjustments[goal as keyof typeof goalAdjustments];
      
      // Calculate macros based on goal
      let protein, carbs, fat;
      let advice = '';

      switch (goal) {
        case 'lose':
          protein = w * 2.2; // Higher protein for muscle preservation
          fat = adjustedCalories * 0.25 / 9; // 25% of calories from fat
          carbs = (adjustedCalories - (protein * 4) - (fat * 9)) / 4;
          advice = 'Focus on high protein intake to preserve muscle mass while in a caloric deficit.';
          break;
        case 'maintain':
          protein = w * 1.8;
          fat = adjustedCalories * 0.3 / 9; // 30% of calories from fat
          carbs = (adjustedCalories - (protein * 4) - (fat * 9)) / 4;
          advice = 'Balanced macro distribution for maintenance. Adjust based on performance and energy levels.';
          break;
        case 'gain':
          protein = w * 2.0;
          fat = adjustedCalories * 0.25 / 9; // 25% of calories from fat
          carbs = (adjustedCalories - (protein * 4) - (fat * 9)) / 4;
          advice = 'Higher carb intake to support muscle growth and recovery. Ensure adequate protein for muscle synthesis.';
          break;
        default:
          protein = w * 1.8;
          fat = adjustedCalories * 0.3 / 9;
          carbs = (adjustedCalories - (protein * 4) - (fat * 9)) / 4;
          advice = 'Balanced macro distribution. Adjust based on your goals and progress.';
      }

      setResult({
        calories: Math.round(adjustedCalories),
        protein: Math.round(protein),
        carbs: Math.round(carbs),
        fat: Math.round(fat),
        advice
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[#B3B3B3] text-sm mb-2">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="orange-input w-full"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-[#B3B3B3] text-sm mb-2">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="25"
            className="orange-input w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[#B3B3B3] text-sm mb-2">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="70"
            className="orange-input w-full"
          />
        </div>
        <div>
          <label className="block text-[#B3B3B3] text-sm mb-2">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="170"
            className="orange-input w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-[#B3B3B3] text-sm mb-2">Activity Level</label>
        <select
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
          className="orange-input w-full"
        >
          <option value="sedentary">Sedentary (little/no exercise)</option>
          <option value="light">Light (light exercise 1-3 days/week)</option>
          <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
          <option value="active">Active (hard exercise 6-7 days/week)</option>
          <option value="veryActive">Very Active (very hard exercise, physical job)</option>
        </select>
      </div>

      <div>
        <label className="block text-[#B3B3B3] text-sm mb-2">Goal</label>
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="orange-input w-full"
        >
          <option value="lose">Lose Weight</option>
          <option value="maintain">Maintain Weight</option>
          <option value="gain">Gain Weight</option>
        </select>
      </div>

      <button onClick={calculateMacros} className="orange-button w-full">
        Calculate Macros
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-4 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-[#FF7A00]">{result.calories}</div>
              <div className="text-white text-sm">Daily Calories</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-[#1E1E1E] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-4 h-4 text-[#FF7A00]" />
                <span className="text-[#B3B3B3] text-sm">Protein</span>
              </div>
              <div className="text-xl font-bold text-white">{result.protein}g</div>
              <div className="text-[#B3B3B3] text-xs mt-1">
                {Math.round((result.protein * 4 / result.calories) * 100)}% of calories
              </div>
            </div>

            <div className="p-4 bg-[#1E1E1E] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-[#FF7A00]" />
                <span className="text-[#B3B3B3] text-sm">Carbs</span>
              </div>
              <div className="text-xl font-bold text-white">{result.carbs}g</div>
              <div className="text-[#B3B3B3] text-xs mt-1">
                {Math.round((result.carbs * 4 / result.calories) * 100)}% of calories
              </div>
            </div>

            <div className="p-4 bg-[#1E1E1E] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-4 h-4 text-[#FF7A00]" />
                <span className="text-[#B3B3B3] text-sm">Fat</span>
              </div>
              <div className="text-xl font-bold text-white">{result.fat}g</div>
              <div className="text-[#B3B3B3] text-xs mt-1">
                {Math.round((result.fat * 9 / result.calories) * 100)}% of calories
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#1E1E1E] rounded-lg">
            <div className="flex items-start gap-2">
              <Brain className="w-4 h-4 text-[#FF7A00] mt-1" />
              <p className="text-[#B3B3B3] text-sm">{result.advice}</p>
            </div>
          </div>

          <div className="p-4 bg-[#1E1E1E] rounded-lg">
            <h4 className="text-white font-medium mb-2">Macro Distribution Guide</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#B3B3B3]">Protein:</span>
                <span className="text-white">1.6-2.2g per kg body weight</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#B3B3B3]">Carbs:</span>
                <span className="text-white">45-65% of total calories</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#B3B3B3]">Fat:</span>
                <span className="text-white">20-35% of total calories</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MacroCalculator; 