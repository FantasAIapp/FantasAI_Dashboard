
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface BMRResult {
  bmr: number;
  tdee: number;
  goal: string;
}

const BMRCalculator: React.FC = () => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('1.2');
  const [goal, setGoal] = useState('maintain');
  const [result, setResult] = useState<BMRResult | null>(null);

  const calculateBMR = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const activityLevel = parseFloat(activity);

    if (w > 0 && h > 0 && a > 0) {
      let bmr = 0;
      
      if (gender === 'male') {
        bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
      } else {
        bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
      }

      const tdee = bmr * activityLevel;
      
      setResult({
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        goal: goal
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
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
      </div>

      <div>
        <label className="block text-[#B3B3B3] text-sm mb-2">Activity Level</label>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="orange-input w-full"
        >
          <option value="1.2">Sedentary (little/no exercise)</option>
          <option value="1.375">Light (light exercise 1-3 days/week)</option>
          <option value="1.55">Moderate (moderate exercise 3-5 days/week)</option>
          <option value="1.725">Active (hard exercise 6-7 days/week)</option>
          <option value="1.9">Very Active (very hard exercise, physical job)</option>
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

      <button onClick={calculateBMR} className="orange-button w-full">
        Calculate BMR & TDEE
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-4 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FF7A00]">{result.bmr}</div>
              <div className="text-white text-sm">BMR (Calories/day)</div>
            </div>
          </div>
          <div className="p-4 bg-[#FFB347]/10 border border-[#FFB347]/30 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#FFB347]">{result.tdee}</div>
              <div className="text-white text-sm">TDEE (Total Daily Energy)</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BMRCalculator;
