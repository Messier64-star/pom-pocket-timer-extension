
import { useState, useEffect, useRef } from 'react';

export type TimerMode = 'work' | 'break';

interface UseTimerReturn {
  time: number;
  isRunning: boolean;
  mode: TimerMode;
  sessions: number;
  workDuration: number;
  breakDuration: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setWorkDuration: (duration: number) => void;
  setBreakDuration: (duration: number) => void;
}

export const useTimer = (): UseTimerReturn => {
  const [workDuration, setWorkDurationState] = useState(25); // minutes
  const [breakDuration, setBreakDurationState] = useState(5); // minutes
  const [time, setTime] = useState(25 * 60); // seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            // Timer finished
            setIsRunning(false);
            if (mode === 'work') {
              setSessions(prev => prev + 1);
              setMode('break');
              setTime(breakDuration * 60);
              // Send notification
              if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Pomodoro Timer', {
                  body: 'Work session complete! Time for a break.',
                  icon: '/favicon.ico'
                });
              }
            } else {
              setMode('work');
              setTime(workDuration * 60);
              // Send notification
              if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Pomodoro Timer', {
                  body: 'Break time over! Ready for another work session?',
                  icon: '/favicon.ico'
                });
              }
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, time, mode, workDuration, breakDuration]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const start = () => {
    setIsRunning(true);
  };

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setMode('work');
    setTime(workDuration * 60);
    setSessions(0);
  };

  const setWorkDuration = (duration: number) => {
    setWorkDurationState(duration);
    if (mode === 'work' && !isRunning) {
      setTime(duration * 60);
    }
  };

  const setBreakDuration = (duration: number) => {
    setBreakDurationState(duration);
    if (mode === 'break' && !isRunning) {
      setTime(duration * 60);
    }
  };

  return {
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
  };
};
