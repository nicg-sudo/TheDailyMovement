# FitHome Implementation Plan
**Prototype v1.0 · Mobile-First Fitness Web App**

## Executive Summary

Building a mobile-responsive fitness web app with 6 core screens that eliminates friction between intent and action. The app requires zero signup, works entirely client-side, and guides users from "I have 20 minutes" to completing a workout in under 60 seconds.

---

## 1. Technical Architecture

### Tech Stack
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context + localStorage (no backend)
- **Routing**: React Router v6 (for screen navigation)
- **Audio**: Web Audio API (workout timer beeps)
- **Animations**: Motion (formerly Framer Motion)
- **Icons**: Lucide React

### Project Structure
```
src/
├── app/
│   ├── App.tsx                    # Main app with router
│   ├── components/
│   │   ├── screens/
│   │   │   ├── QuickStartScreen.tsx
│   │   │   ├── WorkoutBrowserScreen.tsx
│   │   │   ├── WorkoutCardScreen.tsx
│   │   │   ├── MovementGuideScreen.tsx
│   │   │   ├── WorkoutTimerScreen.tsx
│   │   │   └── PostWorkoutScreen.tsx
│   │   ├── ui/
│   │   │   ├── SelectableTile.tsx
│   │   │   ├── FilterPill.tsx
│   │   │   ├── WorkoutCard.tsx
│   │   │   ├── MovementTile.tsx
│   │   │   ├── TimerRing.tsx
│   │   │   ├── ProgressDots.tsx
│   │   │   └── Button.tsx
│   │   └── illustrations/
│   │       ├── FigureSVG.tsx      # Reusable pose component
│   │       └── poses.ts           # Pose coordinate data
│   ├── contexts/
│   │   ├── WorkoutContext.tsx     # Active workout state
│   │   └── FilterContext.tsx      # Filter preferences
│   ├── hooks/
│   │   ├── useWorkoutTimer.ts     # Timer logic with Date.now()
│   │   ├── useWakeLock.ts         # Screen wake lock
│   │   └── useAudioCues.ts        # Beep notifications
│   ├── data/
│   │   ├── workouts.json          # Workout catalogue
│   │   └── movements.json         # Movement library
│   └── utils/
│       ├── workoutMatcher.ts      # Filter matching logic
│       └── storage.ts             # localStorage wrapper
```

---

## 2. Data Models

### Workout Model
```typescript
interface Workout {
  id: string;
  name: string;
  description: string;
  duration: 10 | 15 | 20 | 30;
  equipment: Equipment[];
  focus: FocusArea[];
  intensity: 'Easy' | 'Moderate' | 'Hard';
  moves: WorkoutMove[];
  rounds: number;
  payoffs: Payoff[];
  beforeYouBegin: string[];
}

interface WorkoutMove {
  movementId: string;
  workSeconds: number;
  restSeconds: number;
}

interface Payoff {
  moveIds: string[];
  muscleGroup: string;
  realLifePayoff: string;
}

type Equipment = 'Nothing' | 'Chair' | 'Water bottle' | 'Dumbbells';
type FocusArea = 'Full body' | 'Upper body' | 'Lower body' | 'Cardio' | 'Core';
```

### Movement Model
```typescript
interface Movement {
  id: string;
  name: string;
  poses: Pose[];              // 2-3 position tabs
  steps: Step[];              // 4 numbered instructions
  muscles: Muscle[];          // 3-4 muscles worked
  modifications: Modification[];
  watchOuts: string[];        // 3-4 common mistakes
}

interface Pose {
  name: string;               // "Top", "Bottom", "Easier version"
  coordinates: PoseData;      // SVG coordinate data
  formCues: string[];         // Annotated highlights
}

interface Step {
  instruction: string;
  coachingNote: string;
}

interface Muscle {
  name: string;
  realLifePayoff: string;     // "Builds strength to carry groceries"
}

interface Modification {
  type: 'easier' | 'harder';
  name: string;
  description: string;
}
```

---

## 3. Screen-by-Screen Implementation

### 3.1 Quick-Start Screen (`/`)

**Purpose**: Match user to workout in <60 seconds

**Components**:
- Header with tagline
- Time selection tiles (single-select, required)
- Equipment selection tiles (multi-select, "Nothing" default)
- CTA button (disabled until time selected)
- Footer note

**Key Logic**:
```typescript
const [selectedTime, setSelectedTime] = useState<number | null>(null);
const [selectedEquipment, setSelectedEquipment] = useState<Equipment[]>(['Nothing']);

// Equipment selection rule:
// - "Nothing" deselects all others when tapped
// - Selecting anything else removes "Nothing"

const handleFindWorkout = () => {
  const matches = matchWorkouts(selectedTime, selectedEquipment);
  navigate('/browse', { state: { matches } });
};
```

**Success Metric**: User taps "Find my workout" within 60s

---

### 3.2 Workout Browser Screen (`/browse`)

**Purpose**: Full catalogue with filtering

**Components**:
- Filter pills (Time, Equipment, Focus, Intensity)
- Result count display
- Workout card grid
- Clear filters button
- Empty state

**Filter Logic**:
- Time & Equipment: pre-populated from quick-start if arrived from there
- Focus: multi-select, defaults to "Full body"
- Intensity: single-select, no default
- Real-time filtering on selection change
- Sort: best match first, then shortest duration

**Empty State**:
"No workouts match these filters. Try adjusting your selection."

---

### 3.3 Workout Card Screen (`/workout/:id`)

**Purpose**: Remove doubt before starting

**Layout**:
1. **Hero Header** (teal background)
   - Workout name + description
   - Badges: duration, intensity, equipment
2. **Movement Grid** (2×4 tappable tiles)
   - Each tile: movement name + "40s · 20s rest"
   - Tap opens movement guide modal
3. **"Why your body will thank you"**
   - 3-4 muscle groups with real-life payoffs
4. **"Before you begin"**
   - Space needed, water, footwear notes
5. **Action Buttons**
   - Primary: "Start workout"
   - Secondary: "Preview all movements first"

**Interaction**:
- Movement tile tap → opens MovementGuideScreen as modal/overlay
- "Preview all" → shows first movement guide with Next navigation
- "Start workout" → navigate to timer with workout loaded in context

---

### 3.4 Movement Guide Screen (`/movement/:id`)

**Purpose**: Deep-dive on single exercise

**Layout**:
1. **Header**: Back arrow + movement name + format
2. **Position Tabs** (2-3 tabs): "Top" / "Bottom" / "Easier version"
3. **SVG Figure**: Illustrated with muscle highlights + form cues
4. **How to do it**: 4 numbered steps with coaching notes
5. **Muscles worked**: 2×2 grid with payoffs
6. **Modifications**: Easier and harder variations
7. **Watch out for**: Amber warning block with 3-4 mistakes
8. **Footer**: "Start workout" + "Next movement" buttons

**Tab Switching**:
- Animate SVG figure transition between poses
- Update form cue annotations per pose

**Critical Requirement**:
Every movement MUST have at least one easier modification surfaced visually

---

### 3.5 Workout Timer Screen (`/timer`)

**Purpose**: Guide user through active workout

**Timer States**:
1. **GET READY** (3s countdown, teal ring)
2. **WORK** (movement name prominent, teal ring draining)
3. **REST** (softer treatment, amber ring)
4. **DONE** (transition to post-workout)

**Layout**:
- Close button (top-left) + "Round X of Y" (top-right)
- Movement chip trail (completed dimmed, active highlighted)
- State pill + current movement + "Next: [name]"
- Large ring timer (countdown centered, progress ring)
- Round dots (filled/outlined/empty)
- Controls: Skip · Pause/Play (64px min) · Guide

**Timer Implementation**:
```typescript
// Use Date.now() to prevent drift
const useWorkoutTimer = (workout: Workout) => {
  const [phase, setPhase] = useState<'ready' | 'work' | 'rest'>('ready');
  const [currentMove, setCurrentMove] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [secondsRemaining, setSecondsRemaining] = useState(3);
  
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      // Calculate phase and seconds based on elapsed time
    }, 100); // 100ms for smooth ring animation
    
    return () => clearInterval(interval);
  }, [phase]);
};
```

**Audio Cues**:
- 3 short beeps at 3 seconds remaining in rest
- 1 long tone when work starts

**Wake Lock**:
```typescript
useEffect(() => {
  let wakeLock: WakeLockSentinel | null = null;
  
  const requestWakeLock = async () => {
    try {
      wakeLock = await navigator.wakeLock.request('screen');
    } catch (err) {
      console.log('Wake lock not supported');
    }
  };
  
  requestWakeLock();
  return () => wakeLock?.release();
}, []);
```

**Interactions**:
- Pause: 64px button, easy to tap
- Skip: advances to next phase immediately
- Guide: opens movement guide without ending workout
- Close: prompts confirmation before exiting

---

### 3.6 Post-Workout Screen (`/complete`)

**Purpose**: Make user feel good, suggest next step

**Layout**:
1. **Hero** (teal background): ✓ icon + "You did it" + workout name
2. **Stats Bar**: Minutes · Movements · Rounds (simple numbers only)
3. **"What your body just practised"**: Movements grouped by benefit
4. **"How did that feel?"**: 4 buttons
   - Too easy / Just right / Tough / Too hard
   - Each shows warm, constructive response (not data confirmation)
5. **Suggested Next Workout**: One card with reason
   - "Targets what today missed" / "Builds on what you just did"
6. **Footer Buttons**:
   - Primary: "Browse more workouts"
   - Secondary: "Do this one again"

**Content Rules**:
- NO calorie estimates
- NO social sharing
- NO rating form
- NO account prompt or upsell

---

## 4. Key Technical Implementations

### 4.1 SVG Illustration System

**Reusable Figure Component**:
```typescript
interface FigureSVGProps {
  pose: PoseData;
  highlightedMuscles?: string[];
  formCues?: FormCue[];
}

const FigureSVG: React.FC<FigureSVGProps> = ({ pose, highlightedMuscles, formCues }) => {
  return (
    <svg viewBox="0 0 400 600" className="w-full h-auto">
      {/* Stick figure paths */}
      <path d={pose.bodyPath} />
      
      {/* Muscle highlights */}
      {highlightedMuscles?.map(muscle => (
        <ellipse className="fill-teal-500/30" {...pose.muscles[muscle]} />
      ))}
      
      {/* Form cue annotations */}
      {formCues?.map(cue => (
        <g>
          <line {...cue.pointerLine} className="stroke-amber-500" />
          <text {...cue.textPosition}>{cue.text}</text>
        </g>
      ))}
    </svg>
  );
};
```

**Benefits**:
- Consistent style across all movements
- Easy to animate between poses
- Small file size (inline SVG)
- Muscle highlights and annotations are dynamic

### 4.2 Workout Matching Algorithm

```typescript
const matchWorkouts = (
  time: number,
  equipment: Equipment[],
  focus?: FocusArea[],
  intensity?: Intensity
): Workout[] => {
  return workouts
    .filter(w => {
      // Time must match exactly
      if (w.duration !== time) return false;
      
      // Equipment: workout must not require more than user has
      const required = w.equipment.filter(e => e !== 'Nothing');
      const userHas = equipment.filter(e => e !== 'Nothing');
      if (required.some(e => !userHas.includes(e))) return false;
      
      // Focus: if specified, workout must match at least one
      if (focus?.length && !focus.some(f => w.focus.includes(f))) return false;
      
      // Intensity: if specified, must match exactly
      if (intensity && w.intensity !== intensity) return false;
      
      return true;
    })
    .sort((a, b) => {
      // Best match first (more focus overlap)
      // Then shorter duration first within ties
      return b.focus.length - a.focus.length;
    });
};
```

### 4.3 Local Storage Persistence

```typescript
// Store workout completion history
interface WorkoutHistory {
  workoutId: string;
  completedAt: Date;
  feltRating?: 'too-easy' | 'just-right' | 'tough' | 'too-hard';
}

const saveWorkoutCompletion = (workoutId: string, rating?: string) => {
  const history = JSON.parse(localStorage.getItem('workout-history') || '[]');
  history.push({
    workoutId,
    completedAt: new Date().toISOString(),
    feltRating: rating
  });
  localStorage.setItem('workout-history', JSON.stringify(history));
};

// Use for "Do this one again" and suggestion logic
```

---

## 5. Content Creation Requirements

### 5.1 Workout Catalogue (15-20 workouts minimum)

**Distribution**:
- **Duration**: 10min (4), 15min (5), 20min (6), 30min (4)
- **Equipment**: Bodyweight majority, Chair (3), Water bottle (2), Dumbbells (2)
- **Intensity**: Easy (5), Moderate (8), Hard (4)
- **Focus**: Ensure each area has 3+ options

**Sample Workout Data**:
```json
{
  "id": "quick-morning-blast",
  "name": "Quick Morning Blast",
  "description": "Wake up your whole body in ten minutes",
  "duration": 10,
  "equipment": ["Nothing"],
  "focus": ["Full body", "Cardio"],
  "intensity": "Moderate",
  "rounds": 3,
  "moves": [
    { "movementId": "jumping-jacks", "workSeconds": 40, "restSeconds": 20 },
    { "movementId": "bodyweight-squat", "workSeconds": 40, "restSeconds": 20 },
    { "movementId": "push-ups", "workSeconds": 40, "restSeconds": 20 },
    { "movementId": "high-knees", "workSeconds": 40, "restSeconds": 20 }
  ],
  "payoffs": [
    {
      "moveIds": ["bodyweight-squat"],
      "muscleGroup": "Legs & glutes",
      "realLifePayoff": "Builds the strength to stand up from a low sofa or pick up a dropped item"
    },
    {
      "moveIds": ["push-ups"],
      "muscleGroup": "Chest & arms",
      "realLifePayoff": "Makes pushing heavy doors and lifting yourself up easier"
    }
  ],
  "beforeYouBegin": [
    "Clear a 2m × 2m space",
    "Have water nearby",
    "Wear supportive shoes or go barefoot"
  ]
}
```

### 5.2 Movement Library (14 movements minimum)

**Required Movements**:
- Bodyweight: Squat, Push-up, Lunge, Burpee, Mountain climber, Plank, Glute bridge, High knees, Jumping jack, Tricep dip
- With equipment: Dumbbell row, Dumbbell curl, Overhead press, Goblet squat

**Sample Movement Data**:
```json
{
  "id": "bodyweight-squat",
  "name": "Bodyweight Squat",
  "poses": [
    {
      "name": "Top",
      "coordinates": { "bodyPath": "...", "muscles": {...} },
      "formCues": ["Feet shoulder-width", "Chest up"]
    },
    {
      "name": "Bottom",
      "coordinates": { "bodyPath": "...", "muscles": {...} },
      "formCues": ["Hips below knees", "Weight in heels"]
    },
    {
      "name": "Easier version",
      "coordinates": { "bodyPath": "...", "muscles": {...} },
      "formCues": ["Use chair for support"]
    }
  ],
  "steps": [
    {
      "instruction": "Stand with feet shoulder-width apart, toes slightly out",
      "coachingNote": "Imagine standing on train tracks, not a tightrope"
    },
    {
      "instruction": "Send hips back as if sitting in a chair",
      "coachingNote": "Lead with your butt, not your knees"
    },
    {
      "instruction": "Lower until hips are below knees",
      "coachingNote": "Only go as low as feels stable"
    },
    {
      "instruction": "Drive through heels to stand back up",
      "coachingNote": "Squeeze your glutes at the top"
    }
  ],
  "muscles": [
    {
      "name": "Quadriceps",
      "realLifePayoff": "Powers you up stairs and hills without burning out"
    },
    {
      "name": "Glutes",
      "realLifePayoff": "Builds the strength to stand up from a low sofa"
    },
    {
      "name": "Core",
      "realLifePayoff": "Protects your lower back when lifting heavy objects"
    }
  ],
  "modifications": [
    {
      "type": "easier",
      "name": "Chair-assisted squat",
      "description": "Lightly touch a chair behind you at the bottom for balance"
    },
    {
      "type": "harder",
      "name": "Jump squat",
      "description": "Explode up into a small jump at the top of each rep"
    }
  ],
  "watchOuts": [
    "Knees caving inward — push them out in line with your toes",
    "Weight shifting to toes — keep heels glued to the floor",
    "Rounding your lower back — keep chest proud and core tight"
  ]
}
```

---

## 6. Styling & Design System

### Color Palette (from PRD context)
```css
/* theme.css */
:root {
  --color-teal-primary: #14B8A6;     /* Primary brand, CTAs */
  --color-teal-light: #5EEAD4;       /* Timer ring, highlights */
  --color-amber: #F59E0B;            /* Rest state, warnings */
  --color-gray-900: #111827;         /* Text primary */
  --color-gray-600: #4B5563;         /* Text secondary */
  --color-gray-100: #F3F4F6;         /* Backgrounds */
}
```

### Component Standards
- **Tappable Elements**: Minimum 44px × 44px (WCAG)
- **Primary CTA**: 48px height, full-width on mobile, teal background
- **Secondary CTA**: 44px height, outline style
- **Tiles**: Rounded corners (8px), tap feedback with scale animation
- **Cards**: 12px padding, 4px border radius, subtle shadow

### Typography
- **Headers**: Bold, tight line-height
- **Body**: Regular weight, 1.5 line-height for readability
- **Coaching Notes**: Italic, slightly smaller, gray-600

### Mobile-First Breakpoints
```css
/* Default: mobile (320px - 767px) */
/* sm: 640px */
/* md: 768px (tablet) */
/* lg: 1024px (desktop - optional, not priority) */
```

---

## 7. Implementation Phases

### Phase 1: Foundation (Week 1)
**Goal**: Core infrastructure and data models

- [ ] Set up React + TypeScript + Tailwind project
- [ ] Install dependencies (React Router, Motion, Lucide)
- [ ] Create data models and TypeScript interfaces
- [ ] Build initial `workouts.json` with 5 sample workouts
- [ ] Build initial `movements.json` with 6 sample movements
- [ ] Set up routing structure
- [ ] Create basic layout and navigation shell
- [ ] Implement FilterContext and WorkoutContext

**Deliverable**: App shell with routing, no screens yet

---

### Phase 2: Quick-Start & Browse (Week 1-2)
**Goal**: User can find a workout

- [ ] Build QuickStartScreen with time/equipment selection
- [ ] Implement SelectableTile component with multi/single-select logic
- [ ] Build workout matching algorithm
- [ ] Create WorkoutBrowserScreen with filtering
- [ ] Implement FilterPill components
- [ ] Build WorkoutCard component for grid display
- [ ] Test filtering logic with sample data
- [ ] Add empty state handling

**Deliverable**: User can select preferences and see matched workouts

---

### Phase 3: Workout Detail & Movement Guide (Week 2)
**Goal**: User understands what they're about to do

- [ ] Build WorkoutCardScreen layout
- [ ] Create MovementTile grid component
- [ ] Build MovementGuideScreen with tabs
- [ ] Create FigureSVG component system
- [ ] Design 3 sample poses for one movement (squat)
- [ ] Implement tab switching with pose transitions
- [ ] Add muscle highlight overlays
- [ ] Build modification sections
- [ ] Add "Watch out for" warning blocks

**Deliverable**: User can preview workout and explore movement guides

---

### Phase 4: Workout Timer (Week 3)
**Goal**: User can complete a guided workout

- [ ] Build useWorkoutTimer hook with Date.now() logic
- [ ] Create TimerRing component with SVG progress ring
- [ ] Implement GET READY / WORK / REST state transitions
- [ ] Build WorkoutTimerScreen layout
- [ ] Add movement chip trail
- [ ] Create ProgressDots component for rounds
- [ ] Implement Pause/Play/Skip controls
- [ ] Add Web Audio API beep system (useAudioCues hook)
- [ ] Implement wake lock (useWakeLock hook)
- [ ] Add exit confirmation dialog

**Deliverable**: Fully functional workout timer

---

### Phase 5: Post-Workout & Polish (Week 3-4)
**Goal**: Complete the loop, user wants to return

- [ ] Build PostWorkoutScreen layout
- [ ] Implement "How did that feel?" rating system
- [ ] Create workout suggestion logic based on history
- [ ] Add localStorage for workout completion tracking
- [ ] Build "Do this one again" flow
- [ ] Polish animations and transitions
- [ ] Test full user flow end-to-end
- [ ] Mobile responsive testing (320px to 768px)
- [ ] Add loading states and error boundaries

**Deliverable**: Complete prototype ready for user testing

---

### Phase 6: Content & Final Data (Week 4)
**Goal**: Populate with real workout content

- [ ] Create 15-20 complete workouts across all filter dimensions
- [ ] Write 14 complete movement guides
- [ ] Design SVG poses for all movements (2-3 poses each)
- [ ] Write all real-life payoff copy (review for quality)
- [ ] Write all coaching notes and form cues
- [ ] Write all "watch out for" warnings
- [ ] Test all filter combinations return results
- [ ] Verify copywriting tone matches PRD standards

**Deliverable**: Production-ready content catalogue

---

## 8. Critical Quality Checkpoints

### Before User Testing
- [ ] Quick-start to workout start < 60 seconds (measure)
- [ ] Timer accuracy verified (no drift over 30min workout)
- [ ] Audio cues work on iOS Safari and Chrome Android
- [ ] Wake lock prevents screen sleep during workout
- [ ] All movements have easier modification surfaced visually
- [ ] Real-life payoff copy reviewed (no Latin anatomy terms)
- [ ] Mobile responsive 320px to 768px tested
- [ ] localStorage persists completion history correctly
- [ ] No broken filter combinations (all return ≥1 workout)

### Content Quality
- [ ] Every "Watch out for" is specific and fixable ("Knees caving inward" not "poor form")
- [ ] Every payoff references universal daily task
- [ ] Coaching notes add value beyond instruction
- [ ] Movement guides never say "repeat" without explaining how many
- [ ] No placeholders like "// Rest of code" in any component

---

## 9. Out of Scope (Prototype v1)

**Explicitly NOT building**:
- User accounts or login
- Progress tracking over time
- Calorie estimates
- Social sharing or social proof
- Streak counters
- AI personalization
- Push notifications
- Video guides (SVG only)
- Monetization or upsell
- Age/gender/weight inputs

**Rationale**: These require earning user trust through one completed workout first. The prototype validates the core experience only.

---

## 10. Open Questions for User Testing

These decisions will be resolved with user feedback from the prototype:

1. Should quick-start and workout browser be combined or separate entry points?
2. Is 4 movements per workout the right density? (Test 3 vs 5)
3. Does the "how did that feel?" response change suggestions or just collect data?
4. At what catalogue size do age/fitness filters become valuable?
5. Should movement guides be accessible without selecting a workout first?

---

## 11. Success Metrics (Post-Launch)

Track these qualitative and behavioral signals:

| Metric | Target | Why It Matters |
|--------|--------|----------------|
| Time to first workout start | < 60s from landing | Validates friction removal |
| Workout completion rate | > 60% of started | Validates content quality and timer UX |
| Movement guide open rate | > 40% of sessions | Validates guides are useful, not ignored |
| Feel response rate | > 50% of completed | Validates emotional resonance of done screen |
| Return within 48 hours | > 25% of completers | Validates core retention loop |

---

## 12. Technical Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Timer drift causes inaccurate workouts | Use `Date.now()` instead of `setInterval` accumulation |
| Screen sleeps mid-workout | Implement Wake Lock API with fallback messaging |
| Audio cues don't work on iOS | Test Web Audio API early, add visual cues as backup |
| SVG illustrations inconsistent | Build reusable FigureSVG component first, then poses |
| Filter combinations return 0 results | Write content distribution first, then build filters |
| User loses progress on accidental close | Add exit confirmation, store timer state in context |

---

## End of Implementation Plan

**Next Steps**:
1. Review this plan with stakeholders
2. Clarify any open questions
3. Begin Phase 1: Foundation setup
4. Daily standups to track progress against phase milestones

**Estimated Timeline**: 4 weeks for complete prototype v1.0
**Team Size**: 1-2 developers + 1 content writer for movement guides
