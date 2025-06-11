import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Clock, Sunrise, Sunset, Brain, Coffee, Activity, Bed } from 'lucide-react';

interface SleepResult {
  recommendedBedtime: string;
  recommendedWakeTime: string;
  sleepCycles: number;
  totalSleepTime: string;
  advice: string;
  sleepTips: string[];
}

const SleepOptimizer: React.FC = () => {
  const [wakeTime, setWakeTime] = useState('');
  const [bedTime, setBedTime] = useState('');
  const [sleepQuality, setSleepQuality] = useState('average');
  const [energyLevel, setEnergyLevel] = useState('moderate');
  const [result, setResult] = useState<SleepResult | null>(null);

  const calculateSleepSchedule = () => {
    if (wakeTime && bedTime) {
      const wake = new Date(`2000-01-01T${wakeTime}`);
      const bed = new Date(`2000-01-01T${bedTime}`);
      
      // Adjust bed time if it's before wake time (next day)
      if (bed < wake) {
        bed.setDate(bed.getDate() + 1);
      }

      // Calculate total sleep time in minutes
      const sleepTimeMinutes = (bed.getTime() - wake.getTime()) / (1000 * 60);
      const sleepCycles = Math.round(sleepTimeMinutes / 90); // Each sleep cycle is ~90 minutes

      // Calculate recommended bed time (6 sleep cycles before wake time)
      const recommendedBed = new Date(wake);
      recommendedBed.setHours(recommendedBed.getHours() - 9); // 6 cycles * 1.5 hours = 9 hours

      // Calculate recommended wake time (6 sleep cycles after bed time)
      const recommendedWake = new Date(bed);
      recommendedWake.setHours(recommendedWake.getHours() + 9);

      // Generate advice based on sleep quality and energy level
      let advice = '';
      let sleepTips: string[] = [];

      if (sleepQuality === 'poor') {
        advice = 'Your current sleep schedule may be affecting your sleep quality. Consider adjusting your bedtime to align with your natural sleep cycles.';
        sleepTips = [
          'Avoid screens 1 hour before bed',
          'Keep your bedroom cool and dark',
          'Establish a consistent sleep schedule',
          'Limit caffeine after 2 PM'
        ];
      } else if (sleepQuality === 'average') {
        advice = 'Your sleep schedule is decent, but there\'s room for improvement. Try to maintain consistent sleep and wake times.';
        sleepTips = [
          'Create a relaxing bedtime routine',
          'Exercise regularly, but not close to bedtime',
          'Avoid large meals before sleep',
          'Consider using white noise if needed'
        ];
      } else {
        advice = 'Your sleep schedule is good! Maintain your current routine and focus on sleep hygiene practices.';
        sleepTips = [
          'Keep your sleep environment comfortable',
          'Stay active during the day',
          'Manage stress through relaxation techniques',
          'Maintain a consistent sleep schedule'
        ];
      }

      // Add energy level specific tips
      if (energyLevel === 'low') {
        sleepTips.push('Consider a short nap (20-30 minutes) in the early afternoon');
        sleepTips.push('Increase exposure to natural light during the day');
      } else if (energyLevel === 'high') {
        sleepTips.push('Ensure you\'re getting enough physical activity during the day');
        sleepTips.push('Practice relaxation techniques before bed');
      }

      setResult({
        recommendedBedtime: recommendedBed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedWakeTime: recommendedWake.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sleepCycles,
        totalSleepTime: `${Math.floor(sleepTimeMinutes / 60)}h ${Math.round(sleepTimeMinutes % 60)}m`,
        advice,
        sleepTips
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[#B3B3B3] text-sm mb-2">Current Wake Time</label>
          <input
            type="time"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            className="orange-input w-full"
          />
        </div>
        <div>
          <label className="block text-[#B3B3B3] text-sm mb-2">Current Bed Time</label>
          <input
            type="time"
            value={bedTime}
            onChange={(e) => setBedTime(e.target.value)}
            className="orange-input w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-[#B3B3B3] text-sm mb-2">Sleep Quality</label>
        <select
          value={sleepQuality}
          onChange={(e) => setSleepQuality(e.target.value)}
          className="orange-input w-full"
        >
          <option value="poor">Poor (frequent waking, difficulty falling asleep)</option>
          <option value="average">Average (occasional disturbances)</option>
          <option value="good">Good (restful, uninterrupted sleep)</option>
        </select>
      </div>

      <div>
        <label className="block text-[#B3B3B3] text-sm mb-2">Energy Level During Day</label>
        <select
          value={energyLevel}
          onChange={(e) => setEnergyLevel(e.target.value)}
          className="orange-input w-full"
        >
          <option value="low">Low (frequent fatigue)</option>
          <option value="moderate">Moderate (consistent energy)</option>
          <option value="high">High (excess energy, difficulty winding down)</option>
        </select>
      </div>

      <button onClick={calculateSleepSchedule} className="orange-button w-full">
        Optimize Sleep Schedule
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Moon className="w-4 h-4 text-[#FF7A00]" />
                <span className="text-[#B3B3B3] text-sm">Recommended Bedtime</span>
              </div>
              <div className="text-xl font-bold text-white">{result.recommendedBedtime}</div>
            </div>

            <div className="p-4 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sunrise className="w-4 h-4 text-[#FF7A00]" />
                <span className="text-[#B3B3B3] text-sm">Recommended Wake Time</span>
              </div>
              <div className="text-xl font-bold text-white">{result.recommendedWakeTime}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#1E1E1E] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#FF7A00]" />
                <span className="text-[#B3B3B3] text-sm">Total Sleep Time</span>
              </div>
              <div className="text-xl font-bold text-white">{result.totalSleepTime}</div>
            </div>

            <div className="p-4 bg-[#1E1E1E] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bed className="w-4 h-4 text-[#FF7A00]" />
                <span className="text-[#B3B3B3] text-sm">Sleep Cycles</span>
              </div>
              <div className="text-xl font-bold text-white">{result.sleepCycles}</div>
            </div>
          </div>

          <div className="p-4 bg-[#1E1E1E] rounded-lg">
            <div className="flex items-start gap-2">
              <Brain className="w-4 h-4 text-[#FF7A00] mt-1" />
              <p className="text-[#B3B3B3] text-sm">{result.advice}</p>
            </div>
          </div>

          <div className="p-4 bg-[#1E1E1E] rounded-lg">
            <h4 className="text-white font-medium mb-2">Sleep Optimization Tips</h4>
            <div className="space-y-2 text-sm">
              {result.sleepTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Coffee className="w-4 h-4 text-[#FF7A00] mt-1" />
                  <span className="text-[#B3B3B3]">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-[#1E1E1E] rounded-lg">
            <h4 className="text-white font-medium mb-2">Sleep Cycle Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Activity className="w-4 h-4 text-[#FF7A00] mt-1" />
                <span className="text-[#B3B3B3]">Each sleep cycle lasts approximately 90 minutes</span>
              </div>
              <div className="flex items-start gap-2">
                <Brain className="w-4 h-4 text-[#FF7A00] mt-1" />
                <span className="text-[#B3B3B3]">Most adults need 5-6 complete sleep cycles per night</span>
              </div>
              <div className="flex items-start gap-2">
                <Sunset className="w-4 h-4 text-[#FF7A00] mt-1" />
                <span className="text-[#B3B3B3]">Try to wake up at the end of a sleep cycle for better energy</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SleepOptimizer; 