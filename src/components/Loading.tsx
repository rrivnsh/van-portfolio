import { useEffect, useState } from "react";

export const Loading = ({
  onLoadingComplete,
}: {
  onLoadingComplete: () => void;
}) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsExiting(true), 500);
          setTimeout(onLoadingComplete, 1300);
          return 100;
        }
        return prev + 1.2;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-(--color-bg) transition-all duration-1000 ease-[0.76,0,0.24,1] ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Micro-Grid (Subtle) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-fg) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-7xl px-12 flex flex-col items-center">
        {/* Main Brand */}
        <div className="relative overflow-hidden mb-8">
          <h1
            className={`text-[12vw] lg:text-[10rem] font-extralight tracking-tighter text-(--color-fg) leading-none transition-all duration-1000 ${
              progress > 10
                ? "translate-y-0 opacity-100 blur-0"
                : "translate-y-20 opacity-0 blur-xl"
            }`}
          >
            @rrivnsh
          </h1>

          {/* Accent Line overlapping the text */}
          <div
            className="absolute bottom-0 left-0 h-px bg-(--color-fg) transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subtitle / Status */}
        <div className="flex justify-between w-full max-w-40 mt-4">
          <span className="text-[0.6rem] font-bold tracking-[0.4em] uppercase text-(--color-subtle) animate-pulse">
            Loading
          </span>
          <span className="text-[0.6rem] font-mono text-(--color-fg)">
            {Math.floor(progress).toString().padStart(3, "0")}%
          </span>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-12 left-12 w-4 h-4 border-t border-l border-(--color-border)/20" />
      <div className="absolute top-12 right-12 w-4 h-4 border-t border-r border-(--color-border)/20" />
      <div className="absolute bottom-12 left-12 w-4 h-4 border-b border-l border-(--color-border)/20" />
      <div className="absolute bottom-12 right-12 w-4 h-4 border-b border-r border-(--color-border)/20" />
    </div>
  );
};
