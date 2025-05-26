
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Clock, Coffee } from 'lucide-react';

interface TimerSettingsProps {
  workDuration: number;
  breakDuration: number;
  onWorkDurationChange: (duration: number) => void;
  onBreakDurationChange: (duration: number) => void;
  sessions: number;
}

const TimerSettings: React.FC<TimerSettingsProps> = ({
  workDuration,
  breakDuration,
  onWorkDurationChange,
  onBreakDurationChange,
  sessions,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
      <Card className="border-2 hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <Clock className="w-5 h-5" />
            Work Duration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium">Minutes</Label>
              <span className="text-2xl font-bold text-blue-600">{workDuration}</span>
            </div>
            <Slider
              value={[workDuration]}
              onValueChange={(value) => onWorkDurationChange(value[0])}
              max={60}
              min={5}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>5 min</span>
              <span>60 min</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-green-600">
            <Coffee className="w-5 h-5" />
            Break Duration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium">Minutes</Label>
              <span className="text-2xl font-bold text-green-600">{breakDuration}</span>
            </div>
            <Slider
              value={[breakDuration]}
              onValueChange={(value) => onBreakDurationChange(value[0])}
              max={30}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1 min</span>
              <span>30 min</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 md:col-span-2">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-purple-600">
            <div className="w-5 h-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">
              #
            </div>
            Sessions Completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">{sessions}</div>
            <div className="text-sm text-gray-600">
              {sessions === 0 && "Start your first session!"}
              {sessions === 1 && "Great start! Keep going!"}
              {sessions >= 2 && sessions < 4 && "You're building momentum!"}
              {sessions >= 4 && "Excellent productivity!"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimerSettings;
