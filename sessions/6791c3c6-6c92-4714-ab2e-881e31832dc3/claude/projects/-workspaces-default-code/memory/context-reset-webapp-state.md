---
name: FitHome App Context Reset
description: Complete state and context for The Daily Movement (FitHome) fitness web application
type: project
---

# FitHome / The Daily Movement - Complete Context Reset

## Project Overview
**Name**: The Daily Movement (originally FitHome)
**Purpose**: Polished fitness app prototype for user validation and testing
**Focus**: Working frontend with complete UI/UX flow for bodyweight workouts
**Tech Stack**: React 18+, TypeScript, Tailwind CSS v4, React Router v6, Motion (Framer Motion), Lucide React icons

## Application Structure

### Core Technology
- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS v4 with dark theme
- **Routing**: React Router v6
- **Animation**: Motion (motion/react) - successor to Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API
- **Persistence**: localStorage for workout history and saved workouts
- **Audio**: Web Audio API for timer beeps
- **Build Tool**: Vite (custom setup - do NOT run build commands)

### File Structure
```
/workspaces/default/code/
├── src/
│   ├── app/
│   │   ├── App.tsx (main app with routing)
│   │   └── components/
│   │       ├── navigation/
│   │       │   └── BottomNav.tsx (persistent bottom navigation)
│   │       ├── screens/
│   │       │   ├── LandingScreen.tsx (time/equipment selection)
│   │       │   ├── WorkoutBrowserScreen.tsx (browse with filters)
│   │       │   ├── WorkoutCardScreen.tsx (workout details)
│   │       │   ├── MovementGuideScreen.tsx (exercise instructions)
│   │       │   ├── WorkoutTimerScreen.tsx (active workout)
│   │       │   ├── PostWorkoutScreen.tsx (completion screen)
│   │       │   ├── VaultScreen.tsx (saved workouts)
│   │       │   └── UpcomingScreen.tsx (upcoming features)
│   │       ├── illustrations/
│   │       │   ├── StickFigure.tsx (exercise stick figures)
│   │       │   └── HeroIllustration.tsx (landing page hero)
│   │       └── ui/
│   │           └── button.tsx (reusable button component)
│   ├── contexts/
│   │   ├── WorkoutContext.tsx (active workout state)
│   │   └── SavedWorkoutsContext.tsx (saved workouts with localStorage)
│   ├── data/
│   │   ├── workouts.json (22 workouts)
│   │   └── movements.json (16 movements)
│   ├── hooks/
│   │   └── useWorkoutTimer.ts (timer logic with Date.now())
│   ├── styles/
│   │   ├── theme.css (Tailwind v4 theme tokens)
│   │   └── fonts.css (font imports)
│   └── types/
│       └── index.ts (TypeScript interfaces)
```

## Data Models

### Equipment Types
- Nothing
- Chair
- Stairs (replaced "Water bottle")
- Dumbbells

### Focus Areas
- Full body
- Upper body
- Lower body
- Cardio
- Core

### Intensity Levels
- Easy (green)
- Moderate (amber)
- Hard (red)

### Workout Structure
```typescript
{
  id: string
  name: string
  description: string
  duration: 10 | 15 | 20 | 30 (minutes)
  equipment: Equipment[]
  focus: FocusArea[]
  intensity: Intensity
  rounds: number
  moves: WorkoutMove[]
  payoffs: Payoff[]
  beforeYouBegin: string[]
}
```

### Movement Structure
```typescript
{
  id: string
  name: string
  poses: Pose[]  // 2-3 positions for stick figure
  steps: Step[]  // 4 instructions with coaching notes
  muscles: Muscle[]
  modifications: Modification[]  // easier/harder
  watchOuts: string[]
}
```

## Available Workouts (22 total)

**Equipment-based**:
- Nothing: Quick Morning Blast, Steady Strength, Total Body Power, Cardio Blast, Lower Body Strength, etc.
- Chair: Upper Body Burn, Chair Power, Total Body Challenge
- Stairs: Stair Power, Stair Sprint Challenge

**Duration**: 10, 15, 20, 30 minute options
**Intensity**: Easy, Moderate, Hard options
**Focus**: Full body, Upper body, Lower body, Cardio, Core

## Available Movements (16 total)

1. **Bodyweight Squat** - quads, glutes
2. **Push-ups** - chest, triceps
3. **Plank** - core
4. **Lunges** - quads
5. **Glute Bridge** - glutes
6. **Jumping Jacks** - cardio
7. **High Knees** - cardio
8. **Burpees** - full body
9. **Mountain Climbers** - core, cardio
10. **Tricep Dips** - triceps (requires chair)
11. **Step-Ups** - quads, glutes (requires stairs)
12. **Stair Climbs** - cardio, legs (requires stairs)

## Key Features

### 1. Navigation & Routing
**Pages**:
- `/` - Landing (time/equipment selection)
- `/browse` - Workout browser with filters
- `/workout/:id` - Workout details
- `/movement/:id` - Movement guide
- `/timer` - Active workout
- `/complete` - Post-workout
- `/vault` - Saved workouts
- `/upcoming` - Upcoming features

**Bottom Navigation** (3 tabs):
- Workout (Dumbbell icon) → Landing page
- Vault (Heart icon) → Saved workouts
- Upcoming (Rocket icon) → Upcoming features

**Hidden on**: Timer, Movement Guide, Post-Workout screens

### 2. Save/Favorite System
- Heart button on workout card screen (top-right)
- Unfilled heart (white/30 opacity) = not saved
- Filled teal heart = saved
- Persists to localStorage
- Saved workouts show in Vault tab
- Vault sorts by duration (10, 15, 20, 30 min)
- Can unsave from Vault or workout card

### 3. Timer System
- Uses `Date.now()` for accuracy (prevents drift)
- Phases: ready (3s) → work → rest → done
- Web Audio API beeps:
  - 1 long beep when work starts (800Hz)
  - 3 short beeps at 3s remaining in rest (600Hz)
- Wake Lock API keeps screen awake
- Pause/resume functionality
- Skip to next exercise

### 4. Stick Figure Illustrations
**Poses available**:
- squat-top, squat-bottom
- pushup-top, pushup-bottom
- plank
- lunge
- bridge-bottom, bridge-top
- standing
- jumping-jack-open
- high-knee
- tricep-dip-top, tricep-dip-bottom
- step-up
- stair-climb
- generic (fallback)

**Colors**: White (#FFFFFF) with 4px stroke width
**Muscle highlights**: Teal (#14B8A6) at 50% opacity
**Props**: Can highlight quads, glutes, chest, triceps, core

### 5. Design System

**Theme**: Dark with teal/emerald accents
- Background: `bg-gradient-to-br from-gray-900 via-black to-gray-900`
- Cards: `bg-gray-800/80 backdrop-blur-sm` (glass-morphism)
- Primary accent: Teal (#14B8A6) to Emerald (#10B981) gradients
- Text: White headings, gray-300/400 for body text
- Borders: `border-gray-700`

**Typography**:
- Font size/weight NOT specified in Tailwind classes (uses theme.css defaults)
- Only override when user specifically requests changes
- Headings: Bold/black weight
- Body: Normal weight

**Spacing**:
- Bottom padding on pages with nav: `pb-20` or `pb-24`
- Cards: `p-6` standard
- Gaps: `gap-4` to `gap-6` typical

**Animations**:
- Entry: `initial={{ opacity: 0, y: 20 }}` with stagger delays
- Hover: `whileHover={{ y: -4 }}`
- Tap: `whileTap={{ scale: 0.98 }}`

## User Flow

1. **Landing** → Select time (10/15/20/30 min) + equipment → "Find My Workout"
2. **Browse** → Filter by time/equipment/focus/intensity → Click workout card
3. **Workout Card** → View details, movements, payoffs → "Start workout" or preview movements
4. **Movement Guide** → View form, stick figure, cues → "Start workout" or next movement
5. **Timer** → 3s ready → Work/rest cycles → Complete
6. **Post-Workout** → Stats, rate feeling, browse more or save

**Alternate flows**:
- Save workout → Vault → Browse saved workouts
- Upcoming tab → View future features

## Important Implementation Notes

### DO NOT:
- Run `vite build` or `npm run build` (will fail)
- Create `index.html` (entrypoint is auto-generated)
- Start dev server manually (already running)
- Tell users to open localhost URLs
- Use font size/weight Tailwind classes unless specifically requested
- Modify `__figma__entrypoint__.ts`
- Add comments unless WHY is non-obvious
- Create unnecessary abstractions
- Add error handling for impossible scenarios

### DO:
- Use Read tool before Edit tool
- Test UI changes in browser before reporting complete
- Use specific tool for task (Read, Edit, Write, Glob, Grep)
- Keep responses concise (1-2 sentences typically)
- Use Motion for animations
- Persist state to localStorage when needed
- Follow existing patterns and conventions
- Use exact color values from theme when needed

### Git Protocol:
- NEVER update git config
- NEVER run destructive commands without user request
- NEVER skip hooks (--no-verify)
- NEVER force push to main/master
- ALWAYS create NEW commits (not --amend) unless explicitly requested
- Stage specific files, not "git add -A"

## Color Palette
- Teal-500: `#14B8A6`
- Emerald-500: `#10B981`
- Teal-300: Light teal for text
- Gray-900: `#111827`
- Gray-800: `#1F2937`
- Gray-700: `#374151`
- Gray-400: `#9CA3AF`
- Gray-300: `#D1D5DB`
- Amber-500: `#F59E0B`
- Green-100/700: Easy intensity
- Amber-100/700: Moderate intensity
- Red-100/700: Hard intensity

## Context-Specific Details

### Workout Timer Logic
- `startTimeRef` tracks when timer started
- `pausedTimeRef` accumulates paused time
- Recalculates `secondsRemaining` every 100ms
- Advances phase when seconds hit 0
- Plays beeps at specific moments

### Stick Figure Rendering
- Each pose is a case in switch statement
- Uses SVG with viewBox="0 0 400 400"
- Anatomically accurate joint positions
- Shows equipment (chair, stairs) when relevant
- White stroke for body, teal fill for muscle highlights

### Saved Workouts System
- SavedWorkoutsContext provides: `savedWorkoutIds`, `toggleSaveWorkout`, `isWorkoutSaved`
- localStorage key: 'saved-workouts'
- Array of workout IDs
- Updates trigger re-render across app

### Movement Guide Screen
- Takes workout context from router state: `{ fromWorkout, preview }`
- Shows "Start workout" button if from workout
- Shows "Next movement" if not last in sequence
- Tabs switch between poses
- Stick figure animates on tab change

## Recent Changes

### Session Summary
1. Built complete fitness app with 6 core screens
2. Generated 22 workouts and 16 movements with full data
3. Converted entire app to dark theme
4. Fixed navigation errors (useEffect for redirects)
5. Created anatomically accurate stick figures
6. Improved readability (contrast issues fixed)
7. Fixed specific movement illustrations (jumping jacks, tricep dips, lunges, high knees)
8. Added persistent bottom navigation (3 tabs)
9. Implemented save/favorite system with localStorage
10. Created Vault page for saved workouts
11. Created Upcoming page for future features
12. Replaced "Water bottle" with "Stairs" equipment
13. Created 2 stair-based movements and 2 stair workouts
14. Added transparency to browse screen banner

### Known Working State
- All routes functional
- Bottom nav shows/hides correctly
- Save system persists across sessions
- Timer accurate with beeps
- Stick figures accurate for all movements
- Dark theme consistent throughout
- Filters work correctly
- Empty states handled

## Future Features Listed in Upcoming Tab
1. 🏆 Leaderboards - Compete with friends and community
2. 🔥 Workout streaks - Track consistency and build momentum
3. 🏃 Run-based workouts - Guided running from sprints to long-distance

---

**Why**: Complete project state for resuming work in future sessions or onboarding new context
**How to apply**: Use this as reference for understanding project structure, conventions, and current implementation state
