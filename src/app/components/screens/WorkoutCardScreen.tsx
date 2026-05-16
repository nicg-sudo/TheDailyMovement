import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { ArrowLeft, Clock, Zap, Dumbbell, Heart, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useWorkout } from '../../../contexts/WorkoutContext';
import { useSavedWorkouts } from '../../../contexts/SavedWorkoutsContext';
import workoutsData from '../../../data/workouts.json';
import movementsData from '../../../data/movements.json';
import { Workout, Movement, Equipment, FocusArea, Intensity } from '../../../types';
import { motion } from 'motion/react';

export function WorkoutCardScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { setCurrentWorkout } = useWorkout();
  const { isWorkoutSaved, toggleSaveWorkout } = useSavedWorkouts();
  const state = location.state as {
    from?: string;
    filters?: {
      time?: number | null;
      equipment?: Equipment[];
      focus?: FocusArea[];
      intensity?: Intensity | null;
    };
  } | null;

  const workouts = workoutsData as Workout[];
  const movements = movementsData as Movement[];
  const workout = workouts.find(w => w.id === id);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!workout) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Workout not found</p>
      </div>
    );
  }

  const handleStartWorkout = () => {
    setCurrentWorkout(workout);
    navigate('/timer');
  };

  const handlePreviewMovements = () => {
    const firstMoveId = workout.moves[0].movementId;
    navigate(`/movement/${firstMoveId}`, {
      state: {
        fromWorkout: workout.id,
        preview: true,
        filters: state?.filters,
        from: state?.from
      }
    });
  };

  const handleBack = () => {
    if (state?.from === 'vault') {
      navigate('/vault');
    } else {
      // Pass filters back to browse screen to restore state
      navigate('/browse', {
        state: state?.filters || {}
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative">
      {/* Decorative background elements - same as landing page */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-amber-500/30 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="bg-gray-900/60 backdrop-blur-md text-white px-4 py-3 sticky top-0 z-30 border-b border-gray-700/50">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-2">
            <button onClick={handleBack} className="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-xl transition-colors shrink-0 -ml-1">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-2xl font-black drop-shadow-lg text-center flex-1 mx-2 truncate"
            >
              {workout.name}
            </motion.h1>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleSaveWorkout(workout.id)}
              className="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-xl transition-colors shrink-0 -mr-1"
            >
              {isWorkoutSaved(workout.id) ? (
                <Heart className="w-5 h-5 text-teal-400 fill-teal-400" />
              ) : (
                <Heart className="w-5 h-5 text-white/30" strokeWidth={1.5} />
              )}
            </motion.button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <p className="text-teal-50/90 text-sm mb-3 text-center line-clamp-2 leading-snug px-2">
              {workout.description}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full shadow-sm">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold">{workout.duration} min</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full shadow-sm">
                <Zap className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold">{workout.intensity}</span>
              </div>
              {workout.equipment.filter(e => e !== 'Nothing').length > 0 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full shadow-sm">
                  <Dumbbell className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-bold">
                    {workout.equipment.filter(e => e !== 'Nothing').join(', ')}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-6 space-y-6 relative z-10">
        {/* Movements */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700">
          <h2 className="text-xl font-black text-white mb-2 flex items-center gap-2">
            <span className="text-2xl">💪</span>
            Movements
          </h2>
          <p className="text-sm text-gray-400 mb-5 font-semibold">
            {workout.moves.length} exercises · {workout.rounds} rounds
          </p>
          <div className="grid grid-cols-2 gap-3">
            {workout.moves.map((move, index) => {
              const movement = movements.find(m => m.id === move.movementId);
              return (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate(`/movement/${move.movementId}`, {
                    state: {
                      fromWorkout: workout.id,
                      filters: state?.filters,
                      from: state?.from
                    }
                  })}
                  className="p-4 bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-teal-500/50 rounded-xl hover:border-teal-400 hover:shadow-xl shadow-md transition-all text-left flex items-center justify-between cursor-pointer"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-sm mb-1">
                      {movement?.name || move.movementId}
                    </h3>
                    <p className="text-xs text-teal-400 font-semibold">
                      {move.workSeconds}s · {move.restSeconds}s rest
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-teal-400 flex-shrink-0 ml-2" />
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Why Your Body Will Thank You */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700">
          <h2 className="text-xl font-black text-white mb-5 flex items-center gap-2">
            <span className="text-2xl">✨</span>
            Your Body Thanks You
          </h2>
          <div className="space-y-4">
            {workout.payoffs.map((payoff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-700/50 rounded-xl shadow-md border border-teal-500/30"
              >
                <h3 className="font-bold text-teal-400 text-sm mb-2">{payoff.muscleGroup}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{payoff.realLifePayoff}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Before You Begin */}
        <div className="bg-gradient-to-br from-purple-950/40 to-indigo-950/40 border-2 border-purple-700/30 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
          <h2 className="text-lg font-black text-purple-200 mb-4 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Before You Begin
          </h2>
          <ul className="space-y-3">
            {workout.beforeYouBegin.map((item, index) => (
              <li key={index} className="text-sm text-purple-200 flex items-start gap-3 font-medium">
                <span className="text-purple-300 text-lg font-bold leading-none">•</span>
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pb-24">
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleStartWorkout}
              className="w-full h-16 text-xl font-black rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
              style={{
                background: 'linear-gradient(135deg, #14B8A6 0%, #10B981 100%)',
                color: 'white'
              }}
            >
              🚀 Start Workout Now
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handlePreviewMovements}
              variant="outline"
              className="w-full h-14 text-base font-bold rounded-2xl border-2 border-teal-500 text-teal-400 bg-transparent hover:bg-transparent hover:text-teal-400 transition-all"
            >
              👀 Preview All Movements First
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
