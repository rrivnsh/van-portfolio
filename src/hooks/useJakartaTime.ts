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
    // 10s polling interval is sufficient for minute-level clock updates
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
