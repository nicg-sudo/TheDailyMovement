import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { ArrowLeft, AlertTriangle, Play, Pause } from 'lucide-react';
import { Button } from '../ui/button';
import { StickFigure } from '../illustrations/StickFigure';
import movementsData from '../../../data/movements.json';
import workoutsData from '../../../data/workouts.json';
import { Movement, Workout, Equipment, FocusArea, Intensity } from '../../../types';
import { motion } from 'motion/react';
import { useWorkout } from '../../../contexts/WorkoutContext';

export function MovementGuideScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as {
    fromWorkout?: string;
    preview?: boolean;
    from?: string;
    filters?: {
      time?: number | null;
      equipment?: Equipment[];
      focus?: FocusArea[];
      intensity?: Intensity | null;
    };
  } | null;
  const { setCurrentWorkout } = useWorkout();

  const [selectedPoseIndex, setSelectedPoseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Reset selected pose when movement changes
  useEffect(() => {
    setSelectedPoseIndex(0);
    setIsPlaying(true);
  }, [id]);

  useEffect(() => {
    if (!isPlaying) return;

    const intervalId = setInterval(() => {
      setSelectedPoseIndex((prevIndex) => {
        const movement = movementsData.find(m => m.id === id) as Movement | undefined;
        if (!movement || movement.poses.length <= 1) return prevIndex;
        return (prevIndex + 1) % movement.poses.length;
      });
    }, 1500);

    return () => clearInterval(intervalId);
  }, [isPlaying, id]);

  const movements = movementsData as Movement[];
  const workouts = workoutsData as Workout[];
  const movement = movements.find(m => m.id === id);
  const workout = state?.fromWorkout ? workouts.find(w => w.id === state.fromWorkout) : null;

  if (!movement) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Movement not found</p>
      </div>
    );
  }

  const getPoseType = (movementId: string, poseIndex: number): any => {
    const poseMap: Record<string, string[]> = {
      'bodyweight-squat': ['squat-top', 'squat-bottom'],
      'push-ups': ['pushup-top', 'pushup-bottom'],
      'plank': ['plank', 'plank'],
      'lunges': ['lunge-start', 'lunge-end'],
      'glute-bridge': ['glute-bridge-start', 'glute-bridge-end'],
      'jumping-jacks': ['standing', 'jumping-jack-open'],
      'high-knees': ['high-knee-start', 'high-knee-end'],
      'burpees': ['burpee-stand', 'burpee-squat', 'burpee-high-plank', 'burpee-low-plank', 'burpee-squat', 'burpee-jump'],
      'mountain-climbers': ['mountain-climber-start', 'mountain-climber-end'],
      'tricep-dips': ['tricep-dip-top', 'tricep-dip-bottom'],
      'step-ups': ['step-up-start', 'step-up'],
      'stair-climbs': ['stair-climb-start', 'stair-climb-end'],
      'goblet-squat': ['goblet-squat-top', 'goblet-squat-bottom'],
      'dumbbell-rows': ['dumbbell-row-start', 'dumbbell-row-pulled']
    };

    const poses = poseMap[movementId] || ['generic'];
    return poses[poseIndex] || poses[0];
  };

  const getHighlightedMuscles = (movementId: string): string[] => {
    const muscleMap: Record<string, string[]> = {
      'bodyweight-squat': ['quads', 'glutes'],
      'push-ups': ['chest', 'triceps'],
      'plank': ['core'],
      'lunges': ['quads', 'glutes'],
      'glute-bridge': ['glutes'],
      'tricep-dips': ['triceps'],
      'step-ups': ['quads', 'glutes'],
      'stair-climbs': ['quads', 'glutes'],
      'goblet-squat': ['quads', 'glutes'],
      'dumbbell-rows': ['back'],
      'jumping-jacks': ['calves', 'shoulders'],
      'high-knees': ['quads', 'core'],
      'burpees': ['chest', 'core', 'quads', 'calves']
    };
    return muscleMap[movementId] || [];
  };

  const handleBack = () => {
    if (state?.fromWorkout) {
      navigate(`/workout/${state.fromWorkout}`, {
        state: {
          from: state?.from || 'browse',
          filters: state?.filters
        }
      });
    } else {
      navigate(-1);
    }
  };

  const handleStartWorkout = () => {
    if (workout) {
      setCurrentWorkout(workout);
      navigate('/timer');
    }
  };

  const getNextMovement = () => {
    if (!workout) return null;
    const currentIndex = workout.moves.findIndex(m => m.movementId === id);
    if (currentIndex === -1 || currentIndex === workout.moves.length - 1) return null;
    return workout.moves[currentIndex + 1];
  };

  const nextMove = getNextMovement();

  const activePoseIndex = Math.min(selectedPoseIndex, movement.poses.length - 1);

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
      <div className="bg-gray-900/60 backdrop-blur-md px-4 py-3 sticky top-0 z-30 border-b border-gray-700/50">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <button onClick={handleBack} className="w-9 h-9 flex items-center justify-center hover:bg-white/20 rounded-xl transition-colors shrink-0 -ml-1">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h1 className="text-xl md:text-2xl font-black text-white text-center flex-1 mx-2 truncate drop-shadow-lg">
              {movement.name}
            </h1>
            <div className="w-9 h-9 shrink-0 -mr-1" /> {/* Empty div to balance the back button */}
          </div>
          {workout && (
            <p className="text-sm text-teal-50/90 text-center leading-snug px-2">
              {workout.moves.find(m => m.movementId === id)?.workSeconds}s work · {workout.moves.find(m => m.movementId === id)?.restSeconds}s rest · {workout.rounds} rounds
            </p>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-6 space-y-6 relative z-10">
        {/* Position Tabs */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-700 mb-2">
            <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {movement.poses.map((pose, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedPoseIndex(index);
                    setIsPlaying(false); // Pause auto-play if user manually clicks a step
                  }}
                  className={`
                    px-4 py-2 text-sm font-medium transition-colors -mb-px whitespace-nowrap
                    ${activePoseIndex === index
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-400 hover:text-white'
                    }
                  `}
                >
                  {pose.name}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 ml-4 mb-2 flex-shrink-0 text-gray-400 hover:text-white transition-colors bg-gray-700/50 hover:bg-gray-700 rounded-full"
              title={isPlaying ? "Pause auto-play" : "Start auto-play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>

          {/* Stick Figure */}
          <motion.div
            key={activePoseIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-2"
          >
            <StickFigure
              pose={getPoseType(id!, activePoseIndex)}
              highlightedMuscles={getHighlightedMuscles(id!)}
            />
          </motion.div>

          {/* Form Cues */}
          <div className="space-y-2">
            {movement.poses[activePoseIndex]?.formCues.map((cue, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 flex-shrink-0" />
                <p className="text-sm text-gray-300">{cue}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How to Do It */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">🏋️</span>
            How to do it
          </h2>
          <ol className="space-y-4">
            {movement.steps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="text-white font-medium mb-1">{step.instruction}</p>
                  <p className="text-sm text-gray-400 italic">{step.coachingNote}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Muscles Worked */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">💪</span>
            Muscles worked
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {movement.muscles.map((muscle, index) => (
              <div key={index} className="p-4 bg-teal-900/30 rounded-lg border border-teal-500/30">
                <h3 className="font-semibold text-teal-300 text-sm mb-1">{muscle.name}</h3>
                <p className="text-sm text-gray-300">{muscle.realLifePayoff}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modifications */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            Modifications
          </h2>
          <div className="space-y-4">
            {movement.modifications.map((mod, index) => (
              <div key={index}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`
                    px-2 py-1 text-xs font-semibold rounded
                    ${mod.type === 'easier' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}
                  `}>
                    {mod.type === 'easier' ? 'Easier' : 'Harder'}
                  </span>
                  <h3 className="font-semibold text-white text-sm">{mod.name}</h3>
                </div>
                <p className="text-sm text-gray-300">{mod.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Watch Out For */}
        <div className="bg-amber-900/20 backdrop-blur-sm border border-amber-600/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Watch out for</h2>
          </div>
          <ul className="space-y-2">
            {movement.watchOuts.map((warning, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                <span className="text-amber-400 mt-0.5 font-bold">!</span>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        {workout && (
          <div className="space-y-3 pb-6">
            <Button
              onClick={handleStartWorkout}
              className="w-full h-14 text-lg font-semibold rounded-xl"
              style={{ backgroundColor: '#14B8A6' }}
            >
              🚀 Start workout
            </Button>
            {nextMove && (
              <Button
                onClick={() => {
                  const nextMovement = movements.find(m => m.id === nextMove.movementId);
                  if (nextMovement) {
                    navigate(`/movement/${nextMovement.id}`, {
                      state: {
                        fromWorkout: workout.id,
                        filters: state?.filters,
                        from: state?.from
                      }
                    });
                  }
                }}
                variant="outline"
                className="w-full h-12 text-base font-medium rounded-xl"
              >
                Next movement: {movements.find(m => m.id === nextMove.movementId)?.name}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
