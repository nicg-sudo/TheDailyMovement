import React from 'react';

interface StickFigureProps {
  pose: 'squat-top' | 'squat-bottom' | 'pushup-top' | 'pushup-bottom' | 'plank' | 'lunge-start' | 'lunge-end' | 'bridge-bottom' | 'bridge-top' | 'standing' | 'jumping-jack-open' | 'high-knee-start' | 'high-knee-end' | 'tricep-dip-top' | 'tricep-dip-bottom' | 'step-up-start' | 'step-up' | 'stair-climb-start' | 'stair-climb-end' | 'goblet-squat-top' | 'goblet-squat-bottom' | 'dumbbell-row-start' | 'dumbbell-row-pulled' | 'mountain-climber-start' | 'mountain-climber-end' | 'glute-bridge-start' | 'glute-bridge-end' | 'burpee-stand' | 'burpee-squat' | 'burpee-high-plank' | 'burpee-low-plank' | 'burpee-jump' | 'generic';
  highlightedMuscles?: string[];
}

export function StickFigure({ pose, highlightedMuscles = [] }: StickFigureProps) {
  const renderFigure = () => {
    switch (pose) {
      case 'squat-top':
        return (
          <>
            {/* Head */}
            <circle cx="200" cy="80" r="25" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Right Arm (Background) */}
            <line x1="200" y1="130" x2="130" y2="120" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Right Leg (Background) */}
            <line x1="200" y1="220" x2="210" y2="280" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="210" y1="280" x2="210" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="210" y1="340" x2="180" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Body */}
            <line x1="200" y1="105" x2="200" y2="220" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Left Leg (Foreground) */}
            <line x1="200" y1="220" x2="200" y2="280" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="200" y1="280" x2="200" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="200" y1="340" x2="170" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Left Arm (Foreground) */}
            <line x1="200" y1="130" x2="120" y2="130" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joint markers */}
            <circle cx="200" cy="130" r="4" fill="#FFFFFF" />
            <circle cx="200" cy="220" r="4" fill="#FFFFFF" />
            <circle cx="200" cy="280" r="4" fill="#FFFFFF" />
            <circle cx="200" cy="340" r="4" fill="#FFFFFF" />
            <circle cx="210" cy="280" r="4" fill="#FFFFFF" />
            <circle cx="210" cy="340" r="4" fill="#FFFFFF" />
            
            {/* Muscle highlights */}
            {highlightedMuscles.includes('quads') && (
              <ellipse cx="205" cy="250" rx="15" ry="25" fill="#14B8A6" opacity="0.5" />
            )}
            {highlightedMuscles.includes('glutes') && (
              <ellipse cx="210" cy="220" rx="18" ry="20" fill="#14B8A6" opacity="0.5" />
            )}
          </>
        );
      case 'squat-bottom':
        return (
          <>
            {/* Head */}
            <circle cx="156" cy="175" r="25" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Right Arm (Background) */}
            <line x1="182" y1="220" x2="112" y2="210" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Right Leg (Background) */}
            <line x1="225" y1="295" x2="175" y2="280" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="175" y1="280" x2="210" y2="335" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="210" y1="335" x2="180" y2="335" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Body leaning forward */}
            <line x1="169" y1="197" x2="225" y2="295" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Left Leg (Foreground) */}
            <line x1="225" y1="295" x2="165" y2="285" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="165" y1="285" x2="200" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="200" y1="340" x2="170" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Left Arm (Foreground) */}
            <line x1="182" y1="220" x2="102" y2="220" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joint markers */}
            <circle cx="182" cy="220" r="4" fill="#FFFFFF" />
            <circle cx="225" cy="295" r="4" fill="#FFFFFF" />
            <circle cx="165" cy="285" r="4" fill="#FFFFFF" />
            <circle cx="200" cy="340" r="4" fill="#FFFFFF" />
            <circle cx="175" cy="280" r="4" fill="#FFFFFF" />
            <circle cx="210" cy="335" r="4" fill="#FFFFFF" />
            
            {/* Muscle highlights */}
            {highlightedMuscles.includes('glutes') && (
              <ellipse cx="235" cy="290" rx="20" ry="25" fill="#14B8A6" opacity="0.5" transform="rotate(30 235 290)" />
            )}
            {highlightedMuscles.includes('quads') && (
              <ellipse cx="195" cy="290" rx="30" ry="15" fill="#14B8A6" opacity="0.5" transform="rotate(-15 195 290)" />
            )}
          </>
        );
      case 'pushup-top':
        return (
          <>
            {/* Background Leg (Right) */}
            <line x1="255" y1="235" x2="340" y2="300" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="340" y1="300" x2="350" y2="315" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Background Arm (Right) */}
            <line x1="160" y1="155" x2="160" y2="315" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Head */}
            <circle cx="120" cy="134" r="22" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Body */}
            <line x1="150" y1="160" x2="245" y2="240" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Foreground Leg (Left) */}
            <line x1="245" y1="240" x2="330" y2="305" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="330" y1="305" x2="340" y2="320" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Foreground Arm (Left) */}
            <line x1="150" y1="160" x2="150" y2="320" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joint markers */}
            <circle cx="160" cy="155" r="4" fill="#FFFFFF" />
            <circle cx="340" cy="300" r="4" fill="#FFFFFF" />
            
            <circle cx="150" cy="160" r="4" fill="#FFFFFF" />
            <circle cx="150" cy="240" r="4" fill="#FFFFFF" />
            <circle cx="150" cy="320" r="4" fill="#FFFFFF" />
            
            <circle cx="245" cy="240" r="4" fill="#FFFFFF" />
            <circle cx="330" cy="305" r="4" fill="#FFFFFF" />

            {/* Muscle highlights */}
            {highlightedMuscles.includes('chest') && (
              <ellipse cx="170" cy="190" rx="18" ry="12" fill="#14B8A6" opacity="0.5" transform="rotate(40 170 190)" />
            )}
            {highlightedMuscles.includes('triceps') && (
              <ellipse cx="140" cy="210" rx="10" ry="20" fill="#14B8A6" opacity="0.5" />
            )}
          </>
        );
      case 'pushup-bottom':
        return (
          <>
            {/* Background Leg (Right) */}
            <line x1="230" y1="280" x2="340" y2="305" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="340" y1="305" x2="350" y2="315" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Background Arm (Right) */}
            <line x1="110" y1="245" x2="190" y2="240" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="190" y1="240" x2="160" y2="315" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Head */}
            <circle cx="62" cy="239" r="22" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Body */}
            <line x1="100" y1="250" x2="220" y2="285" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Foreground Leg (Left) */}
            <line x1="220" y1="285" x2="330" y2="310" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="330" y1="310" x2="340" y2="320" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Foreground Arm (Left) */}
            <line x1="100" y1="250" x2="180" y2="245" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="180" y1="245" x2="150" y2="320" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joint markers */}
            <circle cx="110" cy="245" r="4" fill="#FFFFFF" />
            <circle cx="190" cy="240" r="4" fill="#FFFFFF" />
            <circle cx="340" cy="305" r="4" fill="#FFFFFF" />
            
            <circle cx="100" cy="250" r="4" fill="#FFFFFF" />
            <circle cx="180" cy="245" r="4" fill="#FFFFFF" />
            <circle cx="150" cy="320" r="4" fill="#FFFFFF" />
            
            <circle cx="220" cy="285" r="4" fill="#FFFFFF" />
            <circle cx="330" cy="310" r="4" fill="#FFFFFF" />

            {/* Muscle highlights */}
            {highlightedMuscles.includes('chest') && (
              <ellipse cx="130" cy="265" rx="18" ry="12" fill="#14B8A6" opacity="0.5" transform="rotate(16 130 265)" />
            )}
            {highlightedMuscles.includes('triceps') && (
              <ellipse cx="140" cy="240" rx="20" ry="10" fill="#14B8A6" opacity="0.5" transform="rotate(-4 140 240)" />
            )}
          </>
        );
      case 'plank':
        return (
          <>
            {/* Head */}
            <circle cx="115" cy="252" r="20" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            {/* Body (Straight line from shoulders to hips) */}
            <line x1="135" y1="260" x2="230" y2="290" stroke="#FFFFFF" strokeWidth="4" />
            {/* Legs (Straight line from hips to toes) */}
            <line x1="230" y1="290" x2="320" y2="320" stroke="#FFFFFF" strokeWidth="4" />
            {/* Background Leg (for depth) */}
            <line x1="230" y1="290" x2="330" y2="315" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            
            {/* Background Arm (for depth) */}
            <line x1="140" y1="260" x2="145" y2="315" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="145" y1="315" x2="95" y2="315" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Foreground Arm (Upper arm down to elbow, forearm on ground) */}
            <line x1="135" y1="260" x2="135" y2="320" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="135" y1="320" x2="85" y2="320" stroke="#FFFFFF" strokeWidth="4" />

            {/* Muscle highlights */}
            {highlightedMuscles.includes('core') && (
              <ellipse cx="182" cy="275" rx="35" ry="10" fill="#14B8A6" opacity="0.5" transform="rotate(18, 182, 275)" />
            )}
          </>
        );
      case 'lunge-start':
        return (
          <>
            {/* Background Leg */}
            <line x1="200" y1="170" x2="190" y2="245" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="190" y1="245" x2="190" y2="320" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="190" y1="320" x2="160" y2="320" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            
            {/* Background Arm */}
            <line x1="200" y1="80" x2="160" y2="125" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="160" y1="125" x2="200" y2="170" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            
            {/* Head */}
            <circle cx="200" cy="45" r="22" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Body */}
            <line x1="200" y1="67" x2="200" y2="170" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Foreground Leg */}
            <line x1="200" y1="170" x2="210" y2="245" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="210" y1="245" x2="210" y2="320" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="210" y1="320" x2="240" y2="320" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Foreground Arm */}
            <line x1="200" y1="80" x2="240" y2="125" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="240" y1="125" x2="200" y2="170" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joints */}
            <circle cx="200" cy="80" r="4" fill="#FFFFFF" /> {/* Shoulders */}
            <circle cx="200" cy="170" r="4" fill="#FFFFFF" /> {/* Hips */}
            
            <circle cx="160" cy="125" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Elbow */}
            <circle cx="190" cy="245" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Knee */}
            <circle cx="190" cy="320" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Ankle */}
            
            <circle cx="240" cy="125" r="4" fill="#FFFFFF" /> {/* FG Elbow */}
            <circle cx="210" cy="245" r="4" fill="#FFFFFF" /> {/* FG Knee */}
            <circle cx="210" cy="320" r="4" fill="#FFFFFF" /> {/* FG Ankle */}
          </>
        );
      case 'lunge-end':
        return (
          <>
            {/* Background Leg */}
            <line x1="200" y1="245" x2="150" y2="310" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="150" y1="310" x2="90" y2="320" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            
            {/* Background Arm */}
            <line x1="200" y1="155" x2="160" y2="200" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="160" y1="200" x2="200" y2="245" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            
            {/* Head */}
            <circle cx="200" cy="120" r="22" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Body */}
            <line x1="200" y1="142" x2="200" y2="245" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Foreground Leg */}
            <line x1="200" y1="245" x2="275" y2="245" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="275" y1="245" x2="275" y2="320" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="275" y1="320" x2="305" y2="320" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Foreground Arm */}
            <line x1="200" y1="155" x2="240" y2="200" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="240" y1="200" x2="200" y2="245" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joints */}
            <circle cx="200" cy="155" r="4" fill="#FFFFFF" /> {/* Shoulders */}
            <circle cx="200" cy="245" r="4" fill="#FFFFFF" /> {/* Hips */}
            
            <circle cx="160" cy="200" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Elbow */}
            <circle cx="150" cy="310" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Knee */}
            <circle cx="90" cy="320" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Toes */}
            
            <circle cx="240" cy="200" r="4" fill="#FFFFFF" /> {/* FG Elbow */}
            <circle cx="275" cy="245" r="4" fill="#FFFFFF" /> {/* FG Knee */}
            <circle cx="275" cy="320" r="4" fill="#FFFFFF" /> {/* FG Ankle */}

            {/* Muscle highlights */}
            {highlightedMuscles.includes('quads') && (
              <>
                <ellipse cx="237" cy="245" rx="30" ry="14" fill="#14B8A6" opacity="0.5" />
                <ellipse cx="175" cy="277" rx="14" ry="30" fill="#14B8A6" opacity="0.5" transform="rotate(-35 175 277)" />
              </>
            )}
            {highlightedMuscles.includes('glutes') && (
              <circle cx="200" cy="245" r="18" fill="#14B8A6" opacity="0.5" />
            )}
          </>
        );
      case 'bridge-bottom':
        return (
          <>
            {/* Body lying down */}
            <line x1="150" y1="200" x2="250" y2="200" stroke="#FFFFFF" strokeWidth="4" />
            {/* Head */}
            <circle cx="130" cy="200" r="20" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            {/* Arms at sides */}
            <line x1="180" y1="200" x2="180" y2="230" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="220" y1="200" x2="220" y2="230" stroke="#FFFFFF" strokeWidth="4" />
            {/* Legs bent, feet on ground */}
            <line x1="250" y1="200" x2="260" y2="240" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="260" y1="240" x2="260" y2="260" stroke="#FFFFFF" strokeWidth="4" />
          </>
        );
      case 'bridge-top':
        return (
          <>
            {/* Body in bridge position */}
            <path d="M 130 200 Q 200 140 270 240" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            {/* Head */}
            <circle cx="130" cy="200" r="20" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            {/* Arms at sides */}
            <line x1="160" y1="180" x2="160" y2="220" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="240" y1="200" x2="240" y2="240" stroke="#FFFFFF" strokeWidth="4" />
            {/* Legs */}
            <line x1="270" y1="240" x2="270" y2="260" stroke="#FFFFFF" strokeWidth="4" />
            {/* Muscle highlights */}
            {highlightedMuscles.includes('glutes') && (
              <ellipse cx="210" cy="155" rx="25" ry="15" fill="#14B8A6" opacity="0.5" />
            )}
          </>
        );
      case 'jumping-jack-open':
        return (
          <>
            {/* Head */}
            <circle cx="200" cy="80" r="25" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            {/* Body */}
            <line x1="200" y1="105" x2="200" y2="220" stroke="#FFFFFF" strokeWidth="4" />
            {/* Arms - raised overhead in V position */}
            {/* Left arm */}
            <line x1="200" y1="130" x2="160" y2="90" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="160" y1="90" x2="140" y2="50" stroke="#FFFFFF" strokeWidth="4" />
            {/* Right arm */}
            <line x1="200" y1="130" x2="240" y2="90" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="240" y1="90" x2="260" y2="50" stroke="#FFFFFF" strokeWidth="4" />
            {/* Legs - spread wide */}
            {/* Left leg */}
            <line x1="200" y1="220" x2="150" y2="290" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="150" y1="290" x2="140" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="140" y1="340" x2="130" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            {/* Right leg */}
            <line x1="200" y1="220" x2="250" y2="290" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="250" y1="290" x2="260" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="260" y1="340" x2="270" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            {/* Joint markers */}
            <circle cx="160" cy="90" r="4" fill="#FFFFFF" />
            <circle cx="240" cy="90" r="4" fill="#FFFFFF" />
            <circle cx="150" cy="290" r="4" fill="#FFFFFF" />
            <circle cx="250" cy="290" r="4" fill="#FFFFFF" />

            {/* Muscle highlights */}
            {highlightedMuscles.includes('shoulders') && (
              <>
                <ellipse cx="180" cy="115" rx="12" ry="12" fill="#14B8A6" opacity="0.5" />
                <ellipse cx="220" cy="115" rx="12" ry="12" fill="#14B8A6" opacity="0.5" />
              </>
            )}
            {highlightedMuscles.includes('calves') && (
              <>
                <ellipse cx="145" cy="315" rx="8" ry="20" fill="#14B8A6" opacity="0.5" transform="rotate(10 145 315)" />
                <ellipse cx="255" cy="315" rx="8" ry="20" fill="#14B8A6" opacity="0.5" transform="rotate(-10 255 315)" />
              </>
            )}
          </>
        );
      case 'high-knee-start':
        return (
          <>
            {/* Head */}
            <circle cx="200" cy="80" r="25" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Right Arm (Background) */}
            <line x1="200" y1="130" x2="190" y2="170" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="190" y1="170" x2="200" y2="200" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Right Leg (Background) */}
            <line x1="200" y1="220" x2="205" y2="280" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="205" y1="280" x2="205" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="205" y1="340" x2="185" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Body */}
            <line x1="200" y1="105" x2="200" y2="220" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Left Leg (Foreground) */}
            <line x1="200" y1="220" x2="195" y2="280" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="195" y1="280" x2="195" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="195" y1="340" x2="175" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Left Arm (Foreground) */}
            <line x1="200" y1="130" x2="210" y2="170" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="210" y1="170" x2="200" y2="200" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joint markers */}
            <circle cx="190" cy="170" r="4" fill="#FFFFFF" />
            <circle cx="205" cy="280" r="4" fill="#FFFFFF" />
            <circle cx="200" cy="220" r="4" fill="#FFFFFF" />
            <circle cx="195" cy="280" r="4" fill="#FFFFFF" />
            <circle cx="210" cy="170" r="4" fill="#FFFFFF" />
          </>
        );
      case 'high-knee-end':
        return (
          <>
            {/* Head - slightly elevated */}
            <circle cx="200" cy="70" r="25" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Right Arm (Background) - Driven forward */}
            <line x1="200" y1="120" x2="160" y2="130" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="160" y1="130" x2="160" y2="80" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Right Leg (Background) - Standing/Supporting */}
            <line x1="200" y1="210" x2="210" y2="280" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="210" y1="280" x2="210" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="210" y1="340" x2="190" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Body */}
            <line x1="200" y1="95" x2="200" y2="210" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Left Leg (Foreground) - Driven high */}
            <line x1="200" y1="210" x2="140" y2="210" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="140" y1="210" x2="140" y2="270" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="140" y1="270" x2="120" y2="265" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Left Arm (Foreground) - Driven back */}
            <line x1="200" y1="120" x2="230" y2="160" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="230" y1="160" x2="250" y2="110" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joint markers */}
            <circle cx="160" cy="130" r="4" fill="#FFFFFF" />
            <circle cx="210" cy="280" r="4" fill="#FFFFFF" />
            <circle cx="200" cy="210" r="4" fill="#FFFFFF" />
            <circle cx="140" cy="210" r="4" fill="#FFFFFF" />
            <circle cx="140" cy="270" r="4" fill="#FFFFFF" />
            <circle cx="230" cy="160" r="4" fill="#FFFFFF" />
            
            {/* Muscle highlights */}
            {highlightedMuscles.includes('quads') && (
              <ellipse cx="170" cy="210" rx="25" ry="12" fill="#14B8A6" opacity="0.5" />
            )}
            {highlightedMuscles.includes('core') && (
              <ellipse cx="200" cy="160" rx="15" ry="25" fill="#14B8A6" opacity="0.5" />
            )}
          </>
        );
      case 'tricep-dip-top':
        return (
          <>
            {/* Chair - Background */}
            <rect x="210" y="200" width="80" height="20" rx="4" fill="#6B7280" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="225" y1="220" x2="225" y2="340" stroke="#6B7280" strokeWidth="6" />
            <line x1="275" y1="220" x2="275" y2="340" stroke="#6B7280" strokeWidth="6" />

            {/* Background Leg (Right) */}
            <line x1="190" y1="200" x2="130" y2="260" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="130" y1="260" x2="70" y2="320" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="70" y1="320" x2="50" y2="320" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Background Arm (Right) */}
            <line x1="190" y1="115" x2="210" y2="155" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="210" y1="155" x2="220" y2="200" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Head */}
            <circle cx="190" cy="70" r="25" fill="none" stroke="#FFFFFF" strokeWidth="4" />

            {/* Body */}
            <line x1="190" y1="95" x2="190" y2="200" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Leg (Left) */}
            <line x1="190" y1="200" x2="120" y2="260" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="120" y1="260" x2="60" y2="320" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="60" y1="320" x2="40" y2="320" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Arm (Left) */}
            <line x1="190" y1="115" x2="205" y2="155" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="205" y1="155" x2="210" y2="200" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joints */}
            <circle cx="190" cy="115" r="4" fill="#FFFFFF" /> {/* Shoulders */}
            <circle cx="190" cy="200" r="4" fill="#FFFFFF" /> {/* Hips */}

            <circle cx="210" cy="155" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Elbow */}
            <circle cx="130" cy="260" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Knee */}
            <circle cx="70" cy="320" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Ankle */}

            <circle cx="205" cy="155" r="4" fill="#FFFFFF" /> {/* FG Elbow */}
            <circle cx="120" cy="260" r="4" fill="#FFFFFF" /> {/* FG Knee */}
            <circle cx="60" cy="320" r="4" fill="#FFFFFF" /> {/* FG Ankle */}

            {/* Muscle highlights */}
            {highlightedMuscles.includes('triceps') && (
              <ellipse cx="200" cy="135" rx="10" ry="20" fill="#14B8A6" opacity="0.5" transform="rotate(-20 200 135)" />
            )}
          </>
        );
      case 'tricep-dip-bottom':
        return (
          <>
            {/* Chair - Background */}
            <rect x="210" y="200" width="80" height="20" rx="4" fill="#6B7280" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="225" y1="220" x2="225" y2="340" stroke="#6B7280" strokeWidth="6" />
            <line x1="275" y1="220" x2="275" y2="340" stroke="#6B7280" strokeWidth="6" />

            {/* Background Leg (Right) */}
            <line x1="190" y1="260" x2="130" y2="290" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="130" y1="290" x2="70" y2="320" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="70" y1="320" x2="50" y2="320" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Background Arm (Right) */}
            <line x1="190" y1="175" x2="240" y2="160" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="240" y1="160" x2="220" y2="200" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Head */}
            <circle cx="190" cy="130" r="25" fill="none" stroke="#FFFFFF" strokeWidth="4" />

            {/* Body */}
            <line x1="190" y1="155" x2="190" y2="260" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Leg (Left) */}
            <line x1="190" y1="260" x2="125" y2="290" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="125" y1="290" x2="60" y2="320" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="60" y1="320" x2="40" y2="320" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Arm (Left) */}
            <line x1="190" y1="175" x2="235" y2="160" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="235" y1="160" x2="210" y2="200" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joints */}
            <circle cx="190" cy="175" r="4" fill="#FFFFFF" /> {/* Shoulders */}
            <circle cx="190" cy="260" r="4" fill="#FFFFFF" /> {/* Hips */}

            <circle cx="240" cy="160" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Elbow */}
            <circle cx="130" cy="290" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Knee */}
            <circle cx="70" cy="320" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Ankle */}

            <circle cx="235" cy="160" r="4" fill="#FFFFFF" /> {/* FG Elbow */}
            <circle cx="125" cy="290" r="4" fill="#FFFFFF" /> {/* FG Knee */}
            <circle cx="60" cy="320" r="4" fill="#FFFFFF" /> {/* FG Ankle */}

            {/* Muscle highlights */}
            {highlightedMuscles.includes('triceps') && (
              <ellipse cx="212" cy="167" rx="18" ry="10" fill="#14B8A6" opacity="0.5" transform="rotate(-18 212 167)" />
            )}
          </>
        );
      case 'step-up-start':
        return (
          <>
            {/* Box / Platform */}
            <rect x="220" y="250" width="100" height="70" fill="none" stroke="#FFFFFF" strokeWidth="5" />
            <line x1="220" y1="265" x2="320" y2="265" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
            <line x1="220" y1="285" x2="320" y2="285" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
            <line x1="220" y1="305" x2="320" y2="305" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />

            {/* Back Arm (Left Arm, relaxed) */}
            <line x1="160" y1="120" x2="175" y2="150" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="175" y1="150" x2="175" y2="185" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Back leg (Left Leg, standing straight) */}
            <line x1="160" y1="190" x2="145" y2="255" stroke="#FFFFFF" strokeWidth="5" opacity="0.6" />
            <line x1="145" y1="255" x2="145" y2="320" stroke="#FFFFFF" strokeWidth="5" opacity="0.6" />
            <line x1="145" y1="320" x2="170" y2="320" stroke="#FFFFFF" strokeWidth="5" opacity="0.6" />
            <circle cx="145" cy="255" r="5" fill="#FFFFFF" opacity="0.6" />

            {/* Head */}
            <circle cx="160" cy="70" r="25" fill="none" stroke="#FFFFFF" strokeWidth="4" />

            {/* Body */}
            <line x1="160" y1="95" x2="160" y2="190" stroke="#FFFFFF" strokeWidth="4" />

            {/* Hips */}
            <circle cx="160" cy="190" r="5" fill="#FFFFFF" />

            {/* Front leg (Right Leg, standing straight) */}
            <line x1="160" y1="190" x2="165" y2="255" stroke="#FFFFFF" strokeWidth="5" />
            <line x1="165" y1="255" x2="165" y2="320" stroke="#FFFFFF" strokeWidth="5" />
            <line x1="165" y1="320" x2="190" y2="320" stroke="#FFFFFF" strokeWidth="5" />
            <circle cx="165" cy="255" r="5" fill="#FFFFFF" />

            {/* Front Arm (Right Arm, relaxed) */}
            <line x1="160" y1="120" x2="145" y2="150" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="145" y1="150" x2="145" y2="185" stroke="#FFFFFF" strokeWidth="4" />
          </>
        );
      case 'step-up':
        return (
          <>
            {/* Box / Platform */}
            <rect x="220" y="250" width="100" height="70" fill="none" stroke="#FFFFFF" strokeWidth="5" />
            <line x1="220" y1="265" x2="320" y2="265" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
            <line x1="220" y1="285" x2="320" y2="285" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />
            <line x1="220" y1="305" x2="320" y2="305" stroke="#FFFFFF" strokeWidth="2" opacity="0.5" />

            {/* Back Arm (Left Arm, goes forward) */}
            <line x1="160" y1="120" x2="190" y2="150" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="190" y1="150" x2="210" y2="110" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Back leg (Left Leg, on ground) */}
            <line x1="160" y1="190" x2="140" y2="255" stroke="#FFFFFF" strokeWidth="5" opacity="0.6" />
            <line x1="140" y1="255" x2="140" y2="320" stroke="#FFFFFF" strokeWidth="5" opacity="0.6" />
            <line x1="140" y1="320" x2="165" y2="320" stroke="#FFFFFF" strokeWidth="5" opacity="0.6" />
            <circle cx="140" cy="255" r="5" fill="#FFFFFF" opacity="0.6" />

            {/* Head */}
            <circle cx="160" cy="70" r="25" fill="none" stroke="#FFFFFF" strokeWidth="4" />

            {/* Body */}
            <line x1="160" y1="95" x2="160" y2="190" stroke="#FFFFFF" strokeWidth="4" />

            {/* Hips */}
            <circle cx="160" cy="190" r="5" fill="#FFFFFF" />

            {/* Front leg (Right Leg, on box) */}
            <line x1="160" y1="190" x2="240" y2="185" stroke="#FFFFFF" strokeWidth="5" />
            <line x1="240" y1="185" x2="250" y2="250" stroke="#FFFFFF" strokeWidth="5" />
            <line x1="250" y1="250" x2="280" y2="250" stroke="#FFFFFF" strokeWidth="5" />
            <circle cx="240" cy="185" r="5" fill="#FFFFFF" />

            {/* Front Arm (Right Arm, goes back) */}
            <line x1="160" y1="120" x2="130" y2="140" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="130" y1="140" x2="110" y2="100" stroke="#FFFFFF" strokeWidth="4" />

            {/* Muscle highlights */}
            {highlightedMuscles.includes('quads') && (
              <ellipse cx="200" cy="188" rx="35" ry="14" fill="#14B8A6" opacity="0.5" transform="rotate(-5, 200, 188)" />
            )}
            {highlightedMuscles.includes('glutes') && (
              <circle cx="160" cy="190" r="18" fill="#14B8A6" opacity="0.5" />
            )}
          </>
        );
      case 'stair-climb-start':
        return (
          <>
            {/* Stairs */}
            <path d="M 50 320 L 180 320 L 180 270 L 230 270 L 230 220 L 280 220 L 280 170 L 330 170" stroke="#6B7280" strokeWidth="4" fill="none" />
            
            {/* Background Arm (Left) */}
            <line x1="120" y1="165" x2="140" y2="200" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="140" y1="200" x2="150" y2="180" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Background Leg (Left) */}
            <line x1="130" y1="240" x2="115" y2="280" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="115" y1="280" x2="115" y2="320" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="115" y1="320" x2="135" y2="320" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            
            {/* Head */}
            <circle cx="120" cy="140" r="22" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Body */}
            <line x1="120" y1="162" x2="130" y2="240" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Foreground Leg (Right) */}
            <line x1="130" y1="240" x2="145" y2="280" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="145" y1="280" x2="145" y2="320" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="145" y1="320" x2="165" y2="320" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Arm (Right) */}
            <line x1="120" y1="165" x2="100" y2="200" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="100" y1="200" x2="110" y2="220" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joints */}
            <circle cx="120" cy="165" r="4" fill="#FFFFFF" /> {/* Shoulders */}
            <circle cx="130" cy="240" r="4" fill="#FFFFFF" /> {/* Hips */}
            
            <circle cx="140" cy="200" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Elbow */}
            <circle cx="115" cy="280" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Knee */}
            <circle cx="115" cy="320" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Ankle */}
            
            <circle cx="100" cy="200" r="4" fill="#FFFFFF" /> {/* FG Elbow */}
            <circle cx="145" cy="280" r="4" fill="#FFFFFF" /> {/* FG Knee */}
            <circle cx="145" cy="320" r="4" fill="#FFFFFF" /> {/* FG Ankle */}

            {/* Muscle highlights */}
            {highlightedMuscles.includes('quads') && (
              <>
                <ellipse cx="140" cy="260" rx="20" ry="12" fill="#14B8A6" opacity="0.5" transform="rotate(70 140 260)" />
              </>
            )}
          </>
        );
      case 'stair-climb-end':
        return (
          <>
            {/* Stairs */}
            <path d="M 50 320 L 180 320 L 180 270 L 230 270 L 230 220 L 280 220 L 280 170 L 330 170" stroke="#6B7280" strokeWidth="4" fill="none" />
            
            {/* Background Arm (Left, forward) */}
            <line x1="190" y1="125" x2="220" y2="150" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="220" y1="150" x2="210" y2="110" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Background Leg (Left, pushing off) */}
            <line x1="200" y1="200" x2="180" y2="230" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="180" y1="230" x2="180" y2="260" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="180" y1="260" x2="200" y2="270" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            
            {/* Head */}
            <circle cx="190" cy="100" r="22" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Body */}
            <line x1="190" y1="122" x2="200" y2="200" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Foreground Leg (Right, planted on step 2) */}
            <line x1="200" y1="200" x2="240" y2="180" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="240" y1="180" x2="250" y2="220" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="250" y1="220" x2="270" y2="220" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Arm (Right, back) */}
            <line x1="190" y1="125" x2="160" y2="150" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="160" y1="150" x2="160" y2="110" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joints */}
            <circle cx="190" cy="125" r="4" fill="#FFFFFF" /> {/* Shoulders */}
            <circle cx="200" cy="200" r="4" fill="#FFFFFF" /> {/* Hips */}
            
            <circle cx="220" cy="150" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Elbow */}
            <circle cx="180" cy="230" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Knee */}
            <circle cx="180" cy="260" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Ankle */}
            
            <circle cx="160" cy="150" r="4" fill="#FFFFFF" /> {/* FG Elbow */}
            <circle cx="240" cy="180" r="4" fill="#FFFFFF" /> {/* FG Knee */}
            <circle cx="250" cy="220" r="4" fill="#FFFFFF" /> {/* FG Ankle */}

            {/* Muscle highlights */}
            {highlightedMuscles.includes('quads') && (
              <>
                <ellipse cx="220" cy="190" rx="22" ry="12" fill="#14B8A6" opacity="0.5" transform="rotate(-25 220 190)" />
                <ellipse cx="190" cy="215" rx="18" ry="10" fill="#14B8A6" opacity="0.5" transform="rotate(55 190 215)" />
              </>
            )}
            {highlightedMuscles.includes('glutes') && (
              <circle cx="200" cy="200" r="18" fill="#14B8A6" opacity="0.5" />
            )}
          </>
        );
      case 'goblet-squat-top':
        return (
          <>
            {/* Background Leg (Right) */}
            <line x1="200" y1="220" x2="210" y2="280" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="210" y1="280" x2="210" y2="340" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="210" y1="340" x2="180" y2="340" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Background Arm (Right) */}
            <line x1="200" y1="130" x2="190" y2="160" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="190" y1="160" x2="170" y2="125" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Head */}
            <circle cx="200" cy="80" r="25" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Body */}
            <line x1="200" y1="105" x2="200" y2="220" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Leg (Left) */}
            <line x1="200" y1="220" x2="200" y2="280" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="200" y1="280" x2="200" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="200" y1="340" x2="170" y2="340" stroke="#FFFFFF" strokeWidth="4" />

            {/* Dumbbell held vertically at chest */}
            <rect x="155" y="105" width="20" height="40" rx="3" fill="#6B7280" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="155" y1="115" x2="175" y2="115" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="155" y1="135" x2="175" y2="135" stroke="#FFFFFF" strokeWidth="2" />

            {/* Foreground Arm (Left) */}
            <line x1="200" y1="130" x2="195" y2="165" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="195" y1="165" x2="165" y2="125" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joints */}
            <circle cx="200" cy="130" r="4" fill="#FFFFFF" /> {/* Shoulders */}
            <circle cx="200" cy="220" r="4" fill="#FFFFFF" /> {/* Hips */}

            <circle cx="190" cy="160" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Elbow */}
            <circle cx="210" cy="280" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Knee */}
            <circle cx="210" cy="340" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Ankle */}

            <circle cx="195" cy="165" r="4" fill="#FFFFFF" /> {/* FG Elbow */}
            <circle cx="200" cy="280" r="4" fill="#FFFFFF" /> {/* FG Knee */}
            <circle cx="200" cy="340" r="4" fill="#FFFFFF" /> {/* FG Ankle */}

            {/* Muscle highlights */}
            {highlightedMuscles.includes('quads') && (
              <ellipse cx="205" cy="250" rx="15" ry="25" fill="#14B8A6" opacity="0.5" />
            )}
            {highlightedMuscles.includes('glutes') && (
              <ellipse cx="210" cy="220" rx="18" ry="20" fill="#14B8A6" opacity="0.5" />
            )}
          </>
        );
      case 'goblet-squat-bottom':
        return (
          <>
            {/* Background Leg (Right) */}
            <line x1="225" y1="295" x2="175" y2="280" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="175" y1="280" x2="210" y2="335" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="210" y1="335" x2="180" y2="335" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Background Arm (Right) */}
            <line x1="182" y1="220" x2="165" y2="245" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="165" y1="245" x2="145" y2="210" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Head */}
            <circle cx="156" cy="175" r="25" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Body leaning forward */}
            <line x1="169" y1="197" x2="225" y2="295" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Leg (Left) */}
            <line x1="225" y1="295" x2="165" y2="285" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="165" y1="285" x2="200" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="200" y1="340" x2="170" y2="340" stroke="#FFFFFF" strokeWidth="4" />

            {/* Dumbbell held vertically at chest */}
            <rect x="135" y="190" width="20" height="40" rx="3" fill="#6B7280" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="135" y1="200" x2="155" y2="200" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="135" y1="220" x2="155" y2="220" stroke="#FFFFFF" strokeWidth="2" />

            {/* Foreground Arm (Left) */}
            <line x1="182" y1="220" x2="170" y2="250" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="170" y1="250" x2="145" y2="210" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joints */}
            <circle cx="182" cy="220" r="4" fill="#FFFFFF" /> {/* Shoulders */}
            <circle cx="225" cy="295" r="4" fill="#FFFFFF" /> {/* Hips */}

            <circle cx="165" cy="245" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Elbow */}
            <circle cx="175" cy="280" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Knee */}
            <circle cx="210" cy="335" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Ankle */}

            <circle cx="170" cy="250" r="4" fill="#FFFFFF" /> {/* FG Elbow */}
            <circle cx="165" cy="285" r="4" fill="#FFFFFF" /> {/* FG Knee */}
            <circle cx="200" cy="340" r="4" fill="#FFFFFF" /> {/* FG Ankle */}

            {/* Muscle highlights */}
            {highlightedMuscles.includes('glutes') && (
              <ellipse cx="235" cy="290" rx="20" ry="25" fill="#14B8A6" opacity="0.5" transform="rotate(30 235 290)" />
            )}
            {highlightedMuscles.includes('quads') && (
              <ellipse cx="195" cy="290" rx="30" ry="15" fill="#14B8A6" opacity="0.5" transform="rotate(-15 195 290)" />
            )}
          </>
        );
      case 'dumbbell-row-start':
        return (
          <>
            {/* Background Leg (Right) */}
            <line x1="220" y1="220" x2="240" y2="280" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="240" y1="280" x2="240" y2="340" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="240" y1="340" x2="210" y2="340" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Background Arm (Right) */}
            <line x1="140" y1="180" x2="155" y2="240" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="155" y1="240" x2="155" y2="300" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* BG Dumbbell */}
            <rect x="145" y="280" width="20" height="40" rx="3" fill="#6B7280" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
            <line x1="145" y1="290" x2="165" y2="290" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
            <line x1="145" y1="310" x2="165" y2="310" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />

            {/* Head */}
            <circle cx="110" cy="140" r="25" fill="none" stroke="#FFFFFF" strokeWidth="4" />

            {/* Body */}
            <line x1="140" y1="180" x2="220" y2="220" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Leg (Left) */}
            <line x1="220" y1="220" x2="200" y2="280" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="200" y1="280" x2="200" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="200" y1="340" x2="170" y2="340" stroke="#FFFFFF" strokeWidth="4" />

            {/* FG Dumbbell */}
            <rect x="130" y="280" width="20" height="40" rx="3" fill="#6B7280" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="130" y1="290" x2="150" y2="290" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="130" y1="310" x2="150" y2="310" stroke="#FFFFFF" strokeWidth="2" />

            {/* Foreground Arm (Left) */}
            <line x1="140" y1="180" x2="140" y2="240" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="140" y1="240" x2="140" y2="300" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joints */}
            <circle cx="140" cy="180" r="4" fill="#FFFFFF" /> {/* Shoulders */}
            <circle cx="220" cy="220" r="4" fill="#FFFFFF" /> {/* Hips */}

            <circle cx="155" cy="240" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Elbow */}
            <circle cx="240" cy="280" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Knee */}
            <circle cx="240" cy="340" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Ankle */}

            <circle cx="140" cy="240" r="4" fill="#FFFFFF" /> {/* FG Elbow */}
            <circle cx="200" cy="280" r="4" fill="#FFFFFF" /> {/* FG Knee */}
            <circle cx="200" cy="340" r="4" fill="#FFFFFF" /> {/* FG Ankle */}

            {/* Muscle highlights */}
            {highlightedMuscles.includes('back') && (
              <ellipse cx="180" cy="200" rx="35" ry="15" fill="#14B8A6" opacity="0.5" transform="rotate(26 180 200)" />
            )}
          </>
        );
      case 'dumbbell-row-pulled':
        return (
          <>
            {/* Background Leg (Right) */}
            <line x1="220" y1="220" x2="240" y2="280" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="240" y1="280" x2="240" y2="340" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="240" y1="340" x2="210" y2="340" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Background Arm (Right) */}
            <line x1="140" y1="180" x2="215" y2="130" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="215" y1="130" x2="185" y2="200" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* BG Dumbbell */}
            <rect x="175" y="180" width="20" height="40" rx="3" fill="#6B7280" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
            <line x1="175" y1="190" x2="195" y2="190" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
            <line x1="175" y1="210" x2="195" y2="210" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />

            {/* Head */}
            <circle cx="110" cy="140" r="25" fill="none" stroke="#FFFFFF" strokeWidth="4" />

            {/* Body */}
            <line x1="140" y1="180" x2="220" y2="220" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Leg (Left) */}
            <line x1="220" y1="220" x2="200" y2="280" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="200" y1="280" x2="200" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="200" y1="340" x2="170" y2="340" stroke="#FFFFFF" strokeWidth="4" />

            {/* FG Dumbbell */}
            <rect x="160" y="180" width="20" height="40" rx="3" fill="#6B7280" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="160" y1="190" x2="180" y2="190" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="160" y1="210" x2="180" y2="210" stroke="#FFFFFF" strokeWidth="2" />

            {/* Foreground Arm (Left) */}
            <line x1="140" y1="180" x2="200" y2="130" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="200" y1="130" x2="170" y2="200" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joints */}
            <circle cx="140" cy="180" r="4" fill="#FFFFFF" /> {/* Shoulders */}
            <circle cx="220" cy="220" r="4" fill="#FFFFFF" /> {/* Hips */}

            <circle cx="215" cy="130" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Elbow */}
            <circle cx="240" cy="280" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Knee */}
            <circle cx="240" cy="340" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Ankle */}

            <circle cx="200" cy="130" r="4" fill="#FFFFFF" /> {/* FG Elbow */}
            <circle cx="200" cy="280" r="4" fill="#FFFFFF" /> {/* FG Knee */}
            <circle cx="200" cy="340" r="4" fill="#FFFFFF" /> {/* FG Ankle */}

            {/* Muscle highlights */}
            {highlightedMuscles.includes('back') && (
              <ellipse cx="180" cy="200" rx="35" ry="15" fill="#14B8A6" opacity="0.5" transform="rotate(26 180 200)" />
            )}
          </>
        );
      case 'standing':
        return (
          <>
            {/* Head */}
            <circle cx="200" cy="80" r="25" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            {/* Body */}
            <line x1="200" y1="105" x2="200" y2="220" stroke="#FFFFFF" strokeWidth="4" />
            {/* Arms at sides */}
            <line x1="200" y1="130" x2="170" y2="180" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="200" y1="130" x2="230" y2="180" stroke="#FFFFFF" strokeWidth="4" />
            {/* Legs */}
            <line x1="200" y1="220" x2="180" y2="300" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="180" y1="300" x2="180" y2="340" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="200" y1="220" x2="220" y2="300" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="220" y1="300" x2="220" y2="340" stroke="#FFFFFF" strokeWidth="4" />
          </>
        );
      case 'burpee-stand':
        return (
          <>
            {/* Background Leg (Right) */}
            <line x1="200" y1="180" x2="210" y2="250" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="210" y1="250" x2="210" y2="320" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="210" y1="320" x2="230" y2="320" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Background Arm (Right) */}
            <line x1="200" y1="100" x2="230" y2="140" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="230" y1="140" x2="230" y2="190" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Head */}
            <circle cx="200" cy="60" r="25" fill="none" stroke="#FFFFFF" strokeWidth="4" />

            {/* Body */}
            <line x1="200" y1="85" x2="200" y2="180" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Leg (Left) */}
            <line x1="200" y1="180" x2="190" y2="250" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="190" y1="250" x2="190" y2="320" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="190" y1="320" x2="160" y2="320" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Arm (Left) */}
            <line x1="200" y1="100" x2="170" y2="140" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="170" y1="140" x2="170" y2="190" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joints */}
            <circle cx="200" cy="100" r="4" fill="#FFFFFF" /> {/* Shoulders */}
            <circle cx="200" cy="180" r="4" fill="#FFFFFF" /> {/* Hips */}

            <circle cx="230" cy="140" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Elbow */}
            <circle cx="210" cy="250" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Knee */}
            <circle cx="210" cy="320" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Ankle */}

            <circle cx="170" cy="140" r="4" fill="#FFFFFF" /> {/* FG Elbow */}
            <circle cx="190" cy="250" r="4" fill="#FFFFFF" /> {/* FG Knee */}
            <circle cx="190" cy="320" r="4" fill="#FFFFFF" /> {/* FG Ankle */}

            {/* Muscle Highlights */}
            {highlightedMuscles.includes('quads') && (
              <ellipse cx="190" cy="215" rx="14" ry="25" fill="#14B8A6" opacity="0.5" />
            )}
          </>
        );
      case 'burpee-squat':
        return (
          <>
            {/* Background Leg (Left) */}
            <line x1="230" y1="230" x2="260" y2="280" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="260" y1="280" x2="240" y2="320" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="240" y1="320" x2="220" y2="320" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Background Arm (Left) */}
            <line x1="215" y1="150" x2="200" y2="230" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="200" y1="230" x2="190" y2="320" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Head */}
            <circle cx="205" cy="100" r="25" fill="none" stroke="#FFFFFF" strokeWidth="4" />

            {/* Body */}
            <line x1="210" y1="125" x2="230" y2="230" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Leg (Right) */}
            <line x1="230" y1="230" x2="245" y2="280" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="245" y1="280" x2="225" y2="320" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="225" y1="320" x2="200" y2="320" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Arm (Right) */}
            <line x1="215" y1="150" x2="185" y2="230" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="185" y1="230" x2="170" y2="320" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joints */}
            <circle cx="215" cy="150" r="4" fill="#FFFFFF" /> {/* Shoulders */}
            <circle cx="230" cy="230" r="4" fill="#FFFFFF" /> {/* Hips */}

            <circle cx="200" cy="230" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Elbow */}
            <circle cx="260" cy="280" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Knee */}
            <circle cx="240" cy="320" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Ankle */}

            <circle cx="185" cy="230" r="4" fill="#FFFFFF" /> {/* FG Elbow */}
            <circle cx="245" cy="280" r="4" fill="#FFFFFF" /> {/* FG Knee */}
            <circle cx="225" cy="320" r="4" fill="#FFFFFF" /> {/* FG Ankle */}

            {/* Muscles */}
            {highlightedMuscles.includes('quads') && (
              <ellipse cx="238" cy="255" rx="14" ry="25" fill="#14B8A6" opacity="0.5" transform="rotate(15 238 255)" />
            )}
            {highlightedMuscles.includes('core') && (
              <ellipse cx="220" cy="177" rx="20" ry="12" fill="#14B8A6" opacity="0.5" transform="rotate(105 220 177)" />
            )}
          </>
        );
      case 'burpee-high-plank':
        return (
          <>
            {/* Background Leg */}
            <line x1="230" y1="250" x2="280" y2="280" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="280" y1="280" x2="330" y2="315" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            
            {/* Background Arm */}
            <line x1="140" y1="220" x2="145" y2="270" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="145" y1="270" x2="150" y2="320" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Head */}
            <circle cx="110" cy="210" r="22" fill="none" stroke="#FFFFFF" strokeWidth="4" />

            {/* Body */}
            <line x1="130" y1="220" x2="230" y2="250" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Leg */}
            <line x1="230" y1="250" x2="290" y2="285" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="290" y1="285" x2="350" y2="320" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="350" y1="320" x2="350" y2="310" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Arm */}
            <line x1="130" y1="220" x2="135" y2="270" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="135" y1="270" x2="130" y2="320" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joints */}
            <circle cx="130" cy="220" r="4" fill="#FFFFFF" /> {/* Shoulders */}
            <circle cx="230" cy="250" r="4" fill="#FFFFFF" /> {/* Hips */}

            <circle cx="145" cy="270" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Elbow */}
            <circle cx="280" cy="280" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Knee */}
            <circle cx="330" cy="315" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Ankle */}

            <circle cx="135" cy="270" r="4" fill="#FFFFFF" /> {/* FG Elbow */}
            <circle cx="290" cy="285" r="4" fill="#FFFFFF" /> {/* FG Knee */}
            <circle cx="350" cy="320" r="4" fill="#FFFFFF" /> {/* FG Ankle */}

            {/* Muscles */}
            {highlightedMuscles.includes('core') && (
              <ellipse cx="180" cy="235" rx="35" ry="12" fill="#14B8A6" opacity="0.5" transform="rotate(16 180 235)" />
            )}
            {highlightedMuscles.includes('chest') && (
              <ellipse cx="145" cy="228" rx="16" ry="10" fill="#14B8A6" opacity="0.5" transform="rotate(16 145 228)" />
            )}
          </>
        );
      case 'burpee-low-plank':
        return (
          <>
            {/* Background Leg */}
            <line x1="230" y1="295" x2="280" y2="305" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="280" y1="305" x2="330" y2="315" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            
            {/* Background Arm */}
            <line x1="140" y1="290" x2="155" y2="260" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="155" y1="260" x2="150" y2="320" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Head */}
            <circle cx="110" cy="270" r="22" fill="none" stroke="#FFFFFF" strokeWidth="4" />

            {/* Body */}
            <line x1="130" y1="285" x2="230" y2="295" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Leg */}
            <line x1="230" y1="295" x2="290" y2="305" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="290" y1="305" x2="350" y2="320" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Arm */}
            <line x1="130" y1="285" x2="110" y2="250" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="110" y1="250" x2="130" y2="320" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joints */}
            <circle cx="130" cy="285" r="4" fill="#FFFFFF" /> {/* Shoulders */}
            <circle cx="230" cy="295" r="4" fill="#FFFFFF" /> {/* Hips */}

            <circle cx="155" cy="260" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Elbow */}
            <circle cx="280" cy="305" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Knee */}
            <circle cx="330" cy="315" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Ankle */}

            <circle cx="110" cy="250" r="4" fill="#FFFFFF" /> {/* FG Elbow */}
            <circle cx="290" cy="305" r="4" fill="#FFFFFF" /> {/* FG Knee */}
            <circle cx="350" cy="320" r="4" fill="#FFFFFF" /> {/* FG Ankle */}

            {/* Muscles */}
            {highlightedMuscles.includes('chest') && (
              <ellipse cx="145" cy="288" rx="16" ry="10" fill="#14B8A6" opacity="0.5" transform="rotate(5 145 288)" />
            )}
            {highlightedMuscles.includes('core') && (
              <ellipse cx="180" cy="290" rx="35" ry="10" fill="#14B8A6" opacity="0.5" transform="rotate(5 180 290)" />
            )}
          </>
        );
      case 'burpee-jump':
        return (
          <>
            {/* Motion Lines */}
            <path d="M 180 340 L 180 300 M 220 340 L 220 300 M 200 350 L 200 310" stroke="#6B7280" strokeWidth="3" strokeDasharray="4 4" opacity="0.5" />
            
            {/* Background Leg (Right) */}
            <line x1="200" y1="160" x2="210" y2="220" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="210" y1="220" x2="210" y2="280" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="210" y1="280" x2="230" y2="300" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Background Arm (Right) */}
            <line x1="200" y1="80" x2="240" y2="40" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            <line x1="240" y1="40" x2="250" y2="10" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />

            {/* Head */}
            <circle cx="200" cy="40" r="25" fill="none" stroke="#FFFFFF" strokeWidth="4" />

            {/* Body */}
            <line x1="200" y1="65" x2="200" y2="160" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Leg (Left) */}
            <line x1="200" y1="160" x2="190" y2="220" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="190" y1="220" x2="190" y2="280" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="190" y1="280" x2="170" y2="300" stroke="#FFFFFF" strokeWidth="4" />

            {/* Foreground Arm (Left) */}
            <line x1="200" y1="80" x2="160" y2="40" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="160" y1="40" x2="150" y2="10" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joints */}
            <circle cx="200" cy="80" r="4" fill="#FFFFFF" /> {/* Shoulders */}
            <circle cx="200" cy="160" r="4" fill="#FFFFFF" /> {/* Hips */}

            <circle cx="240" cy="40" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Elbow */}
            <circle cx="210" cy="220" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Knee */}
            <circle cx="210" cy="280" r="4" fill="#FFFFFF" opacity="0.6" /> {/* BG Ankle */}

            <circle cx="160" cy="40" r="4" fill="#FFFFFF" /> {/* FG Elbow */}
            <circle cx="190" cy="220" r="4" fill="#FFFFFF" /> {/* FG Knee */}
            <circle cx="190" cy="280" r="4" fill="#FFFFFF" /> {/* FG Ankle */}

            {/* Muscle Highlights */}
            {highlightedMuscles.includes('calves') && (
              <>
                <ellipse cx="210" cy="250" rx="10" ry="18" fill="#14B8A6" opacity="0.5" />
                <ellipse cx="190" cy="250" rx="10" ry="18" fill="#14B8A6" opacity="0.5" />
              </>
            )}
            {highlightedMuscles.includes('quads') && (
              <ellipse cx="195" cy="190" rx="12" ry="22" fill="#14B8A6" opacity="0.5" />
            )}
          </>
        );
      case 'glute-bridge-start':
        return (
          <>
            {/* Head */}
            <circle cx="100" cy="310" r="20" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            {/* Body (lying flat) */}
            <line x1="120" y1="310" x2="240" y2="310" stroke="#FFFFFF" strokeWidth="4" />
            {/* Arms (resting on floor) */}
            <line x1="140" y1="316" x2="220" y2="316" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            {/* Legs */}
            <line x1="240" y1="310" x2="285" y2="235" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="285" y1="235" x2="320" y2="310" stroke="#FFFFFF" strokeWidth="4" />
            {/* Feet */}
            <line x1="320" y1="310" x2="340" y2="310" stroke="#FFFFFF" strokeWidth="4" />
            {/* Muscle highlights */}
            {highlightedMuscles.includes('glutes') && (
              <circle cx="230" cy="310" r="18" fill="#14B8A6" opacity="0.5" />
            )}
          </>
        );
      case 'glute-bridge-end':
        return (
          <>
            {/* Head */}
            <circle cx="100" cy="310" r="20" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            {/* Upper back on floor */}
            <line x1="120" y1="310" x2="150" y2="310" stroke="#FFFFFF" strokeWidth="4" />
            {/* Lifted Body */}
            <line x1="150" y1="310" x2="225" y2="270" stroke="#FFFFFF" strokeWidth="4" />
            {/* Arms (resting on floor) */}
            <line x1="140" y1="316" x2="220" y2="316" stroke="#FFFFFF" strokeWidth="4" opacity="0.6" />
            {/* Legs */}
            <line x1="225" y1="270" x2="300" y2="230" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="300" y1="230" x2="320" y2="310" stroke="#FFFFFF" strokeWidth="4" />
            {/* Feet */}
            <line x1="320" y1="310" x2="340" y2="310" stroke="#FFFFFF" strokeWidth="4" />
            {/* Muscle highlights */}
            {highlightedMuscles.includes('glutes') && (
              <circle cx="225" cy="270" r="18" fill="#14B8A6" opacity="0.8" />
            )}
          </>
        );
      case 'mountain-climber-start':
        return (
          <>
            {/* Background Leg (Right) */}
            <line x1="255" y1="235" x2="340" y2="300" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="340" y1="300" x2="350" y2="315" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Background Arm (Right) */}
            <line x1="160" y1="155" x2="160" y2="315" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Head */}
            <circle cx="120" cy="134" r="22" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Body */}
            <line x1="150" y1="160" x2="245" y2="240" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Foreground Leg (Left) */}
            <line x1="245" y1="240" x2="330" y2="305" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="330" y1="305" x2="340" y2="320" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Foreground Arm (Left) */}
            <line x1="150" y1="160" x2="150" y2="320" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joint markers */}
            <circle cx="160" cy="155" r="4" fill="#FFFFFF" />
            <circle cx="340" cy="300" r="4" fill="#FFFFFF" />
            
            <circle cx="150" cy="160" r="4" fill="#FFFFFF" />
            <circle cx="150" cy="240" r="4" fill="#FFFFFF" />
            <circle cx="150" cy="320" r="4" fill="#FFFFFF" />
            
            <circle cx="245" cy="240" r="4" fill="#FFFFFF" />
            <circle cx="330" cy="305" r="4" fill="#FFFFFF" />

            {/* Muscle highlights */}
            {highlightedMuscles.includes('core') && (
              <ellipse cx="197" cy="200" rx="25" ry="12" fill="#14B8A6" opacity="0.5" transform="rotate(40 197 200)" />
            )}
            {highlightedMuscles.includes('shoulders') && (
              <circle cx="150" cy="160" r="18" fill="#14B8A6" opacity="0.5" />
            )}
          </>
        );
      case 'mountain-climber-end':
        return (
          <>
            {/* Background Leg (Right) - Extended */}
            <line x1="255" y1="235" x2="340" y2="300" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="340" y1="300" x2="350" y2="315" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Background Arm (Right) */}
            <line x1="160" y1="155" x2="160" y2="315" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Head */}
            <circle cx="120" cy="134" r="22" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Body */}
            <line x1="150" y1="160" x2="245" y2="240" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Foreground Leg (Left) - Knee Driven Forward */}
            <line x1="245" y1="240" x2="185" y2="235" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="185" y1="235" x2="215" y2="295" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="215" y1="295" x2="205" y2="305" stroke="#FFFFFF" strokeWidth="4" />
            
            {/* Foreground Arm (Left) */}
            <line x1="150" y1="160" x2="150" y2="320" stroke="#FFFFFF" strokeWidth="4" />

            {/* Joint markers */}
            <circle cx="160" cy="155" r="4" fill="#FFFFFF" />
            <circle cx="340" cy="300" r="4" fill="#FFFFFF" />
            
            <circle cx="150" cy="160" r="4" fill="#FFFFFF" />
            <circle cx="150" cy="320" r="4" fill="#FFFFFF" />
            
            {/* Left Leg Joints */}
            <circle cx="245" cy="240" r="4" fill="#FFFFFF" />
            <circle cx="185" cy="235" r="4" fill="#FFFFFF" />
            <circle cx="215" cy="295" r="4" fill="#FFFFFF" />

            {/* Muscle highlights */}
            {highlightedMuscles.includes('core') && (
              <ellipse cx="197" cy="200" rx="25" ry="12" fill="#14B8A6" opacity="0.5" transform="rotate(40 197 200)" />
            )}
            {highlightedMuscles.includes('shoulders') && (
              <circle cx="150" cy="160" r="18" fill="#14B8A6" opacity="0.5" />
            )}
            {highlightedMuscles.includes('hip-flexors') && (
              <ellipse cx="215" cy="237" rx="16" ry="10" fill="#14B8A6" opacity="0.5" transform="rotate(-5 215 237)" />
            )}
          </>
        );
      default:
        return (
          <>
            {/* Generic standing figure */}
            <circle cx="200" cy="100" r="30" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="200" y1="130" x2="200" y2="250" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="200" y1="160" x2="150" y2="210" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="200" y1="160" x2="250" y2="210" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="200" y1="250" x2="170" y2="320" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="170" y1="320" x2="170" y2="370" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="200" y1="250" x2="230" y2="320" stroke="#FFFFFF" strokeWidth="4" />
            <line x1="230" y1="320" x2="230" y2="370" stroke="#FFFFFF" strokeWidth="4" />
          </>
        );
    }
  };

  return (
    <svg viewBox="0 0 400 400" className="w-full h-auto max-w-xs mx-auto">
      {renderFigure()}
    </svg>
  );
}
