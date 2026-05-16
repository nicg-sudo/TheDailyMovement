export type Equipment = 'Nothing' | 'Chair' | 'Stairs' | 'Dumbbells';
export type FocusArea = 'Full body' | 'Upper body' | 'Lower body' | 'Cardio' | 'Core';
export type Intensity = 'Easy' | 'Moderate' | 'Hard';
export type FeltRating = 'too-easy' | 'just-right' | 'tough' | 'too-hard';

export interface WorkoutMove {
  movementId: string;
  workSeconds: number;
  restSeconds: number;
}

export interface Payoff {
  moveIds: string[];
  muscleGroup: string;
  realLifePayoff: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  duration: 10 | 15 | 20 | 30;
  equipment: Equipment[];
  focus: FocusArea[];
  intensity: Intensity;
  rounds: number;
  moves: WorkoutMove[];
  payoffs: Payoff[];
  beforeYouBegin: string[];
}

export interface Pose {
  name: string;
  formCues: string[];
}

export interface Step {
  instruction: string;
  coachingNote: string;
}

export interface Muscle {
  name: string;
  realLifePayoff: string;
}

export interface Modification {
  type: 'easier' | 'harder';
  name: string;
  description: string;
}

export interface Movement {
  id: string;
  name: string;
  poses: Pose[];
  steps: Step[];
  muscles: Muscle[];
  modifications: Modification[];
  watchOuts: string[];
}

export interface WorkoutHistory {
  workoutId: string;
  completedAt: string;
  feltRating?: FeltRating;
}

export interface TimerState {
  phase: 'ready' | 'work' | 'rest' | 'done';
  currentMoveIndex: number;
  currentRound: number;
  secondsRemaining: number;
  isPaused: boolean;
}
