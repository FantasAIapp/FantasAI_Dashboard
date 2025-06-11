
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface WorkoutSession {
  id: string;
  title: string;
  type: string;
  duration: string;
  intensity: 'Low' | 'Medium' | 'High';
  completed: boolean;
}

interface CalendarDay {
  date: number;
  workouts: WorkoutSession[];
  isToday: boolean;
  isCurrentMonth: boolean;
}

const WorkoutCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const workoutTypes = [
    { type: 'Strength', color: '#FF7A00', emoji: '💪' },
    { type: 'Cardio', color: '#FFB347', emoji: '🏃' },
    { type: 'Yoga', color: '#10B981', emoji: '🧘' },
    { type: 'Rest', color: '#6B7280', emoji: '😴' },
    { type: 'HIIT', color: '#EF4444', emoji: '⚡' }
  ];

  // Generate mock calendar data
  const generateCalendarDays = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const today = new Date();
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const workouts: WorkoutSession[] = [];
      if (Math.random() > 0.6 && date.getMonth() === currentMonth.getMonth()) {
        const randomType = workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
        workouts.push({
          id: `workout-${i}`,
          title: `${randomType.type} Session`,
          type: randomType.type,
          duration: `${30 + Math.floor(Math.random() * 60)}min`,
          intensity: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] as 'Low' | 'Medium' | 'High',
          completed: Math.random() > 0.3
        });
      }

      days.push({
        date: date.getDate(),
        workouts,
        isToday: date.toDateString() === today.toDateString(),
        isCurrentMonth: date.getMonth() === currentMonth.getMonth()
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  const navigateMonth = (direction: number) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 bg-[#FF7A00]/20 text-[#FF7A00] rounded-lg hover:bg-[#FF7A00]/30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 bg-[#FF7A00]/20 text-[#FF7A00] rounded-lg hover:bg-[#FF7A00]/30 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-[#B3B3B3] font-medium py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => (
            <motion.div
              key={index}
              className={`
                min-h-[80px] p-2 rounded-lg border cursor-pointer transition-all duration-200
                ${day.isCurrentMonth ? 'border-white/20 hover:border-[#FF7A00]/50' : 'border-transparent'}
                ${day.isToday ? 'bg-[#FF7A00]/20 border-[#FF7A00]' : 'bg-white/5'}
                ${selectedDay === day.date ? 'ring-2 ring-[#FF7A00]' : ''}
              `}
              onClick={() => setSelectedDay(day.date)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`text-sm font-medium mb-1 ${
                day.isCurrentMonth ? 'text-white' : 'text-[#B3B3B3]'
              }`}>
                {day.date}
              </div>
              
              {day.workouts.map((workout, workoutIndex) => (
                <div
                  key={workout.id}
                  className={`
                    text-xs px-2 py-1 rounded mb-1 truncate
                    ${workout.completed ? 'bg-[#FF7A00]/30 text-[#FF7A00]' : 'bg-white/10 text-[#B3B3B3]'}
                  `}
                >
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${getIntensityColor(workout.intensity)}`} />
                    {workout.type}
                  </div>
                </div>
              ))}
              
              {day.workouts.length === 0 && day.isCurrentMonth && (
                <div className="flex items-center justify-center h-full">
                  <Plus className="w-4 h-4 text-[#B3B3B3] hover:text-[#FF7A00] transition-colors" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {workoutTypes.map(type => (
          <div key={type.type} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: type.color }}
            />
            <span className="text-[#B3B3B3] text-sm">{type.emoji} {type.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutCalendar;
