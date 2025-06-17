// src/components/CountdownCircle.tsx
import React, { useEffect, useState } from 'react';

interface CountdownCircleProps {
  duration: number;
  onComplete: () => void;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

const CountdownCircle: React.FC<CountdownCircleProps> = ({
  duration,
  onComplete,
  size = 24,
  strokeWidth = 3,
  className = 'text-blue-500',
}) => {
  const [timeLeft, setTimeLeft] = useState(duration * 1000);

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
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  const progress = timeLeft / (duration * 1000);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);
  const secondsLeft = Math.ceil(timeLeft / 1000);

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
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        className="text-white text-xs font-medium"
        fill="currentColor"
      >
        {secondsLeft}
      </text>
    </svg>
  );
};

export default CountdownCircle;
