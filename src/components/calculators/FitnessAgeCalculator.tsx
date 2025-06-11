import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Timer, Dumbbell, Brain, TrendingUp, TrendingDown, Info } from 'lucide-react';

interface FitnessAgeResult {
  fitnessAge: number;
  ageDifference: number;
  category: string;
  advice: string;
  improvements: string[];
}

const FitnessAgeCalculator: React.FC = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [restingHeartRate, setRestingHeartRate] = useState('');
  const [vo2Max, setVo2Max] = useState('');
  const [exerciseFrequency, setExerciseFrequency] = useState('moderate');
  const [smokingStatus, setSmokingStatus] = useState('never');
  const [result, setResult] = useState<FitnessAgeResult | null>(null);

  const calculateFitnessAge = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const rhr = parseFloat(restingHeartRate);
    const vo2 = parseFloat(vo2Max);

    if (a > 0 && w > 0 && h > 0 && rhr > 0 && vo2 > 0) {
      // Calculate BMI
      const bmi = w / ((h / 100) * (h / 100));

      // Base fitness age calculation
      let fitnessAge = a;

      // Adjust for BMI
      if (bmi < 18.5) fitnessAge += 2;
      else if (bmi >= 25 && bmi < 30) fitnessAge += 3;
      else if (bmi >= 30) fitnessAge += 5;

      // Adjust for resting heart rate
      if (rhr < 60) fitnessAge -= 2;
      else if (rhr >= 70 && rhr < 80) fitnessAge += 1;
      else if (rhr >= 80) fitnessAge += 3;

      // Adjust for VO2 max
      if (vo2 >= 50) fitnessAge -= 5;
      else if (vo2 >= 40 && vo2 < 50) fitnessAge -= 3;
      else if (vo2 >= 30 && vo2 < 40) fitnessAge += 0;
      else if (vo2 < 30) fitnessAge += 5;

      // Adjust for exercise frequency
      switch (exerciseFrequency) {
        case 'sedentary':
          fitnessAge += 5;
          break;
        case 'light':
          fitnessAge += 2;
          break;
        case 'moderate':
          fitnessAge -= 1;
          break;
        case 'active':
          fitnessAge -= 3;
          break;
        case 'veryActive':
          fitnessAge -= 5;
          break;
      }

      // Adjust for smoking status
      switch (smokingStatus) {
        case 'current':
          fitnessAge += 8;
          break;
        case 'former':
          fitnessAge += 3;
          break;
        case 'never':
          fitnessAge -= 1;
          break;
      }

      // Round to nearest year
      fitnessAge = Math.round(fitnessAge);
      const ageDifference = fitnessAge - a;

      // Determine category and generate advice
      let category = '';
      let advice = '';
      let improvements: string[] = [];

      if (ageDifference <= -5) {
        category = 'Excellent';
        advice = 'Your fitness age is significantly younger than your chronological age! Keep up the great work.';
        improvements = [
          'Maintain your current exercise routine',
          'Focus on recovery and injury prevention',
          'Consider adding variety to your workouts',
          'Share your fitness journey to inspire others'
        ];
      } else if (ageDifference <= -2) {
        category = 'Good';
        advice = 'Your fitness age is younger than your chronological age. You\'re on the right track!';
        improvements = [
          'Gradually increase exercise intensity',
          'Add strength training if not already included',
          'Focus on flexibility and mobility',
          'Maintain a balanced diet'
        ];
      } else if (ageDifference <= 2) {
        category = 'Average';
        advice = 'Your fitness age is close to your chronological age. There\'s room for improvement.';
        improvements = [
          'Increase weekly exercise frequency',
          'Add high-intensity interval training',
          'Improve sleep quality',
          'Reduce sedentary time'
        ];
      } else {
        category = 'Needs Improvement';
        advice = 'Your fitness age is higher than your chronological age. Focus on improving your fitness metrics.';
        improvements = [
          'Start with moderate exercise 3-4 times per week',
          'Gradually increase physical activity',
          'Focus on improving cardiovascular health',
          'Consider consulting a fitness professional'
        ];
      }

      // Add specific improvements based on metrics
      if (rhr >= 70) {
        improvements.push('Work on improving cardiovascular fitness to lower resting heart rate');
      }
      if (vo2 < 40) {
        improvements.push('Incorporate more cardio exercises to improve VO2 max');
      }
      if (bmi >= 25) {
        improvements.push('Focus on healthy weight management through diet and exercise');
      }

      setResult({
        fitnessAge,
        ageDifference,
        category,
        advice,
        improvements
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
            placeholder="30"
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[#B3B3B3] text-sm mb-2">Resting Heart Rate (bpm)</label>
          <input
            type="number"
            value={restingHeartRate}
            onChange={(e) => setRestingHeartRate(e.target.value)}
            placeholder="70"
            className="orange-input w-full"
          />
        </div>
        <div>
          <label className="block text-[#B3B3B3] text-sm mb-2">VO2 Max (ml/kg/min)</label>
          <input
            type="number"
            value={vo2Max}
            onChange={(e) => setVo2Max(e.target.value)}
            placeholder="35"
            className="orange-input w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-[#B3B3B3] text-sm mb-2">Exercise Frequency</label>
        <select
          value={exerciseFrequency}
          onChange={(e) => setExerciseFrequency(e.target.value)}
          className="orange-input w-full"
        >
          <option value="sedentary">Sedentary (little/no exercise)</option>
          <option value="light">Light (1-2 times/week)</option>
          <option value="moderate">Moderate (3-4 times/week)</option>
          <option value="active">Active (5-6 times/week)</option>
          <option value="veryActive">Very Active (daily exercise)</option>
        </select>
      </div>

      <div>
        <label className="block text-[#B3B3B3] text-sm mb-2">Smoking Status</label>
        <select
          value={smokingStatus}
          onChange={(e) => setSmokingStatus(e.target.value)}
          className="orange-input w-full"
        >
          <option value="never">Never Smoked</option>
          <option value="former">Former Smoker</option>
          <option value="current">Current Smoker</option>
        </select>
      </div>

      <button onClick={calculateFitnessAge} className="orange-button w-full">
        Calculate Fitness Age
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-4 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-[#FF7A00]">{result.fitnessAge}</div>
              <div className="text-white text-sm">Your Fitness Age</div>
            </div>
            <div className="flex items-center justify-center gap-2">
              {result.ageDifference < 0 ? (
                <TrendingDown className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingUp className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm ${result.ageDifference < 0 ? 'text-green-500' : 'text-red-500'}`}>
                {Math.abs(result.ageDifference)} years {result.ageDifference < 0 ? 'younger' : 'older'} than your actual age
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#1E1E1E] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-[#FF7A00]" />
              <span className="text-white font-medium">Category: {result.category}</span>
            </div>
            <div className="flex items-start gap-2 mt-2">
              <Brain className="w-4 h-4 text-[#FF7A00] mt-1" />
              <p className="text-[#B3B3B3] text-sm">{result.advice}</p>
            </div>
          </div>

          <div className="p-4 bg-[#1E1E1E] rounded-lg">
            <h4 className="text-white font-medium mb-2">Recommended Improvements</h4>
            <div className="space-y-2 text-sm">
              {result.improvements.map((improvement, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Dumbbell className="w-4 h-4 text-[#FF7A00] mt-1" />
                  <span className="text-[#B3B3B3]">{improvement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-[#1E1E1E] rounded-lg">
            <h4 className="text-white font-medium mb-2">Understanding Fitness Age</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-[#FF7A00] mt-1" />
                <span className="text-[#B3B3B3]">Fitness age is based on your physical condition and lifestyle factors</span>
              </div>
              <div className="flex items-start gap-2">
                <Timer className="w-4 h-4 text-[#FF7A00] mt-1" />
                <span className="text-[#B3B3B3]">Regular exercise can help reduce your fitness age</span>
              </div>
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-[#FF7A00] mt-1" />
                <span className="text-[#B3B3B3]">This is an estimate and should be used as a general guide</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default FitnessAgeCalculator; 