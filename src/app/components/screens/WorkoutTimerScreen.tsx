import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { X, Play, Pause, SkipForward } from 'lucide-react';
import { useWorkout } from '../../../contexts/WorkoutContext';
import { useWorkoutTimer } from '../../../hooks/useWorkoutTimer';
import movementsData from '../../../data/movements.json';
import { Movement } from '../../../types';
import { motion } from 'motion/react';

export function WorkoutTimerScreen() {
  const navigate = useNavigate();
  const { currentWorkout, setCompletedWorkout } = useWorkout();
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  // Redirect if no workout selected
  useEffect(() => {
    if (!currentWorkout) {
      navigate('/');
    }
  }, [currentWorkout, navigate]);

  if (!currentWorkout) {
    return null;
  }

  const { phase, currentMoveIndex, currentRound, secondsRemaining, elapsedSeconds, isPaused, togglePause, skip } = useWorkoutTimer(currentWorkout);
  const movements = movementsData as Movement[];

  // Request wake lock
  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          const lock = await (navigator as any).wakeLock.request('screen');
          setWakeLock(lock);
        }
      } catch (err) {
        console.log('Wake lock not supported or failed');
      }
    };

    requestWakeLock();

    return () => {
      if (wakeLock) {
        wakeLock.release();
      }
    };
  }, []);

  useEffect(() => {
    if (phase === 'done') {
      setCompletedWorkout({ workout: currentWorkout });
      if (wakeLock) {
        wakeLock.release();
      }
      navigate('/complete');
    }
  }, [phase, currentWorkout, setCompletedWorkout, navigate, wakeLock]);

  const currentMove = currentWorkout.moves[currentMoveIndex];
  const currentMovement = movements.find(m => m.id === currentMove.movementId);
  const nextMoveIndex = currentMoveIndex + 1 < currentWorkout.moves.length ? currentMoveIndex + 1 : 0;
  const nextMovement = movements.find(m => m.id === currentWorkout.moves[nextMoveIndex].movementId);

  const totalMoves = currentWorkout.moves.length * currentWorkout.rounds;
  const completedMoves = (currentRound - 1) * currentWorkout.moves.length + currentMoveIndex;
  const progress = (completedMoves / totalMoves) * 100;

  // Calculate total workout time
  const totalWorkoutTime = currentWorkout.moves.reduce((total, move) => {
    return total + move.workSeconds + move.restSeconds;
  }, 0) * currentWorkout.rounds;
  const totalMinutes = Math.floor(totalWorkoutTime / 60);
  const totalSeconds = totalWorkoutTime % 60;

  const handleClose = () => {
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    if (wakeLock) {
      wakeLock.release();
    }
    navigate('/browse');
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'ready':
      case 'work':
        return 'text-teal-600 border-teal-500';
      case 'rest':
        return 'text-amber-600 border-amber-500';
      default:
        return 'text-gray-600 border-gray-500';
    }
  };

  const getRingColor = () => {
    if (phase === 'rest') return '#F59E0B';
    return '#14B8A6';
  };

  const circumference = 2 * Math.PI * 140;
  const maxSeconds = phase === 'ready' ? 3 : phase === 'work' ? currentMove.workSeconds : currentMove.restSeconds;
  const offset = circumference - (secondsRemaining / maxSeconds) * circumference;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-amber-500/30 rounded-full blur-3xl pointer-events-none"></div>
      
      {/* Focus Overlay - Pushes the background back */}
      <div className="absolute inset-0 bg-gray-900/60 pointer-events-none"></div>

      {/* Header */}
      <div className="bg-gray-900/60 backdrop-blur-md px-4 py-3 sticky top-0 z-30 border-b border-gray-700/50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="w-9 h-9 shrink-0 -ml-1"></div>
          <div className="text-center flex-1 mx-2 truncate">
            <div className="text-xl md:text-2xl font-black text-white truncate drop-shadow-lg">
              {currentWorkout.name}
            </div>
            <div className="text-sm text-teal-50/90 leading-snug">
              {Math.floor(elapsedSeconds / 60).toString().padStart(2, '0')}:{(elapsedSeconds % 60).toString().padStart(2, '0')} / {totalMinutes.toString().padStart(2, '0')}:{totalSeconds.toString().padStart(2, '0')}
            </div>
          </div>
          <div className="w-9 h-9 shrink-0 -mr-1"></div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-4 relative z-10">
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-teal-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Movement Chips */}
      <div className="px-6 mb-4 flex flex-wrap gap-2 justify-center relative z-10">
        {currentWorkout.moves.map((move, index) => {
          const movement = movements.find(m => m.id === move.movementId);
          const isCompleted = index < currentMoveIndex || (currentRound > 1 && index <= currentMoveIndex);
          const isActive = index === currentMoveIndex;
          return (
            <div
              key={index}
              className={`
                px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap
                ${isActive ? 'bg-teal-500 text-white' : isCompleted ? 'bg-gray-700 text-gray-400' : 'bg-gray-800 text-gray-300'}
              `}
            >
              {movement?.name}
            </div>
          );
        })}
      </div>

      {/* Main Timer Area */}
      <div className="flex-1 flex flex-col items-center pt-4 px-6 relative z-10 pb-10">
        {/* Phase Indicator */}
        <div className={`px-4 py-2 rounded-full border-2 mb-4 ${getPhaseColor()} font-bold text-sm uppercase`}>
          {phase === 'ready' ? 'Get Ready' : phase === 'work' ? 'Work' : 'Rest'}
        </div>

        {/* Current Movement */}
        <h2 className="text-2xl font-bold text-center mb-2">
          {currentMovement?.name || 'Loading...'}
        </h2>

        {/* Next Movement */}
        {phase !== 'ready' && (
          <p className="text-gray-400 text-sm mb-2">
            Next: {nextMovement?.name}
          </p>
        )}

        {/* Ring Timer */}
        <div className="relative mb-2">
          <svg width="320" height="320" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="160"
              cy="160"
              r="140"
              fill="none"
              stroke="#374151"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle
              cx="160"
              cy="160"
              r="140"
              fill="none"
              stroke={getRingColor()}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-100"
            />
          </svg>
          {/* Countdown number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              key={secondsRemaining}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-7xl font-bold"
            >
              {secondsRemaining}
            </motion.span>
          </div>
        </div>

        {/* Round Counter and Progress Bars */}
        <div className="text-center">
          <div className="text-lg text-white mb-3">
            Round {currentRound} of {currentWorkout.rounds}
          </div>
          {/* Round Progress Bars */}
          <div className="flex gap-2 justify-center">
            {Array.from({ length: currentWorkout.rounds }).map((_, index) => (
              <div
                key={index}
                className={`
                  h-1 w-8 rounded-full transition-all
                  ${index < currentRound ? 'bg-teal-500' : 'bg-gray-600'}
                `}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-auto">
          <button
            onClick={handleClose}
            className="p-4 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={togglePause}
            className="p-6 bg-teal-500 hover:bg-teal-600 rounded-full transition-colors"
          >
            {isPaused ? <Play className="w-8 h-8" fill="white" /> : <Pause className="w-8 h-8" fill="white" />}
          </button>

          <button
            onClick={skip}
            className="p-4 hover:bg-gray-800 rounded-full transition-colors"
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Exit Confirmation Dialog */}
      {showExitDialog && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-2xl p-6 max-w-sm w-full"
          >
            <h3 className="text-xl font-bold mb-2">Exit workout?</h3>
            <p className="text-gray-300 mb-6">
              You'll lose your progress if you exit now.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitDialog(false)}
                className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold"
              >
                Keep going
              </button>
              <button
                onClick={confirmExit}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
              >
                Exit
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
