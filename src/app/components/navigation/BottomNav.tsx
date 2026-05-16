import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Dumbbell, Heart, Rocket, Flame } from 'lucide-react';
import { motion } from 'motion/react';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/browse';
    }
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 z-50">
      <div className="max-w-2xl mx-auto px-6 py-3 flex justify-around">
        {/* Workout Tab */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/', { replace: true, state: { resetToStep1: true } })}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
            isActive('/')
              ? 'text-teal-400'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <Dumbbell className={`w-6 h-6 ${isActive('/') ? 'fill-teal-400' : ''}`} />
          <span className="text-xs font-semibold">Workout</span>
        </motion.button>

        {/* Vault Tab */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/vault')}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
            isActive('/vault')
              ? 'text-teal-400'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <Heart className={`w-6 h-6 ${isActive('/vault') ? 'fill-teal-400' : ''}`} />
          <span className="text-xs font-semibold">Vault</span>
        </motion.button>

        {/* Streak Tab */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/streak')}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
            isActive('/streak')
              ? 'text-amber-400'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <Flame className={`w-6 h-6 ${isActive('/streak') ? 'fill-amber-400 text-amber-400' : ''}`} />
          <span className="text-xs font-semibold">Streak</span>
        </motion.button>

        {/* Upcoming Tab */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/upcoming')}
          className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
            isActive('/upcoming')
              ? 'text-teal-400'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <Rocket className={`w-6 h-6 ${isActive('/upcoming') ? 'fill-teal-400' : ''}`} />
          <span className="text-xs font-semibold">Upcoming</span>
        </motion.button>
      </div>
    </div>
  );
}