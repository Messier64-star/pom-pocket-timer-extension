
import React from 'react';
import { TimerMode } from '@/hooks/useTimer';

interface TimerDisplayProps {
  time: number;
  mode: TimerMode;
  totalTime: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time, mode, totalTime }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const progress = ((totalTime - time) / totalTime) * 100;

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="relative flex flex-col items-center justify-center mb-8">
      {/* Circular Progress */}
      <div className="relative w-80 h-80">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
            className={`transition-all duration-1000 ease-in-out ${
              mode === 'work' 
                ? 'text-blue-500' 
                : 'text-green-500'
            }`}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Timer Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-6xl font-bold text-gray-800 mb-2">
            {formatTime(minutes)}:{formatTime(seconds)}
          </div>
          <div className={`text-xl font-medium capitalize ${
            mode === 'work' ? 'text-blue-600' : 'text-green-600'
          }`}>
            {mode} Time
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
