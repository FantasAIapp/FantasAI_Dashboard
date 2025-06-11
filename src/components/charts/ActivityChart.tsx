
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { day: 'Mon', calories: 2100, steps: 8500, water: 6 },
  { day: 'Tue', calories: 1890, steps: 12000, water: 8 },
  { day: 'Wed', calories: 2200, steps: 9500, water: 7 },
  { day: 'Thu', calories: 1950, steps: 11000, water: 8 },
  { day: 'Fri', calories: 2050, steps: 8800, water: 6 },
  { day: 'Sat', calories: 1800, steps: 15000, water: 9 },
  { day: 'Sun', calories: 1600, steps: 6000, water: 5 }
];

const ActivityChart: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg font-bold text-white mb-4">Weekly Activity Overview</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="day" stroke="#B3B3B3" />
            <YAxis stroke="#B3B3B3" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1E1E1E', 
                border: '1px solid #FF7A00',
                borderRadius: '8px',
                color: '#F5F5F5'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="calories" 
              stroke="#FF7A00" 
              strokeWidth={3}
              dot={{ fill: '#FF7A00', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="steps" 
              stroke="#FFB347" 
              strokeWidth={2}
              dot={{ fill: '#FFB347', strokeWidth: 2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;
