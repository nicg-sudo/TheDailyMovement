import React from "react";
import { useNavigate } from "react-router";
import { Heart } from "lucide-react";
import { motion } from "motion/react";
import { useSavedWorkouts } from "../../../contexts/SavedWorkoutsContext";
import workoutsData from "../../../data/workouts.json";
import { Workout } from "../../../types";

export function VaultScreen() {
  const navigate = useNavigate();
  const { savedWorkoutIds, toggleSaveWorkout } =
    useSavedWorkouts();

  const workouts = workoutsData as Workout[];

  // Get saved workouts and sort by duration
  const savedWorkouts = workouts
    .filter((w) => savedWorkoutIds.includes(w.id))
    .sort((a, b) => a.duration - b.duration);

  const handleUnsave = (
    e: React.MouseEvent,
    workoutId: string,
  ) => {
    e.stopPropagation();
    toggleSaveWorkout(workoutId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pb-20 relative overflow-hidden">
      {/* Decorative background elements - same as landing page */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-amber-500/30 rounded-full blur-3xl"></div>

      <div className="max-w-3xl mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-lg">
            Vault
          </h1>
          <p className="text-lg font-semibold text-teal-300">
            Your saved workout shows up in this Vault. Smashing
            that functional fitness!🏋️❤️
          </p>
        </motion.div>

        {/* Results count or empty state */}
        {savedWorkouts.length > 0 ? (
          <>
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="h-1 flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
                <p className="text-lg font-black text-white">
                  {savedWorkouts.length}{" "}
                  {savedWorkouts.length === 1
                    ? "Workout"
                    : "Workouts"}{" "}
                  Saved
                </p>
                <div className="h-1 flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
              </div>
            </div>

            {/* Workout Cards */}
            <div className="grid gap-5 sm:grid-cols-2 pb-8">
              {savedWorkouts.map((workout, index) => (
                <motion.div
                  key={workout.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ y: -4 }}
                  onClick={() =>
                    navigate(`/workout/${workout.id}`, { state: { from: 'vault' } })
                  }
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer border border-gray-700 hover:border-teal-500/50 relative overflow-hidden group"
                >
                  {/* Decorative gradient overlay */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform"></div>

                  {/* Heart icon - saved */}
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleUnsave(e, workout.id)}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-gray-700/50 transition-all"
                  >
                    <Heart className="w-5 h-5 text-teal-400 fill-teal-400" />
                  </motion.button>

                  <div className="relative z-10">
                    <h3 className="font-black text-xl text-white mb-2 pr-8">
                      {workout.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                      {workout.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-md">
                        ⏱️ {workout.duration} min
                      </span>
                      <span
                        className={`px-3 py-1.5 text-xs font-bold rounded-full shadow-md ${
                          workout.intensity === "Easy"
                            ? "bg-green-100 text-green-700"
                            : workout.intensity === "Moderate"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        🔥 {workout.intensity}
                      </span>
                      {workout.equipment.filter(
                        (e) => e !== "Nothing",
                      ).length > 0 && (
                        <span className="px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-full shadow-md">
                          🏋️{" "}
                          {workout.equipment
                            .filter((e) => e !== "Nothing")
                            .join(", ")}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-12 text-center shadow-xl border border-gray-700"
          >
            <div className="text-6xl mb-4">💪</div>
            <p className="text-gray-300 font-semibold text-lg">
              Your saved workout shows up in this Vault. Browse
              and save your favorite workouts, your body will
              thank you tomorrow!🏋️❤️
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}