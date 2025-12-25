import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
}

export const Timer = ({ initialSeconds, onTimeUp }: TimerProps) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, onTimeUp]);

  const isRunningLow = secondsLeft <= 60; // Highlight when 1 minute is left

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div
      className={cn(
        "text-2xl font-bold",
        isRunningLow ? "text-red-500 animate-pulse" : "text-primary",
      )}
    >
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
};
