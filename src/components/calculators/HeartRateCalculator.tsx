import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, TrendingUp, Info, Timer, Zap, Flame } from 'lucide-react';

interface HeartRateZones {
  recovery: { min: number; max: number };
  aerobic: { min: number; max: number };
  endurance: { min: number; max: number };
  tempo: { min: number; max: number };
  threshold: { min: number; max: number };
  anaerobic: { min: number; max: number };
  vo2max: { min: number; max: number };
}

const HeartRateCalculator: React.FC = () => {
  const [age, setAge] = useState('');
  const [restingHeartRate, setRestingHeartRate] = useState('');
  const [gender, setGender] = useState('male');
  const [fitnessLevel, setFitnessLevel] = useState('moderate');
  const [result, setResult] = useState<HeartRateZones | null>(null);

  const calculateHeartRateZones = () => {
    const a = parseFloat(age);
    const rhr = parseFloat(restingHeartRate);

    if (a > 0 && rhr > 0) {
      // Calculate maximum heart rate using the Tanaka formula (more accurate than 220-age)
      const maxHR = Math.round(208 - (0.7 * a));
      
      // Calculate heart rate reserve (HRR)
      const hrr = maxHR - rhr;

      // Calculate zones based on HRR percentages
      const zones: HeartRateZones = {
        recovery: {
          min: Math.round(rhr + (hrr * 0.5)),
          max: Math.round(rhr + (hrr * 0.6))
        },
        aerobic: {
          min: Math.round(rhr + (hrr * 0.6)),
          max: Math.round(rhr + (hrr * 0.7))
        },
        endurance: {
          min: Math.round(rhr + (hrr * 0.7)),
          max: Math.round(rhr + (hrr * 0.8))
        },
        tempo: {
          min: Math.round(rhr + (hrr * 0.8)),
          max: Math.round(rhr + (hrr * 0.85))
        },
        threshold: {
          min: Math.round(rhr + (hrr * 0.85)),
          max: Math.round(rhr + (hrr * 0.9))
        },
        anaerobic: {
          min: Math.round(rhr + (hrr * 0.9)),
          max: Math.round(rhr + (hrr * 0.95))
        },
        vo2max: {
          min: Math.round(rhr + (hrr * 0.95)),
          max: maxHR
        }
      };

      setResult(zones);
    }
  };

  const getZoneDescription = (zone: keyof HeartRateZones) => {
    const descriptions = {
      recovery: {
        title: 'Recovery Zone',
        description: 'Light activity for recovery and warm-up',
        benefits: ['Promotes recovery', 'Improves blood flow', 'Reduces muscle soreness'],
        activities: ['Walking', 'Light cycling', 'Stretching']
      },
      aerobic: {
        title: 'Aerobic Zone',
        description: 'Moderate intensity for building aerobic base',
        benefits: ['Improves cardiovascular health', 'Builds endurance', 'Burns fat'],
        activities: ['Jogging', 'Cycling', 'Swimming']
      },
      endurance: {
        title: 'Endurance Zone',
        description: 'Moderate-high intensity for endurance training',
        benefits: ['Increases stamina', 'Improves aerobic capacity', 'Builds muscular endurance'],
        activities: ['Running', 'Cycling', 'Rowing']
      },
      tempo: {
        title: 'Tempo Zone',
        description: 'Challenging but sustainable pace',
        benefits: ['Improves lactate threshold', 'Builds race pace endurance', 'Enhances running economy'],
        activities: ['Tempo runs', 'Interval training', 'Hill repeats']
      },
      threshold: {
        title: 'Threshold Zone',
        description: 'High intensity at lactate threshold',
        benefits: ['Increases lactate threshold', 'Improves race performance', 'Builds mental toughness'],
        activities: ['Threshold intervals', 'Race pace training', 'Hill climbs']
      },
      anaerobic: {
        title: 'Anaerobic Zone',
        description: 'Very high intensity for short bursts',
        benefits: ['Improves anaerobic capacity', 'Increases power output', 'Builds speed'],
        activities: ['Sprint intervals', 'High-intensity intervals', 'Plyometrics']
      },
      vo2max: {
        title: 'VO2 Max Zone',
        description: 'Maximum intensity for short intervals',
        benefits: ['Improves VO2 max', 'Enhances cardiovascular capacity', 'Builds maximum power'],
        activities: ['Maximum effort intervals', 'Short sprints', 'High-intensity intervals']
      }
    };

    return descriptions[zone];
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
          <label className="block text-[#B3B3B3] text-sm mb-2">Resting Heart Rate (bpm)</label>
          <input
            type="number"
            value={restingHeartRate}
            onChange={(e) => setRestingHeartRate(e.target.value)}
            placeholder="70"
            className="orange-input w-full"
          />
        </div>
      </div>

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
          <label className="block text-[#B3B3B3] text-sm mb-2">Fitness Level</label>
          <select
            value={fitnessLevel}
            onChange={(e) => setFitnessLevel(e.target.value)}
            className="orange-input w-full"
          >
            <option value="beginner">Beginner</option>
            <option value="moderate">Moderate</option>
            <option value="advanced">Advanced</option>
            <option value="elite">Elite</option>
          </select>
        </div>
      </div>

      <button onClick={calculateHeartRateZones} className="orange-button w-full">
        Calculate Heart Rate Zones
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-4 bg-[#FF7A00]/10 border border-[#FF7A00]/30 rounded-lg">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-[#FF7A00]">
                {Math.round(208 - (0.7 * parseFloat(age)))} bpm
              </div>
              <div className="text-white text-sm">Maximum Heart Rate</div>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(result).map(([zone, range]) => {
              const zoneInfo = getZoneDescription(zone as keyof HeartRateZones);
              return (
                <div key={zone} className="p-4 bg-[#1E1E1E] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-[#FF7A00]" />
                    <h4 className="text-white font-medium">{zoneInfo.title}</h4>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-[#FF7A00]" />
                    <span className="text-[#B3B3B3] text-sm">{zoneInfo.description}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-[#FF7A00]" />
                    <span className="text-white font-medium">
                      {range.min} - {range.max} bpm
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-white text-sm mb-2">Benefits</h5>
                      <ul className="space-y-1">
                        {zoneInfo.benefits.map((benefit, index) => (
                          <li key={index} className="text-[#B3B3B3] text-sm flex items-start gap-2">
                            <Zap className="w-4 h-4 text-[#FF7A00] mt-1" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-white text-sm mb-2">Activities</h5>
                      <ul className="space-y-1">
                        {zoneInfo.activities.map((activity, index) => (
                          <li key={index} className="text-[#B3B3B3] text-sm flex items-start gap-2">
                            <Flame className="w-4 h-4 text-[#FF7A00] mt-1" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-[#1E1E1E] rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-[#FF7A00] mt-1" />
              <div className="text-[#B3B3B3] text-sm">
                <p className="mb-2">Heart rate zones are calculated using the Karvonen formula, which takes into account your resting heart rate for more accurate training zones.</p>
                <p>For best results, measure your resting heart rate first thing in the morning, before getting out of bed.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HeartRateCalculator; 