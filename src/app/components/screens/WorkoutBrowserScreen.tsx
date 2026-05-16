import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Equipment, FocusArea, Intensity, Workout } from '../../../types';
import workoutsData from '../../../data/workouts.json';
import { Button } from '../ui/button';
import { ArrowLeft, X, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useSavedWorkouts } from '../../../contexts/SavedWorkoutsContext';

export function WorkoutBrowserScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    time?: number;
    equipment?: Equipment[];
    focus?: FocusArea[];
    intensity?: Intensity | null;
  } | null;
  const { isWorkoutSaved } = useSavedWorkouts();

  const [selectedTime, setSelectedTime] = useState<number | null>(state?.time || null);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>(state?.equipment || []);
  const [selectedFocus, setSelectedFocus] = useState<FocusArea[]>(state?.focus || []);
  const [selectedIntensity, setSelectedIntensity] = useState<Intensity | null>(state?.intensity || null);

  const workouts = workoutsData as Workout[];

  const filteredWorkouts = workouts.filter((workout) => {
    if (selectedTime && workout.duration !== selectedTime) return false;

    if (selectedEquipment.length > 0) {
      const required = workout.equipment.filter(e => e !== 'Nothing');
      const userHas = selectedEquipment.filter(e => e !== 'Nothing');
      if (required.some(e => !userHas.includes(e))) return false;
    }

    if (selectedFocus.length > 0 && !selectedFocus.some(f => workout.focus.includes(f))) {
      return false;
    }

    if (selectedIntensity && workout.intensity !== selectedIntensity) return false;

    return true;
  });

  const clearFilters = () => {
    setSelectedTime(null);
    setSelectedEquipment([]);
    setSelectedFocus([]);
    setSelectedIntensity(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-amber-500/30 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="bg-gray-900/60 backdrop-blur-md px-4 py-3 sticky top-0 z-30 shadow-lg border-b border-gray-700/50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-xl transition-colors shrink-0 -ml-1">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-xl md:text-2xl font-black text-white drop-shadow-lg">Browse Workouts</h1>
          </div>
          {/* We leave the right side empty since it's a top-level flush-left screen, 
              but using justify-between allows us to easily add a right-aligned action later (like a Filter icon) */}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 relative z-10">
        {/* Filters */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-xl border border-gray-700">
          {/* Time Filter */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-lg">⏱️</span> Time
            </label>
            <div className="flex flex-wrap gap-2">
              {[10, 15, 20, 30].map((time) => (
                <motion.button
                  key={time}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTime(selectedTime === time ? null : time)}
                  className={`
                    px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md
                    ${selectedTime === time
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600'
                    }
                  `}
                >
                  {time} min
                </motion.button>
              ))}
            </div>
          </div>

          {/* Equipment Filter */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-lg">🏋️</span> Equipment
            </label>
            <div className="flex flex-wrap gap-2">
              {(['Nothing', 'Chair', 'Stairs', 'Dumbbells'] as Equipment[]).map((equipment) => (
                <motion.button
                  key={equipment}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (selectedEquipment.includes(equipment)) {
                      setSelectedEquipment(selectedEquipment.filter(e => e !== equipment));
                    } else {
                      setSelectedEquipment([...selectedEquipment, equipment]);
                    }
                  }}
                  className={`
                    px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md
                    ${selectedEquipment.includes(equipment)
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600'
                    }
                  `}
                >
                  {equipment}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Focus Filter */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-lg">🎯</span> Focus area
            </label>
            <div className="flex flex-wrap gap-2">
              {(['Full body', 'Upper body', 'Lower body', 'Cardio', 'Core'] as FocusArea[]).map((focus) => (
                <motion.button
                  key={focus}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (selectedFocus.includes(focus)) {
                      setSelectedFocus(selectedFocus.filter(f => f !== focus));
                    } else {
                      setSelectedFocus([...selectedFocus, focus]);
                    }
                  }}
                  className={`
                    px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md
                    ${selectedFocus.includes(focus)
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600'
                    }
                  `}
                >
                  {focus}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Intensity Filter */}
          <div>
            <label className="block text-sm font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-lg">🔥</span> Intensity
            </label>
            <div className="flex flex-wrap gap-2">
              {(['Easy', 'Moderate', 'Hard'] as Intensity[]).map((intensity) => (
                <motion.button
                  key={intensity}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedIntensity(selectedIntensity === intensity ? null : intensity)}
                  className={`
                    px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md
                    ${selectedIntensity === intensity
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg'
                      : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 border border-gray-600'
                    }
                  `}
                >
                  {intensity}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="mt-4 text-sm text-teal-400 hover:text-teal-300 font-bold flex items-center gap-1 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear all filters
          </button>
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="h-1 flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
            <p className="text-lg font-black text-white">
              {filteredWorkouts.length} {filteredWorkouts.length === 1 ? 'Workout' : 'Workouts'} Found
            </p>
            <div className="h-1 flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
          </div>
        </div>

        {/* Workout Cards */}
        {filteredWorkouts.length === 0 ? (
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-12 text-center shadow-xl border border-gray-700">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-300 font-semibold">No workouts match these filters. Try adjusting your selection.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 pb-24">
            {filteredWorkouts.map((workout, index) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate(`/workout/${workout.id}`, {
                  state: {
                    from: 'browse',
                    filters: {
                      time: selectedTime,
                      equipment: selectedEquipment,
                      focus: selectedFocus,
                      intensity: selectedIntensity
                    }
                  }
                })}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-gray-700 hover:border-teal-500/50 relative overflow-hidden group"
              >
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform"></div>

                {/* Heart icon if saved */}
                {isWorkoutSaved(workout.id) && (
                  <div className="absolute top-4 right-4 z-20">
                    <Heart className="w-5 h-5 text-teal-400 fill-teal-400" />
                  </div>
                )}

                <div className="relative z-10">
                  <h3 className="font-black text-xl text-white mb-2 pr-8">{workout.name}</h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{workout.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-md">
                      ⏱️ {workout.duration} min
                    </span>
                    <span className={`px-3 py-1.5 text-xs font-bold rounded-full shadow-md ${
                      workout.intensity === 'Easy' ? 'bg-green-100 text-green-700' :
                      workout.intensity === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      🔥 {workout.intensity}
                    </span>
                    {workout.equipment.filter(e => e !== 'Nothing').length > 0 && (
                      <span className="px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-full shadow-md">
                        🏋️ {workout.equipment.filter(e => e !== 'Nothing').join(', ')}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
