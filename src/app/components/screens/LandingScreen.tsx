import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Equipment } from "../../../types";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "motion/react";
import { HeroIllustration } from "../illustrations/HeroIllustration";
import { ArrowLeft } from "lucide-react";

export function LandingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedTime, setSelectedTime] = useState<
    number | null
  >(null);
  const [selectedEquipment, setSelectedEquipment] = useState<
    Equipment[]
  >(["Nothing"]);

  // Reset to step 1 when navigating to home screen (e.g., from bottom nav)
  useEffect(() => {
    const state = location.state as { resetToStep1?: boolean } | null;
    if (state?.resetToStep1) {
      setStep(1);
      // Clear the state flag to prevent repeated resets
      navigate('/', { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const timeOptions = [10, 15, 20, 30];
  const equipmentOptions: Equipment[] = [
    "Nothing",
    "Chair",
    "Stairs",
    "Dumbbells",
  ];

  const handleEquipmentSelect = (equipment: Equipment) => {
    if (equipment === "Nothing") {
      setSelectedEquipment(["Nothing"]);
    } else {
      const filtered = selectedEquipment.filter(
        (e) => e !== "Nothing",
      );
      if (selectedEquipment.includes(equipment)) {
        const newSelection = filtered.filter(
          (e) => e !== equipment,
        );
        setSelectedEquipment(
          newSelection.length === 0
            ? ["Nothing"]
            : newSelection,
        );
      } else {
        setSelectedEquipment([...filtered, equipment]);
      }
    }
  };

  const handleShowWorkouts = () => {
    navigate("/browse", {
      state: {
        time: selectedTime,
        equipment: selectedEquipment,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 px-6 py-8 pb-24 flex flex-col relative overflow-hidden">
      {/* Decorative background elements - brighter and more prominent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-amber-500/30 rounded-full blur-3xl"></div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          // PAGE 1: Welcome/Hero Screen
          <motion.div
            key="page1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto w-full relative z-10 flex flex-col justify-center flex-1"
          >
            {/* Header - Title and Tagline */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1, type: "spring" }}
              >
                <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-lg leading-tight">
                  The Daily<br className="sm:hidden" /> Movement
                </h1>
                <p className="text-xl sm:text-2xl font-semibold text-teal-400 tracking-wide">
                  Low Stakes, High Reward
                </p>
              </motion.div>
            </div>

            {/* Hero Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1.1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                scale: {
                  type: "spring",
                  stiffness: 100,
                  damping: 10
                }
              }}
              className="mb-12"
            >
              <HeroIllustration />
            </motion.div>

            {/* Motivational Text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center text-base sm:text-lg font-semibold text-gray-200 mb-6 px-4"
            >
              No equipment needed, fitness never got simpler! Let's get moving and smash that functional fitness! 🏋️❤️
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => setStep(2)}
                className="w-full h-16 text-xl font-black rounded-2xl shadow-2xl transition-all hover:shadow-3xl"
                style={{
                  background: "linear-gradient(135deg, #14B8A6 0%, #10B981 100%)",
                  color: "#fff",
                }}
              >
                💪 Let's Get Moving
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          // PAGE 2: Setup/Selection Screen
          <motion.div
            key="page2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto w-full relative z-10"
          >
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setStep(1)}
              className="mb-2 p-2 hover:bg-gray-800 rounded-lg transition-colors inline-flex items-center gap-2 text-gray-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            {/* Header - Title and Tagline */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight drop-shadow-lg leading-tight">
                  The Daily Movement
                </h1>
                <p className="text-base sm:text-lg font-semibold text-teal-400 tracking-wide">
                  Low Stakes, High Reward
                </p>
              </motion.div>
            </div>

            {/* Time Selection */}
            <div className="mb-10">
              <label className="block text-xl font-bold text-white mb-5 drop-shadow">
                ⚡ How much time do you have?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {timeOptions.map((time) => (
                  <motion.button
                    key={time}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedTime(time)}
                    className={`
                      px-6 py-3 sm:py-5 rounded-2xl text-lg font-bold transition-all shadow-lg
                      ${
                        selectedTime === time
                          ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-2xl ring-4 ring-teal-500/50"
                          : "bg-gray-800/80 backdrop-blur-sm text-gray-300 border-2 border-gray-700 hover:bg-gray-700/80 hover:border-teal-500/50"
                      }
                    `}
                  >
                    {time} min
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Equipment Selection */}
            <div className="mb-12">
              <label className="block text-xl font-bold text-white mb-5 drop-shadow">
                🏋️ What do you have nearby?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {equipmentOptions.map((equipment) => (
                  <motion.button
                    key={equipment}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleEquipmentSelect(equipment)}
                    className={`
                      px-6 py-3 sm:py-5 rounded-2xl text-base font-bold transition-all shadow-lg
                      ${
                        selectedEquipment.includes(equipment)
                          ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-2xl ring-4 ring-teal-500/50"
                          : "bg-gray-800/80 backdrop-blur-sm text-gray-300 border-2 border-gray-700 hover:bg-gray-700/80 hover:border-teal-500/50"
                      }
                    `}
                  >
                    {equipment}
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center text-base sm:text-lg font-semibold text-gray-200 mb-6 px-4"
            >
              No equipment needed, fitness never got simpler! Let's get moving and smash that functional fitness! 🏋️❤️
            </motion.p>

            {/* CTA Button */}
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleShowWorkouts}
                disabled={selectedTime === null}
                className="w-full h-16 text-xl font-black rounded-2xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-3xl"
                style={{
                  background: selectedTime
                    ? "linear-gradient(135deg, #14B8A6 0%, #10B981 100%)"
                    : "rgba(55, 65, 81, 0.6)",
                  color: "#fff",
                }}
              >
                {selectedTime
                  ? "🚀 Show Workouts"
                  : "Select Time to Continue"}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}