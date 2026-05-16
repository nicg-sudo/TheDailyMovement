import { useState, useEffect, useRef, useCallback } from 'react';
import { Workout } from '../types';

interface TimerState {
  phase: 'ready' | 'work' | 'rest' | 'done';
  currentMoveIndex: number;
  currentRound: number;
  secondsRemaining: number;
  elapsedSeconds: number;
  isPaused: boolean;
}

export function useWorkoutTimer(workout: Workout) {
  const [state, setState] = useState<TimerState>({
    phase: 'ready',
    currentMoveIndex: 0,
    currentRound: 1,
    secondsRemaining: 3,
    elapsedSeconds: 0,
    isPaused: false
  });

  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize Audio Context
  useEffect(() => {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      audioContextRef.current = new AudioContext();
    }
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const playBeep = useCallback((frequency: number, duration: number) => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration);

    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + duration);
  }, []);

  const advancePhase = useCallback(() => {
    setState(prevState => {
      const { phase, currentMoveIndex, currentRound } = prevState;

      if (phase === 'ready') {
        playBeep(800, 0.3);
        return {
          ...prevState,
          phase: 'work',
          secondsRemaining: workout.moves[currentMoveIndex].workSeconds,
          // When skipping ready, we don't increment elapsed
        };
      }

      if (phase === 'work') {
        const isLastMove = currentMoveIndex === workout.moves.length - 1;
        const isLastRound = currentRound === workout.rounds;

        if (isLastMove && isLastRound) {
          return {
            ...prevState,
            phase: 'done',
            secondsRemaining: 0,
            elapsedSeconds: prevState.elapsedSeconds + prevState.secondsRemaining // Add skipped seconds to elapsed
          };
        }

        playBeep(800, 0.3);
        return {
          ...prevState,
          phase: 'rest',
          secondsRemaining: workout.moves[currentMoveIndex].restSeconds,
          elapsedSeconds: prevState.elapsedSeconds + prevState.secondsRemaining // Add skipped seconds to elapsed
        };
      }

      if (phase === 'rest') {
        const isLastMove = currentMoveIndex === workout.moves.length - 1;

        if (isLastMove) {
          playBeep(800, 0.3);
          return {
            ...prevState,
            phase: 'work',
            currentMoveIndex: 0,
            currentRound: currentRound + 1,
            secondsRemaining: workout.moves[0].workSeconds,
            elapsedSeconds: prevState.elapsedSeconds + prevState.secondsRemaining // Add skipped seconds to elapsed
          };
        }

        playBeep(800, 0.3);
        return {
          ...prevState,
          phase: 'work',
          currentMoveIndex: currentMoveIndex + 1,
          secondsRemaining: workout.moves[currentMoveIndex + 1].workSeconds,
          elapsedSeconds: prevState.elapsedSeconds + prevState.secondsRemaining // Add skipped seconds to elapsed
        };
      }

      return prevState;
    });
  }, [workout, playBeep]);

  useEffect(() => {
    if (state.isPaused || state.phase === 'done') {
      return;
    }

    // Simple countdown: decrement by 1 every second
    const interval = setInterval(() => {
      setState(prev => {
        const newSecondsRemaining = prev.secondsRemaining - 1;
        // Only increment elapsed time if we are in 'work' or 'rest' phase, not 'ready'
        const newElapsedSeconds = prev.phase !== 'ready' ? prev.elapsedSeconds + 1 : prev.elapsedSeconds;

        // Handle phase transition when timer reaches zero
        if (newSecondsRemaining <= 0) {
          const { phase, currentMoveIndex, currentRound } = prev;

          // Play phase transition beep
          playBeep(800, 0.3);

          if (phase === 'ready') {
            return {
              ...prev,
              phase: 'work',
              secondsRemaining: workout.moves[currentMoveIndex].workSeconds,
              elapsedSeconds: newElapsedSeconds
            };
          }

          if (phase === 'work') {
            const isLastMove = currentMoveIndex === workout.moves.length - 1;
            const isLastRound = currentRound === workout.rounds;

            if (isLastMove && isLastRound) {
              return {
                ...prev,
                phase: 'done',
                secondsRemaining: 0,
                elapsedSeconds: newElapsedSeconds
              };
            }

            return {
              ...prev,
              phase: 'rest',
              secondsRemaining: workout.moves[currentMoveIndex].restSeconds,
              elapsedSeconds: newElapsedSeconds
            };
          }

          if (phase === 'rest') {
            const isLastMove = currentMoveIndex === workout.moves.length - 1;

            if (isLastMove) {
              return {
                ...prev,
                phase: 'work',
                currentMoveIndex: 0,
                currentRound: currentRound + 1,
                secondsRemaining: workout.moves[0].workSeconds,
                elapsedSeconds: newElapsedSeconds
              };
            }

            return {
              ...prev,
              phase: 'work',
              currentMoveIndex: currentMoveIndex + 1,
              secondsRemaining: workout.moves[currentMoveIndex + 1].workSeconds,
              elapsedSeconds: newElapsedSeconds
            };
          }
        }

        // Play countdown beeps at 3s, 2s, 1s AFTER decrementing (when number appears on screen)
        if (newSecondsRemaining === 3 || newSecondsRemaining === 2 || newSecondsRemaining === 1) {
          playBeep(600, 0.15);
        }

        return { ...prev, secondsRemaining: newSecondsRemaining, elapsedSeconds: newElapsedSeconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.phase, state.isPaused, playBeep, workout]);

  const togglePause = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const skip = useCallback(() => {
    advancePhase();
  }, [advancePhase]);

  return {
    ...state,
    togglePause,
    skip
  };
}
