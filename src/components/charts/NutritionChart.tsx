
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Protein', value: 30, color: '#FF7A00' },
  { name: 'Carbs', value: 45, color: '#FFB347' },
  { name: 'Fat', value: 25, color: '#FFA726' }
];

const NutritionChart: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <h3 className="text-lg font-bold text-white mb-4">Macro Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1E1E1E', 
                border: '1px solid #FF7A00',
                borderRadius: '8px',
                color: '#F5F5F5'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[#B3B3B3] text-sm">{item.name} {item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionChart;
