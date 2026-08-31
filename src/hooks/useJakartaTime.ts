// provides current time in jakarta timezone
import { useEffect, useState } from "react";

export function useJakartaTime(): string {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Jakarta",
        }),
      );
    };
    updateTime();
    // ponytail: 10s interval is accurate for minute display without 60 renders/min
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
