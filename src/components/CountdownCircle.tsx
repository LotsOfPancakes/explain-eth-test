// src/components/CountdownCircle.tsx
import React, { useEffect, useState } from 'react';

interface CountdownCircleProps {
  duration: number; // in seconds
  onComplete: () => void;
  size?: number; // SVG size in pixels
  strokeWidth?: number; // Stroke width in pixels
  className?: string; // For stroke color
}

const CountdownCircle: React.FC<CountdownCircleProps> = ({
  duration,
  onComplete,
  size = 24,
  strokeWidth = 3,
  className = 'text-blue-400',
}) => {
  const [timeLeft, setTimeLeft] = useState(duration * 1000); // in milliseconds

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(duration * 1000 - elapsed, 0);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        onComplete();
      }
    }, 50); // Update every 50ms for smooth animation

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  const progress = timeLeft / (duration * 1000); // 1 to 0
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress); // Animate from 0 to circumference

  return (
    <svg width={size} height={size} className={`inline-block ${className}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        className="text-gray-600"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className={className}
        style={{ transition: 'stroke-dashoffset 0.05s linear' }}
      />
    </svg>
  );
};

export default CountdownCircle;
