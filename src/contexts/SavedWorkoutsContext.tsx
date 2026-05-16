import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SavedWorkoutsContextType {
  savedWorkoutIds: string[];
  toggleSaveWorkout: (workoutId: string) => void;
  isWorkoutSaved: (workoutId: string) => boolean;
}

const SavedWorkoutsContext = createContext<SavedWorkoutsContextType | undefined>(undefined);

export function SavedWorkoutsProvider({ children }: { children: ReactNode }) {
  const [savedWorkoutIds, setSavedWorkoutIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('saved-workouts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('saved-workouts', JSON.stringify(savedWorkoutIds));
  }, [savedWorkoutIds]);

  const toggleSaveWorkout = (workoutId: string) => {
    setSavedWorkoutIds(prev => {
      if (prev.includes(workoutId)) {
        return prev.filter(id => id !== workoutId);
      } else {
        return [...prev, workoutId];
      }
    });
  };

  const isWorkoutSaved = (workoutId: string) => {
    return savedWorkoutIds.includes(workoutId);
  };

  return (
    <SavedWorkoutsContext.Provider value={{ savedWorkoutIds, toggleSaveWorkout, isWorkoutSaved }}>
      {children}
    </SavedWorkoutsContext.Provider>
  );
}

export function useSavedWorkouts() {
  const context = useContext(SavedWorkoutsContext);
  if (context === undefined) {
    throw new Error('useSavedWorkouts must be used within a SavedWorkoutsProvider');
  }
  return context;
}
