import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { WorkoutProvider } from '../contexts/WorkoutContext';
import { SavedWorkoutsProvider } from '../contexts/SavedWorkoutsContext';
import { LandingScreen } from './components/screens/LandingScreen';
import { WorkoutBrowserScreen } from './components/screens/WorkoutBrowserScreen';
import { WorkoutCardScreen } from './components/screens/WorkoutCardScreen';
import { MovementGuideScreen } from './components/screens/MovementGuideScreen';
import { WorkoutTimerScreen } from './components/screens/WorkoutTimerScreen';
import { PostWorkoutScreen } from './components/screens/PostWorkoutScreen';
import { VaultScreen } from './components/screens/VaultScreen';
import { UpcomingScreen } from './components/screens/UpcomingScreen';
import { StreakScreen } from './components/screens/StreakScreen';
import { BottomNav } from './components/navigation/BottomNav';

function AppContent() {
  const location = useLocation();

  // Hide bottom nav on these routes
  const hideBottomNav = ['/timer', '/movement'].some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="size-full">
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/browse" element={<WorkoutBrowserScreen />} />
        <Route path="/workout/:id" element={<WorkoutCardScreen />} />
        <Route path="/movement/:id" element={<MovementGuideScreen />} />
        <Route path="/timer" element={<WorkoutTimerScreen />} />
        <Route path="/complete" element={<PostWorkoutScreen />} />
        <Route path="/vault" element={<VaultScreen />} />
        <Route path="/upcoming" element={<UpcomingScreen />} />
        <Route path="/streak" element={<StreakScreen />} />
      </Routes>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <WorkoutProvider>
      <SavedWorkoutsProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </SavedWorkoutsProvider>
    </WorkoutProvider>
  );
}