import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Activity, Clock } from 'lucide-react';
import { startOfWeek, addDays, isSameDay, isWithinInterval, endOfWeek, format } from 'date-fns';
import { StickFigure } from '../illustrations/StickFigure';
import workoutsData from '../../../data/workouts.json';

export function StreakScreen() {
  const [history, setHistory] = useState<any[]>([]);
  const [dancePose, setDancePose] = useState<any>('standing');

  useEffect(() => {
    const rawHistory = localStorage.getItem('workout-history');
    if (rawHistory) {
      setHistory(JSON.parse(rawHistory));
    }

    // Dance sequence
    const poses = [
      'standing',
      'jumping-jack-open',
      'standing',
      'jumping-jack-open',
      'standing',
      'squat-bottom',
      'burpee-jump',
      'squat-bottom'
    ];
    let step = 0;
    const interval = setInterval(() => {
      step = (step + 1) % poses.length;
      setDancePose(poses[step]);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  // Compute week dates
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const date = addDays(weekStart, i);
    const completedSessions = history.filter(session => isSameDay(new Date(session.completedAt), date));
    return {
      date,
      isToday: isSameDay(date, today),
      isCompleted: completedSessions.length > 0,
    };
  });

  // Compute stats for current week
  const weeklySessions = history.filter(session => {
    const date = new Date(session.completedAt);
    return date >= weekStart && date <= weekEnd;
  });

  const totalWorkouts = weeklySessions.length;
  const totalMinutes = weeklySessions.reduce((acc, session) => {
    const workoutInfo = workoutsData.find(w => w.id === session.workoutId);
    return acc + (workoutInfo?.duration || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pb-20 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-amber-500/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-all"></div>
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-amber-500/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 transition-all"></div>
      <div className="absolute top-1/2 left-1/2 w-[200px] h-[200px] sm:w-[400px] sm:h-[400px] bg-purple-500/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 transition-all"></div>
      <div className="absolute top-1/4 left-1/4 w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] bg-amber-500/30 rounded-full blur-3xl transition-all"></div>

      <div className="max-w-3xl mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-lg">
              Streak
            </h1>
            <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 mt-1" />
          </div>
          <p className="text-lg font-semibold text-amber-500">
            Track your consistency and build momentum. Keep the flame alive! 🔥
          </p>
        </motion.div>

        {/* 7-Day View */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-3xl p-6 shadow-xl mb-8"
        >
          <div className="flex justify-between items-center relative">
            {weekDays.map((day, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <p className={`text-xs font-bold mb-3 ${day.isToday ? 'text-amber-400' : 'text-gray-500'}`}>
                  {format(day.date, 'EE')}
                </p>
                <motion.div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg
                    transition-all duration-300
                    ${day.isCompleted 
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.5)]' 
                      : 'bg-gray-900 border-2 border-gray-700 text-gray-600'}
                    ${day.isToday && !day.isCompleted ? 'ring-2 ring-amber-500/50 ring-offset-2 ring-offset-gray-950' : ''}
                  `}
                >
                  {day.isCompleted ? '✓' : ''}
                </motion.div>
                {day.isToday && (
                  <div className="absolute -bottom-5 text-[10px] font-black tracking-widest text-amber-500 uppercase">
                    Today
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-3xl p-6 shadow-xl text-center"
          >
            <Activity className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-4xl font-black text-white">{totalWorkouts}</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Sessions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-3xl p-6 shadow-xl text-center"
          >
            <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-4xl font-black text-white">{totalMinutes}</p>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Minutes</p>
          </motion.div>
        </div>

        {/* Celebrating Stick Figure */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative h-48 flex items-center justify-center -mt-4"
        >
          <div className="scale-[0.85] transform translate-y-12 relative z-10 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
            <StickFigure
              pose={dancePose}
              highlightedMuscles={['quads', 'core', 'shoulders']}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}