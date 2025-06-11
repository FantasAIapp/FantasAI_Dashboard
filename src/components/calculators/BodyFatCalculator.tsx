import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Scale, Ruler, Activity } from 'lucide-react';

interface BodyFatResult {
  bodyFat: number;
  category: string;
  advice: string;
}

const BodyFatCalculator: React.FC = () => {
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [result, setResult] = useState<BodyFatResult | null>(null);

  const calculateBodyFat = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const n = parseFloat(neck);
    const wst = parseFloat(waist);
    const hip = parseFloat(hip);

    if (h > 0 && w > 0 && n > 0 && wst > 0 && (gender === 'female' ? hip > 0 : true)) {
      let bodyFat = 0;
      let category = '';
      let advice = '';

      if (gender === 'male') {
        // US Navy method for men
        bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(wst - n) + 0.15456 * Math.log10(h)) - 450;
      } else {
        // US Navy method for women
        bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(wst + hip - n) + 0.22100 * Math.log10(h)) - 450;
      }

      // Determine category and advice
      if (gender === 'male') {
        if (bodyFat < 6) {
          category = 'Essential Fat';
          advice = 'Your body fat is at essential levels. Consider increasing body fat slightly for optimal health.';
        } else if (bodyFat < 14) {
          category = 'Athletic';
          advice = 'Excellent body composition! Maintain your current fitness routine.';
        } else if (bodyFat < 18) {
          category = 'Fitness';
          advice = 'Good body composition. Consider strength training to maintain muscle mass.';
        } else if (bodyFat < 25) {
          category = 'Average';
          advice = 'Healthy body fat percentage. Focus on balanced nutrition and regular exercise.';
        } else {
          category = 'High';
          advice = 'Consider consulting a healthcare provider for a personalized fitness and nutrition plan.';
        }
      } else {
        if (bodyFat < 14) {
          category = 'Essential Fat';
          advice = 'Your body fat is at essential levels. Consider increasing body fat slightly for optimal health.';
        } else if (bodyFat < 21) {
          category = 'Athletic';
          advice = 'Excellent body composition! Maintain your current fitness routine.';
        } else if (bodyFat < 25) {
          category = 'Fitness';
          advice = 'Good body composition. Consider strength training to maintain muscle mass.';
        } else if (bodyFat < 32) {
          category = 'Average';
          advice = 'Healthy body fat percentage. Focus on balanced nutrition and regular exercise.';
        } else {
          category = 'High';
          advice = 'Consider consulting a healthcare provider for a personalized fitness and nutrition plan.';
        }
      }

      setResult({
        bodyFat: parseFloat(bodyFat.toFixed(1)),
        category,
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
          <label className="block text-[#B3B3B3] text-sm mb-2">Neck Circumference (cm)</label>
          <input
            type="number"
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
            placeholder="35"
            className="orange-input w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[#B3B3B3] text-sm mb-2">Waist Circumference (cm)</label>
          <input
            type="number"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            placeholder="80"
            className="orange-input w-full"
          />
        </div>
        {gender === 'female' && (
          <div>
            <label className="block text-[#B3B3B3] text-sm mb-2">Hip Circumference (cm)</label>
            <input
              type="number"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              placeholder="90"
              className="orange-input w-full"
            />
          </div>
        )}
      </div>

      <button onClick={calculateBodyFat} className="orange-button w-full">
        Calculate Body Fat
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-4 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-[#FF7A00]">{result.bodyFat}%</div>
              <div className="text-white font-medium">{result.category}</div>
            </div>
            <div className="flex items-center gap-2 text-[#B3B3B3] text-sm">
              <Activity className="w-4 h-4 text-[#FF7A00]" />
              <p>{result.advice}</p>
            </div>
          </div>

          <div className="p-4 bg-[#1E1E1E] rounded-lg">
            <h4 className="text-white font-medium mb-2">Body Fat Categories</h4>
            <div className="space-y-2 text-sm">
              {gender === 'male' ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-[#B3B3B3]">Essential Fat:</span>
                    <span className="text-white">2-6%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B3B3B3]">Athletic:</span>
                    <span className="text-white">6-14%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B3B3B3]">Fitness:</span>
                    <span className="text-white">14-18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B3B3B3]">Average:</span>
                    <span className="text-white">18-25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B3B3B3]">High:</span>
                    <span className="text-white">25%+</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-[#B3B3B3]">Essential Fat:</span>
                    <span className="text-white">10-14%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B3B3B3]">Athletic:</span>
                    <span className="text-white">14-21%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B3B3B3]">Fitness:</span>
                    <span className="text-white">21-25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B3B3B3]">Average:</span>
                    <span className="text-white">25-32%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#B3B3B3]">High:</span>
                    <span className="text-white">32%+</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BodyFatCalculator; 