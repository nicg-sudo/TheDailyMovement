import React from 'react';
import { motion } from 'motion/react';

export function HeroIllustration() {
  return (
    <div className="relative w-full h-64 sm:h-80 flex items-center justify-center mb-8">
      {/* Background circle pattern - more prominent */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border-2 border-teal-500/60"></div>
        <div className="absolute w-48 h-48 sm:w-60 sm:h-60 rounded-full border-2 border-teal-500/40"></div>
        <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-emerald-500/50"></div>
      </div>

      <svg viewBox="0 0 400 300" className="w-full h-full max-w-md relative z-10">
        {/* Floating geometric shapes - more pronounced */}
        <motion.rect
          x="60"
          y="40"
          width="18"
          height="18"
          fill="#14B8A6"
          opacity="0.9"
          animate={{
            y: [40, 25, 40],
            rotate: [0, 15, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.rect
          x="340"
          y="60"
          width="22"
          height="22"
          fill="#F59E0B"
          opacity="0.9"
          rx="2"
          transform="rotate(45 351 71)"
          animate={{
            y: [60, 45, 60],
            rotate: [45, 65, 45],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.circle
          cx="90"
          cy="200"
          r="10"
          fill="#10B981"
          opacity="0.85"
          animate={{
            cy: [200, 185, 200],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.rect
          x="320"
          y="180"
          width="16"
          height="16"
          fill="#6EE7B7"
          opacity="0.85"
          animate={{
            y: [180, 165, 180],
            rotate: [0, 10, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Stick figure in athletic stance */}
        <motion.g
          animate={{
            scale: [1, 1.02, 1],
            y: [0, -2, 0]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "200px 170px" }}
        >
          {/* Head */}
          <circle cx="200" cy="80" r="20" fill="#14B8A6" stroke="#0D9488" strokeWidth="2" />

          {/* Body */}
          <line x1="200" y1="100" x2="200" y2="180" stroke="#14B8A6" strokeWidth="6" strokeLinecap="round" />

          {/* Arms - athletic position with more movement */}
          <motion.g
            animate={{
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ transformOrigin: "200px 115px" }}
          >
            {/* Left arm */}
            <motion.line
              x1="200"
              y1="115"
              x2="165"
              y2="125"
              stroke="#14B8A6"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{
                x2: [165, 160, 165],
                y2: [125, 120, 125]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <line x1="165" y1="125" x2="150" y2="160" stroke="#14B8A6" strokeWidth="5" strokeLinecap="round" />
            <circle cx="165" cy="125" r="4" fill="#0D9488" />

            {/* Right arm */}
            <motion.line
              x1="200"
              y1="115"
              x2="235"
              y2="125"
              stroke="#14B8A6"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{
                x2: [235, 240, 235],
                y2: [125, 120, 125]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            <line x1="235" y1="125" x2="250" y2="160" stroke="#14B8A6" strokeWidth="5" strokeLinecap="round" />
            <circle cx="235" cy="125" r="4" fill="#0D9488" />
          </motion.g>

          {/* Hips */}
          <circle cx="200" cy="180" r="5" fill="#0D9488" />

          {/* Legs - standing strong */}
          {/* Left leg */}
          <line x1="200" y1="180" x2="180" y2="230" stroke="#10B981" strokeWidth="6" strokeLinecap="round" />
          <line x1="180" y1="230" x2="175" y2="260" stroke="#10B981" strokeWidth="6" strokeLinecap="round" />
          <circle cx="180" cy="230" r="4" fill="#059669" />

          {/* Right leg */}
          <line x1="200" y1="180" x2="220" y2="230" stroke="#10B981" strokeWidth="6" strokeLinecap="round" />
          <line x1="220" y1="230" x2="225" y2="260" stroke="#10B981" strokeWidth="6" strokeLinecap="round" />
          <circle cx="220" cy="230" r="4" fill="#059669" />

          {/* Feet */}
          <ellipse cx="175" cy="263" rx="8" ry="3" fill="#059669" />
          <ellipse cx="225" cy="263" rx="8" ry="3" fill="#059669" />
        </motion.g>

        {/* Muscle group labels with dotted lines - animated */}
        {/* Core label */}
        <motion.g
          opacity="0.9"
          animate={{
            y: [0, -3, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }}
          style={{ transformOrigin: "104px 120px" }}
        >
          <line x1="200" y1="140" x2="130" y2="120" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3,3" />
          <rect x="80" y="110" width="48" height="20" rx="10" fill="#F59E0B" />
          <text x="104" y="124" fontSize="11" fontWeight="bold" fill="#1F2937" textAnchor="middle">Core</text>
        </motion.g>

        {/* Legs label */}
        <motion.g
          opacity="0.9"
          animate={{
            y: [0, -3, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
          style={{ transformOrigin: "322px 205px" }}
        >
          <line x1="200" y1="205" x2="280" y2="205" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3" />
          <rect x="282" y="195" width="100" height="20" rx="10" fill="#10B981" />
          <text x="332" y="209" fontSize="11" fontWeight="bold" fill="#1F2937" textAnchor="middle">Quads + glutes</text>
        </motion.g>
      </svg>
    </div>
  );
}
