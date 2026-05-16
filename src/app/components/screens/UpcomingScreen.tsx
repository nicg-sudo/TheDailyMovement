import React from "react";
import { Trophy, Navigation, Settings } from "lucide-react";
import { motion } from "motion/react";

export function UpcomingScreen() {
  const upcomingFeatures = [
    {
      icon: Trophy,
      emoji: "🏆",
      name: "Leaderboards",
      description:
        "Compete with friends and the community. See where you rank and push yourself to the top!",
    },
    {
      icon: Navigation,
      emoji: "🏃‍♂️",
      name: "Run-based workouts",
      description:
        "Hit the pavement with guided running workouts. From sprints to long-distance, we've got you covered!",
    },
    {
      icon: Settings,
      emoji: "🛠️",
      name: "Customised workouts",
      description:
        "Pick your movements and time intervals. Build your personal workouts! ",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pb-20">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-3xl mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
            Upcoming...
          </h1>
          <p className="text-lg font-semibold text-teal-300">
            Stay tuned for upcoming new features for The Daily
            Movement 👀🚀
          </p>
        </motion.div>

        {/* Features List */}
        <div className="space-y-6 pb-8">
          {upcomingFeatures.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700 relative overflow-hidden group"
            >
              {/* Decorative gradient overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-amber-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform"></div>

              <div className="relative z-10 flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">
                      {feature.emoji}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-black text-xl text-white mb-2">
                    {feature.name}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl border border-gray-700"
        >
          <div className="text-4xl mb-3">✨</div>
          <p className="text-gray-300 font-semibold">
            More exciting features coming soon. Keep crushing
            your workouts!
          </p>
        </motion.div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-500 italic leading-relaxed">
            This website is created for learning purposes only.
            The information provided here should not be
            considered professional advice. While we strive for
            accuracy, we make no guarantees regarding the
            completeness or reliability of the content. Any
            actions you take based on this information are at
            your own risk. We are not liable for any losses or
            damages incurred from the use of this website.
          </p>
        </div>
      </div>
    </div>
  );
}