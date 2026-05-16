
FitHome
Product Specification
Prototype v1.0  ·  April 2026
Free · no equipment · 20 minutes
Fitness for everyone, everywhere

 
1. Problem statement

THE CORE INSIGHT
Most people don't skip exercise because they lack motivation. They skip it because every available option requires something they don't have right now — a membership, 60 minutes, equipment, or someone to show them what to do.

Gym memberships are increasingly expensive and inaccessible. Long workouts are intimidating for beginners and incompatible with busy lives. Most free fitness content online requires prior knowledge to navigate safely, and rarely explains why a movement matters in the context of everyday life.

The result: people who want to exercise simply don't start.

The gap we're filling
There is no product that combines all of:
•	Short, effective workouts (10–30 min) designed for pockets of time in a real day
•	Zero cost and zero equipment required as the default
•	Movement guides that explain form, muscles, and real-life relevance in plain language
•	A user experience with no friction between intent and action

Who this is for
Users of all ages and fitness levels who want to move their bodies today, in the time they have, without spending money or needing prior knowledge. Specifically:
•	Parents with limited free time
•	Older adults maintaining functional strength
•	Beginners who find gym environments intimidating
•	Anyone whose gym membership lapsed and hasn't found a replacement

Design principle
NORTH STAR
Health and fitness should not be paygated. Building a healthy community should be free. The app succeeds when someone who has never thought of themselves as a fitness person finishes a workout and feels capable.

 
2. User journey

The full flow from landing to done is five screens. Every design decision optimises for reducing the time between intent and first rep.

Screen	User goal	Success metric
Quick-start	Find a workout in under 60 seconds	Taps “Find my workout” within 60s of landing
Workout browser	Browse and filter by time and equipment	Selects a workout within 2 taps
Workout card	Understand what they're about to do	Taps “Start workout” without leaving the screen
Guided timer	Complete the workout	Finishes all rounds without pausing
Post-workout	Feel good and plan what's next	Taps a suggested next workout

 
3. Screen specifications
3.1  Quick-start screen
The landing screen. No account required. The only goal is matching the user to a workout as fast as possible.

Content
•	Headline: “Let’s find your workout”
•	Subhead: “Two quick questions and you're ready to go. No account needed.”
•	Question 1 — How much time do you have?
–	Four tappable tiles: 10 min / 15 min / 20 min / 30 min
–	Single-select. No default selected.
•	Question 2 — What do you have nearby?
–	Four tappable tiles: Nothing / A chair / Water bottle / Dumbbells
–	Multi-select. “Nothing” pre-selected by default, deselects others when tapped.
•	CTA button: “Find my workout” — disabled until time is selected
•	Footer note: “No sign-up required · free forever”

Interaction rules
•	Time is the only required input. Gear is optional — user can proceed with nothing selected.
•	Do not ask: fitness level, age, weight, goals, or motivation. Save for optional profile.
•	On submit, show 3 matched workouts ordered by best fit. Shortest duration first within equal matches.

DESIGN RULE
Never ask a question whose answer doesn't materially change the workout shown. Every extra question is a workout that doesn't happen.

3.2  Workout browser
The full catalogue with filters. Accessible from the quick-start results or directly via navigation.

Primary filters (always visible)
•	Time: 10 / 15 / 20 / 30 min pills — single-select
•	Equipment: Nothing / Chair / Water bottle / Dumbbells — multi-select

Secondary filters (collapsed by default)
•	Focus area: Full body / Upper body / Lower body / Cardio / Core — multi-select, Full body default
•	Intensity: Easy / Moderate / Hard — single-select, none selected by default

Results display
•	Grid of workout cards. Show count: “4 workouts” above grid.
•	Each card: workout name, duration badge, intensity badge, one-line description.
•	Sort: best match to filters first, shorter workouts first within ties.
•	Empty state: “No workouts match these filters. Try adjusting your selection.”
•	Clear filters button always visible alongside result count.

DO NOT BUILD
Filters for age, gender, weight, calories, or goals at prototype stage. These add complexity without improving match quality for a small catalogue. Add when catalogue exceeds 30 workouts.

3.3  Workout card
The preview screen shown before starting a workout. One job: remove doubt and get the user to tap Start.

Content structure
•	Hero header (teal background): workout name, one-line description, badges for duration / level / equipment
•	Movement list: 2×4 grid of tappable tiles, each showing movement name and work/rest format
–	Tapping a tile opens the movement guide for that exercise
•	“Why your body will thank you” section: muscle groups with real-life payoff descriptions
•	“Before you begin” note: space required, water, footwear
•	Two action buttons: “Start workout” (primary) and “Preview all movements first” (secondary)

Content rules
•	Do not show calorie estimates — inaccurate and attract the wrong mindset
•	Do not show social proof metrics at prototype stage
•	Muscle group payoff lines must reference real-life tasks, not Latin anatomy
–	Good: “Builds the leg strength to stand up from a low sofa”
–	Bad: “Activates the quadriceps femoris”

3.4  Movement guide
Deep-dive on a single exercise. Accessible from the workout card (tile tap) or the timer screen (Guide button).

Content structure
•	Header: back arrow + movement name + format (e.g. “40 sec · 20 sec rest · 3 rounds”)
•	Position tabs: 2–3 tabs showing key positions (e.g. Top / Bottom / Easier version)
•	Illustrated figure: SVG stick figure with muscle highlights and annotated form cues per tab
•	How to do it: 4-step numbered instructions with coaching sub-notes per step
•	Muscles worked: 2×2 grid — muscle name + real-life payoff description per muscle
•	Modifications: easier and harder variations with clear labels
•	Watch out for: 3–4 common mistakes in an amber warning block
•	Footer: “Start workout” primary button + “Next movement: [name]” secondary button

Modifications requirement
NON-NEGOTIABLE
Every movement guide must include at least one easier modification. The push-up to knee push-up, squat to chair-assisted squat. A user who cannot do the standard version must see an immediate, judgment-free alternative — surfaced visually, not buried in text.

3.5  Guided workout timer
The active workout screen. Users may be sweaty, on the floor, phone at a distance. Every interaction must be a single large tap.

Timer states
State	Visual treatment	Ring colour
Get ready	3-second countdown before first move	Teal (light)
Work	Movement name prominent, ring draining	Teal
Rest	“Rest” displayed, softer treatment	Amber
Done	Transition to post-workout screen	—

Screen layout (top to bottom)
•	Close button (top left) + “Round X of Y” (top right)
•	Movement chip trail: completed moves dimmed, active move highlighted
•	State pill (GET READY / WORK / REST) + current movement name + “Next: [name]”
•	Large ring timer: countdown number centred, progress ring draining clockwise
•	Round dots: filled = done, outlined = current, empty = upcoming
•	Controls row: Skip · large Pause/Play button · Guide

Interaction rules
•	Pause button is 64px diameter minimum — tappable with sweaty hands
•	Skip advances immediately to next phase (work → rest → next move)
•	Guide button opens movement guide for the current exercise without ending the workout
•	Close prompts confirmation before exiting — never silently loses progress
•	No other tappable elements during active workout

AUDIO NOTE
Implement Web Audio API beeps for the prototype: 3 short beeps at 3 seconds remaining in rest, 1 long tone when work starts. Users exercising cannot look at their screen.

3.6  Post-workout screen
The done screen. Goal: make the user feel genuinely good, connect effort to meaning, and leave them wanting to return. Not a data dump.

Content structure
•	Hero (teal background): check icon + “You did it” + workout name
•	Stats bar: Minutes · Movements · Rounds — three simple numbers only
•	“What your body just practised”: movements grouped by shared benefit, plain-English payoff per group
•	“How did that feel?”: four buttons — Too easy / Just right / Tough / Too hard
–	Each button shows a warm, constructive response — not a data confirmation
•	Suggested next workout: one card with name, duration, and reason for the suggestion
•	Footer: “Browse more workouts” (primary) + “Do this one again” (secondary)

Content rules
•	Do not show calorie estimates
•	Do not show a social sharing prompt — premature for prototype
•	Do not show a rating form — wrong moment, user is tired
•	Do not show an account creation prompt or upsell immediately after workout
•	Suggested next workout must include a reason: “targets what today missed” not “you might also like”

 
4. Content requirements

4.1  Workout catalogue
The prototype requires a minimum of 15–20 workouts that genuinely vary across all filter dimensions. Without this, filters become decorative rather than functional.

Attribute	Required values
Duration	10, 15, 20, 30 min — at least 3 workouts per duration
Equipment	Bodyweight-only (majority), Chair, Water bottle, Dumbbells
Focus area	Full body, Upper body, Lower body, Cardio, Core
Intensity	Easy, Moderate, Hard — at least 3 per level

4.2  Movement library
Each movement in the catalogue requires a complete guide. Minimum library for prototype:

•	Bodyweight: Squat, Push-up, Lunge, Burpee, Mountain climber, Plank, Glute bridge, High knees, Jumping jack, Tricep dip (using chair)
•	With equipment: Dumbbell row, Dumbbell curl, Overhead press, Goblet squat

Per-movement guide requirements
Element	Requirement
Position illustrations	Minimum 2 tabs (start + key position). 3 tabs if modification changes the visual.
Form cues	Exactly 4 numbered steps. Each step has a coaching sub-note.
Muscles worked	3–4 muscles. Each with a real-life payoff sentence.
Modifications	At least 1 easier. At least 1 harder. Both visually described.
Watch out for	3–4 common mistakes. Specific and actionable, not generic.

4.3  Copywriting standard
VOICE AND TONE
Write like a knowledgeable friend, not a gym instructor. Warm, direct, and respectful of the user's intelligence. Never condescending. Never use jargon without an immediate plain-English translation. The real-life payoff lines are the most important copy in the product — spend disproportionate time on them.

•	Payoff lines must reference specific, universal daily tasks
–	Good: “Builds the strength to carry a toddler up a flight of stairs”
–	Good: “Protects your knees when walking downhill or down stairs”
–	Bad: “Improves lower body functional strength”
•	Mistake warnings must be specific and fixable in one cue
–	Good: “Knees caving inward — push them out in line with your toes”
–	Bad: “Poor form can lead to injury”

 
5. Out of scope for prototype

These features are explicitly excluded from v1. They are not being deprioritised — they are being removed to keep the prototype focused on validating the core experience.

Feature	Reason excluded
User accounts / login	Trust must be earned through one completed workout first
Progress tracking	Requires accounts and enough usage history to be meaningful
Calorie estimates	Inaccurate without heart rate data; attract wrong motivational mindset
Social features / sharing	Premature; adds friction at the wrong moment
Streak counters	Guilt-based retention — misaligned with the product's values
AI-personalised plans	Requires usage data that doesn't exist yet
Push notifications	Cannot send without account; and earn trust first
Video guides	SVG illustrations are sufficient for prototype; video is a production investment
Age / gender / weight filters	Add complexity without improving match quality at small catalogue size
Monetisation / upsell	Do not compromise user trust during the prototype phase

 
6. Success metrics

For the prototype, success is defined by qualitative signal and a small set of behavioural indicators. Do not optimise for vanity metrics.

Metric	Target	Why it matters
Time to first workout start	< 60 seconds from landing	Validates friction removal
Workout completion rate	> 60% of started workouts	Validates content quality and timer UX
Movement guide open rate	> 40% of sessions	Validates that guides are useful, not ignored
Feel response rate	> 50% of completed workouts	Validates emotional resonance of done screen
Return within 48 hours	> 25% of completers	Validates the core retention loop

 
7. Build notes for developers

7.1  Tech stack recommendation
•	Frontend: React or plain HTML/CSS/JS — no framework dependency required for prototype
•	Timer: Web Audio API for beeps. requestAnimationFrame or setInterval (100ms) for countdown.
•	Illustrations: SVG — inline, not image files. Enables tab-switching animations.
•	State: No backend required for prototype. All state in memory/localStorage.
•	Hosting: Static file hosting (Vercel, Netlify, GitHub Pages)

7.2  Key technical considerations
Timer accuracy
setInterval drifts. Use Date.now() to compute elapsed time on each tick rather than accumulating interval counts. A 100ms interval that drifts 5ms per tick produces a 3-second error over a 60-second set.

Wake lock
Request the Screen Wake Lock API when a workout starts so the phone screen does not sleep mid-session. Release it when the workout ends or is paused.

navigator.wakeLock.request('screen') — wrap in try/catch, it is not supported on all browsers.

SVG illustrations
Build a reusable SVG figure component that accepts a pose parameter. Each movement guide defines 2–3 poses as coordinate sets. This avoids duplicating SVG markup per movement and keeps illustrations consistent across the library.

7.3  Content data structure
Recommend a single workouts.json file for the prototype. Each workout object:

{ id, name, description, duration, equipment[], focus[], intensity,
  moves: [{ id, name, workSecs, restSecs }],
  rounds, payoffs: [{ moves[], muscle, lifePayoff }] }

Each movement in a separate moves.json with id, name, steps[], muscles[], modifications[], watchOuts[], poses[].

 
8. Open questions

These decisions are deliberately deferred. Resolve with user feedback from the prototype.

•	Should the quick-start and workout browser be the same screen or separate entry points?
•	What is the right number of movements per workout? (Currently 4. Test 3 vs 5.)
•	Does the “how did that feel?” response change workout suggestions, or is it only for product learning?
•	At what catalogue size do age/fitness-level filters add meaningful value?
•	Should movement guides be accessible without selecting a workout? (Discovery vs. commitment.)
•	What is the right framing for a sustainability model that doesn't compromise the free-access principle?


FitHome Product Spec · v1.0 · April 2026 · For internal use
