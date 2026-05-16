import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, Clock, Repeat, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { useWorkout } from '../../../contexts/WorkoutContext';
import workoutsData from '../../../data/workouts.json';
import { Workout, FeltRating } from '../../../types';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

export function PostWorkoutScreen() {
  const navigate = useNavigate();
  const { completedWorkout, setCompletedWorkout, setCurrentWorkout } = useWorkout();
  const [selectedFeeling, setSelectedFeeling] = useState<FeltRating | null>(null);
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    // Redirect if no completed workout
    if (!completedWorkout) {
      navigate('/');
      return;
    }

    // Trigger confetti on mount
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#14B8A6', '#F59E0B', '#10B981']
    });

    // Save completion immediately (prevent duplicate saving if feltRating gets updated)
    if (!completedWorkout.feltRating) {
      const history = JSON.parse(localStorage.getItem('workout-history') || '[]');
      
      // Ensure we don't save multiple times for the same completion instance
      const lastEntry = history[history.length - 1];
      const isDuplicate = lastEntry && 
                          lastEntry.workoutId === completedWorkout.workout.id && 
                          (new Date().getTime() - new Date(lastEntry.completedAt).getTime()) < 60000;

      if (!isDuplicate) {
        history.push({
          workoutId: completedWorkout.workout.id,
          completedAt: new Date().toISOString(),
        });
        localStorage.setItem('workout-history', JSON.stringify(history));
      }
    }
  }, [completedWorkout, navigate]);

  if (!completedWorkout) {
    return null;
  }

  const { workout } = completedWorkout;
  const workouts = workoutsData as Workout[];

  const handleFeelingSelect = (feeling: FeltRating) => {
    setSelectedFeeling(feeling);
    setShowResponse(true);

    // Update feeling in localStorage
    const history = JSON.parse(localStorage.getItem('workout-history') || '[]');
    const recentEntryIndex = history.map((h: any) => h.workoutId).lastIndexOf(workout.id);
    if (recentEntryIndex >= 0) {
      history[recentEntryIndex].feltRating = feeling;
      localStorage.setItem('workout-history', JSON.stringify(history));
    }

    setCompletedWorkout({ ...completedWorkout, feltRating: feeling });
  };

  const getFeelingResponse = (feeling: FeltRating) => {
    const responses = {
      'too-easy': "Great work showing up! Next time, try a higher intensity or add more rounds.",
      'just-right': "Perfect! You're building strength at exactly the right pace.",
      'tough': "You pushed through! That's where real growth happens. Well done.",
      'too-hard': "You finished, and that's what matters. Try an easier modification next time."
    };
    return responses[feeling];
  };

  const getSuggestedWorkout = (): Workout | null => {
    // Simple suggestion logic: same duration, different focus
    const sameDuration = workouts.filter(w => w.duration === workout.duration && w.id !== workout.id);
    if (sameDuration.length > 0) {
      return sameDuration[Math.floor(Math.random() * sameDuration.length)];
    }
    return workouts.find(w => w.id !== workout.id) || null;
  };

  const suggestedWorkout = getSuggestedWorkout();

  const handleDoAgain = () => {
    setCurrentWorkout(workout);
    navigate('/timer');
  };

  const handleBrowse = () => {
    navigate('/browse');
  };

  const handleStartSuggested = () => {
    if (suggestedWorkout) {
      setCurrentWorkout(suggestedWorkout);
      navigate('/timer');
    }
  };

  const totalMinutes = workout.duration;
  const totalMovements = workout.moves.length;
  const totalRounds = workout.rounds;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Decorative background elements - same as landing page */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-amber-500/30 rounded-full blur-3xl"></div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white px-6 py-8 relative overflow-hidden border-b border-gray-700 z-20">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gray-800/80 backdrop-blur-sm/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="max-w-2xl mx-auto text-center relative z-10"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CheckCircle className="w-20 h-20 mx-auto mb-4 drop-shadow-2xl" strokeWidth={3} />
          </motion.div>
          <h1 className="text-4xl font-black mb-2 drop-shadow-lg tracking-tight">You Did It!</h1>
          <p className="text-xl font-bold text-teal-100">{workout.name}</p>
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 pb-24 space-y-6 relative z-10">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-teal-100"
        >
          <div className="flex justify-around">
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <Clock className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <p className="text-4xl font-black text-white mb-1">{totalMinutes}</p>
              <p className="text-sm text-gray-400 font-semibold uppercase tracking-wide">Minutes</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                <Zap className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <p className="text-4xl font-black text-white mb-1">{totalMovements}</p>
              <p className="text-sm text-gray-400 font-semibold uppercase tracking-wide">Movements</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Repeat className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <p className="text-4xl font-black text-white mb-1">{totalRounds}</p>
              <p className="text-sm text-gray-400 font-semibold uppercase tracking-wide">Rounds</p>
            </motion.div>
          </div>
        </motion.div>

        {/* What Your Body Practiced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700"
        >
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-2">
            <span className="text-2xl">✅</span>
            What Your Body Just Practiced
          </h2>
          <div className="space-y-4">
            {workout.payoffs.map((payoff, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex gap-4 p-4 bg-gradient-to-r from-teal-900/30 to-emerald-900/30 rounded-xl border border-teal-500/30"
              >
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 mt-1.5 flex-shrink-0 shadow-md" />
                <div>
                  <p className="font-bold text-teal-300 text-base mb-1">{payoff.muscleGroup}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{payoff.realLifePayoff}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How Did That Feel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700"
        >
          <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-2">
            <span className="text-2xl">🤔</span>
            How Did That Feel?
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { id: 'too-easy' as FeltRating, label: 'Too easy', emoji: '😊' },
              { id: 'just-right' as FeltRating, label: 'Just right', emoji: '💪' },
              { id: 'tough' as FeltRating, label: 'Tough', emoji: '😅' },
              { id: 'too-hard' as FeltRating, label: 'Too hard', emoji: '😰' }
            ].map((feeling) => (
              <motion.button
                key={feeling.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFeelingSelect(feeling.id)}
                className={`
                  px-4 py-4 rounded-xl text-sm font-bold transition-all shadow-md
                  ${selectedFeeling === feeling.id
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg ring-2 ring-teal-300'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700 border border-gray-200'
                  }
                `}
              >
                <span className="text-xl mr-2">{feeling.emoji}</span>
                {feeling.label}
              </motion.button>
            ))}
          </div>
          {showResponse && selectedFeeling && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="p-5 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl border-2 border-teal-200"
            >
              <p className="text-sm text-teal-900 font-semibold leading-relaxed">{getFeelingResponse(selectedFeeling)}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Suggested Next Workout */}
        {suggestedWorkout && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-700"
          >
            <h2 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Try This Next
            </h2>
            <button onClick={() => navigate(`/workout/${suggestedWorkout.id}`)} className="w-full text-left p-5 bg-gradient-to-br from-teal-900/30 to-emerald-900/30 rounded-xl mb-4 border-2 border-teal-500/30 hover:border-teal-400/50 hover:bg-teal-900/40 transition-all cursor-pointer">
              <h3 className="font-black text-xl text-white mb-2">{suggestedWorkout.name}</h3>
              <p className="text-sm text-gray-300 mb-4 font-medium">{suggestedWorkout.description}</p>
              <div className="flex gap-2">
                <span className="px-4 py-2 bg-gray-700/50 text-gray-300 text-xs font-bold rounded-full shadow-md border border-gray-600">
                  ⏱️ {suggestedWorkout.duration} min
                </span>
                <span className="px-4 py-2 bg-gray-700/50 text-gray-300 text-xs font-bold rounded-full shadow-md border border-gray-600">
                  🔥 {suggestedWorkout.intensity}
                </span>
              </div>
            </button>
            <p className="text-sm text-gray-400 font-semibold leading-relaxed">
              💡 This workout {suggestedWorkout.duration === workout.duration ? 'keeps the same duration' : 'varies the duration'} and {suggestedWorkout.focus.some(f => !workout.focus.includes(f)) ? 'targets different muscle groups' : 'complements what you just did'}
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 pb-8"
        >
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              onClick={() => navigate('/streak')}
              className="w-full h-16 text-xl font-black rounded-2xl shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #14B8A6 0%, #10B981 100%)',
                color: 'white'
              }}
            >
              🔥 View Weekly Streak
            </Button>
          </motion.div>
          {suggestedWorkout && (
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleStartSuggested}
                variant="outline"
                className="w-full h-14 text-base font-bold rounded-2xl border-2 border-teal-500 text-teal-400 bg-transparent hover:bg-teal-500/10 hover:text-teal-400 transition-all"
              >
                ⚡ Start Suggested Workout
              </Button>
            </motion.div>
          )}
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleDoAgain}
              className="w-full h-14 text-base font-bold rounded-2xl bg-white hover:bg-white text-gray-800 hover:text-gray-800 border-2 border-white transition-all"
            >
              🔄 Do This One Again
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
