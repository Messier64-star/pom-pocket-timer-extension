
import React from 'react';
import { useTimer } from '@/hooks/useTimer';
import TimerDisplay from '@/components/TimerDisplay';
import TimerControls from '@/components/TimerControls';
import TimerSettings from '@/components/TimerSettings';

const Index = () => {
  const {
    time,
    isRunning,
    mode,
    sessions,
    workDuration,
    breakDuration,
    start,
    pause,
    reset,
    setWorkDuration,
    setBreakDuration,
  } = useTimer();

  const totalTime = mode === 'work' ? workDuration * 60 : breakDuration * 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Pomodoro Timer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Boost your productivity with the proven Pomodoro Technique. 
            Work in focused 25-minute intervals, then take a well-deserved break.
          </p>
        </div>

        {/* Timer Section */}
        <div className="max-w-4xl mx-auto">
          <TimerDisplay 
            time={time} 
            mode={mode} 
            totalTime={totalTime}
          />
          
          <TimerControls
            isRunning={isRunning}
            onStart={start}
            onPause={pause}
            onReset={reset}
          />

          {/* Settings Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Customize Your Timer
            </h2>
            <TimerSettings
              workDuration={workDuration}
              breakDuration={breakDuration}
              onWorkDurationChange={setWorkDuration}
              onBreakDurationChange={setBreakDuration}
              sessions={sessions}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-gray-500">
          <p className="text-sm">
            The Pomodoro Technique® was created by Francesco Cirillo
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
