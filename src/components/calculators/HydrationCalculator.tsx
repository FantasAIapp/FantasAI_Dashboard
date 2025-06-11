import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Activity, Thermometer, Clock, Info } from 'lucide-react';

interface HydrationResult {
  baseWater: number;
  activityAdjustment: number;
  climateAdjustment: number;
  totalWater: number;
  advice: string;
}

const HydrationCalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [climate, setClimate] = useState('temperate');
  const [exerciseDuration, setExerciseDuration] = useState('');
  const [result, setResult] = useState<HydrationResult | null>(null);

  const activityMultipliers = {
    sedentary: 0.3,
    light: 0.4,
    moderate: 0.5,
    active: 0.6,
    veryActive: 0.7
  };

  const climateMultipliers = {
    cold: 0.9,
    temperate: 1,
    hot: 1.2,
    veryHot: 1.4
  };

  const calculateHydration = () => {
    const w = parseFloat(weight);
    const exercise = parseFloat(exerciseDuration) || 0;

    if (w > 0) {
      // Base water calculation (ml per kg of body weight)
      const baseWater = w * 30;

      // Activity adjustment
      const activityAdjustment = baseWater * activityMultipliers[activityLevel as keyof typeof activityMultipliers];

      // Climate adjustment
      const climateAdjustment = baseWater * (climateMultipliers[climate as keyof typeof climateMultipliers] - 1);

      // Exercise adjustment (additional 500ml per hour of exercise)
      const exerciseAdjustment = exercise * 500;

      // Total water needed
      const totalWater = Math.round(baseWater + activityAdjustment + climateAdjustment + exerciseAdjustment);

      // Generate advice based on results
      let advice = '';
      if (totalWater < 2000) {
        advice = 'Your water needs are relatively low. Focus on maintaining consistent hydration throughout the day.';
      } else if (totalWater < 3000) {
        advice = 'Moderate water needs. Consider carrying a water bottle and setting reminders to drink regularly.';
      } else {
        advice = 'High water needs. Use a large water bottle and consider electrolyte supplements during intense activity.';
      }

      setResult({
        baseWater: Math.round(baseWater),
        activityAdjustment: Math.round(activityAdjustment),
        climateAdjustment: Math.round(climateAdjustment),
        totalWater,
        advice
      });
    }
  };

  return (
    <div className="space-y-6">
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
        <label className="block text-[#B3B3B3] text-sm mb-2">Climate</label>
        <select
          value={climate}
          onChange={(e) => setClimate(e.target.value)}
          className="orange-input w-full"
        >
          <option value="cold">Cold (below 10°C)</option>
          <option value="temperate">Temperate (10-25°C)</option>
          <option value="hot">Hot (25-35°C)</option>
          <option value="veryHot">Very Hot (above 35°C)</option>
        </select>
      </div>

      <div>
        <label className="block text-[#B3B3B3] text-sm mb-2">Daily Exercise Duration (hours)</label>
        <input
          type="number"
          value={exerciseDuration}
          onChange={(e) => setExerciseDuration(e.target.value)}
          placeholder="1"
          className="orange-input w-full"
        />
      </div>

      <button onClick={calculateHydration} className="orange-button w-full">
        Calculate Water Needs
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-4 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-[#FF7A00]">{result.totalWater}ml</div>
              <div className="text-white text-sm">Daily Water Intake</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#1E1E1E] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-4 h-4 text-[#FF7A00]" />
                <span className="text-[#B3B3B3] text-sm">Base Water</span>
              </div>
              <div className="text-xl font-bold text-white">{result.baseWater}ml</div>
            </div>

            <div className="p-4 bg-[#1E1E1E] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-[#FF7A00]" />
                <span className="text-[#B3B3B3] text-sm">Activity Adjustment</span>
              </div>
              <div className="text-xl font-bold text-white">+{result.activityAdjustment}ml</div>
            </div>

            <div className="p-4 bg-[#1E1E1E] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="w-4 h-4 text-[#FF7A00]" />
                <span className="text-[#B3B3B3] text-sm">Climate Adjustment</span>
              </div>
              <div className="text-xl font-bold text-white">+{result.climateAdjustment}ml</div>
            </div>

            <div className="p-4 bg-[#1E1E1E] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#FF7A00]" />
                <span className="text-[#B3B3B3] text-sm">Exercise Adjustment</span>
              </div>
              <div className="text-xl font-bold text-white">+{Math.round(parseFloat(exerciseDuration) * 500)}ml</div>
            </div>
          </div>

          <div className="p-4 bg-[#1E1E1E] rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-[#FF7A00] mt-1" />
              <p className="text-[#B3B3B3] text-sm">{result.advice}</p>
            </div>
          </div>

          <div className="p-4 bg-[#1E1E1E] rounded-lg">
            <h4 className="text-white font-medium mb-2">Hydration Tips</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Droplets className="w-4 h-4 text-[#FF7A00] mt-1" />
                <span className="text-[#B3B3B3]">Start your day with a glass of water</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#FF7A00] mt-1" />
                <span className="text-[#B3B3B3]">Drink water 30 minutes before meals</span>
              </div>
              <div className="flex items-start gap-2">
                <Activity className="w-4 h-4 text-[#FF7A00] mt-1" />
                <span className="text-[#B3B3B3]">Hydrate before, during, and after exercise</span>
              </div>
              <div className="flex items-start gap-2">
                <Thermometer className="w-4 h-4 text-[#FF7A00] mt-1" />
                <span className="text-[#B3B3B3]">Increase intake in hot weather</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HydrationCalculator; 