import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Workout, FeltRating } from '../types';

interface WorkoutContextType {
  currentWorkout: Workout | null;
  setCurrentWorkout: (workout: Workout | null) => void;
  completedWorkout: { workout: Workout; feltRating?: FeltRating } | null;
  setCompletedWorkout: (data: { workout: Workout; feltRating?: FeltRating } | null) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [completedWorkout, setCompletedWorkout] = useState<{ workout: Workout; feltRating?: FeltRating } | null>(null);

  return (
    <WorkoutContext.Provider value={{ currentWorkout, setCurrentWorkout, completedWorkout, setCompletedWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within WorkoutProvider');
  }
  return context;
}
