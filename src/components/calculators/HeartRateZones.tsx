
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface HRZone {
  name: string;
  min: number;
  max: number;
  purpose: string;
  color: string;
}

const HeartRateZones: React.FC = () => {
  const [age, setAge] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [zones, setZones] = useState<HRZone[]>([]);

  const calculateZones = () => {
    const ageNum = parseFloat(age);
    const restingNum = parseFloat(restingHR);
    
    if (ageNum > 0 && restingNum > 0) {
      const maxHR = 220 - ageNum;
      const hrReserve = maxHR - restingNum;

      const zoneData: HRZone[] = [
        {
          name: 'Recovery Zone',
          min: Math.round(restingNum + (hrReserve * 0.5)),
          max: Math.round(restingNum + (hrReserve * 0.6)),
          purpose: 'Active recovery and warm-up',
          color: '#10B981'
        },
        {
          name: 'Fat Burn Zone',
          min: Math.round(restingNum + (hrReserve * 0.6)),
          max: Math.round(restingNum + (hrReserve * 0.7)),
          purpose: 'Fat burning and endurance',
          color: '#F59E0B'
        },
        {
          name: 'Cardio Zone',
          min: Math.round(restingNum + (hrReserve * 0.7)),
          max: Math.round(restingNum + (hrReserve * 0.8)),
          purpose: 'Cardiovascular fitness',
          color: '#FF7A00'
        },
        {
          name: 'Threshold Zone',
          min: Math.round(restingNum + (hrReserve * 0.8)),
          max: Math.round(restingNum + (hrReserve * 0.9)),
          purpose: 'Lactate threshold training',
          color: '#EF4444'
        },
        {
          name: 'Max Zone',
          min: Math.round(restingNum + (hrReserve * 0.9)),
          max: maxHR,
          purpose: 'Maximum effort training',
          color: '#DC2626'
        }
      ];

      setZones(zoneData);
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
          <label className="block text-[#B3B3B3] text-sm mb-2">Resting HR (bpm)</label>
          <input
            type="number"
            value={restingHR}
            onChange={(e) => setRestingHR(e.target.value)}
            placeholder="60"
            className="orange-input w-full"
          />
        </div>
      </div>

      <button onClick={calculateZones} className="orange-button w-full">
        Calculate Heart Rate Zones
      </button>

      {zones.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {zones.map((zone, index) => (
            <motion.div
              key={zone.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white/5 border border-white/10 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: zone.color }}
                  />
                  <h3 className="text-white font-medium">{zone.name}</h3>
                </div>
                <div className="text-[#FF7A00] font-bold">
                  {zone.min}-{zone.max} bpm
                </div>
              </div>
              <p className="text-[#B3B3B3] text-sm">{zone.purpose}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default HeartRateZones;
