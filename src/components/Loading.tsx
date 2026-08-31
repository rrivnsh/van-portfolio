import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface LoadingProps {
  onLoadingComplete: () => void;
}

export const Loading = ({ onLoadingComplete }: LoadingProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1500; // 1.5s smooth load
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const easeProgress = Math.min(
        Math.round((1 - Math.pow(1 - currentStep / steps, 3)) * 100),
        100
      );
      setProgress(easeProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onLoadingComplete();
        }, 150);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      key="splash-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex flex-col justify-between p-8 sm:p-12 md:p-16 bg-[#080808] text-white selection:bg-white selection:text-black pointer-events-auto"
    >
      {/* Top Status */}
      <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
        <span className="tracking-widest uppercase">M. Rivan Sahronie</span>
        <span className="tracking-widest uppercase">Bandung, ID</span>
      </div>

      {/* Center Brand Identity */}
      <div className="max-w-2xl space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-2"
        >
          <span className="text-xs font-mono tracking-[0.2em] text-zinc-400 uppercase block">
            Portfolio / 2026
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Muhamad Rivan Sahronie
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-sm md:text-base text-zinc-400 font-normal max-w-lg"
        >
          Transforming complex challenges into clean, structured digital solutions.
        </motion.p>
      </div>

      {/* Bottom Progress Bar & Counter */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono text-xs sm:text-sm text-zinc-400">
          <span className="tracking-wider">INITIALIZING SYSTEM</span>
          <span className="text-white font-bold tracking-widest">
            {String(progress).padStart(3, "0")}%
          </span>
        </div>

        {/* Precision Loading Track */}
        <div className="w-full h-[2px] bg-zinc-800 overflow-hidden relative rounded-full">
          <div
            className="h-full bg-white transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};
