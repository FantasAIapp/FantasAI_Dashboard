
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';

interface BMIResult {
  bmi: number;
  category: string;
  advice: string;
}

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100; // Convert cm to meters
    const w = parseFloat(weight);
    
    if (h > 0 && w > 0) {
      const bmi = w / (h * h);
      let category = '';
      let advice = '';

      if (bmi < 18.5) {
        category = 'Underweight';
        advice = 'Consider a balanced diet with more calories and strength training.';
      } else if (bmi < 25) {
        category = 'Normal';
        advice = 'Great! Maintain your current healthy lifestyle.';
      } else if (bmi < 30) {
        category = 'Overweight';
        advice = 'Consider regular exercise and a balanced diet.';
      } else {
        category = 'Obese';
        advice = 'Consult a healthcare provider for a personalized plan.';
      }

      setResult({ bmi: parseFloat(bmi.toFixed(1)), category, advice });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
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
      </div>

      <button onClick={calculateBMI} className="orange-button w-full">
        Calculate BMI
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg"
        >
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-[#FF7A00]">{result.bmi}</div>
            <div className="text-white font-medium">{result.category}</div>
          </div>
          <p className="text-[#B3B3B3] text-sm text-center">{result.advice}</p>
        </motion.div>
      )}
    </div>
  );
};

export default BMICalculator;
