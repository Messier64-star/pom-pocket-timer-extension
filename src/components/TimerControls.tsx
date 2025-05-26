
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <Button
        onClick={isRunning ? onPause : onStart}
        size="lg"
        className={`px-8 py-4 text-lg font-semibold transition-all duration-200 ${
          isRunning
            ? 'bg-orange-500 hover:bg-orange-600 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        {isRunning ? (
          <>
            <Pause className="w-5 h-5 mr-2" />
            Pause
          </>
        ) : (
          <>
            <Play className="w-5 h-5 mr-2" />
            Start
          </>
        )}
      </Button>
      
      <Button
        onClick={onReset}
        variant="outline"
        size="lg"
        className="px-6 py-4 text-lg font-semibold border-2 hover:bg-gray-50"
      >
        <RotateCcw className="w-5 h-5 mr-2" />
        Reset
      </Button>
    </div>
  );
};

export default TimerControls;
