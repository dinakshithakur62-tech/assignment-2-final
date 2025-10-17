'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, Save, Check } from 'lucide-react';
import { setCookie } from '@/lib/cookies';

export const dynamic = 'force-dynamic';

interface Stage {
  id: number;
  title: string;
  description: string;
  initialCode: string;
  validate: (code: string) => boolean;
  hint: string;
}

const stages: Stage[] = [
  {
    id: 1,
    title: 'Stage 1: Format Code Correctly',
    description: 'Fix the indentation and syntax of this JavaScript code',
    initialCode: `function greet(name){
if(name){
return "Hello, "+name+"!"
}
return "Hello!"
}`,
    validate: (code: string) => {
      const hasProperIndentation = code.includes('  ') || code.includes('\t');
      const hasSemicolons = (code.match(/;/g) || []).length >= 2;
      const hasProperSpacing = code.includes('if (') || code.includes('if(');
      return hasProperIndentation && hasSemicolons;
    },
    hint: 'Add proper indentation, semicolons, and spacing around operators'
  },
  {
    id: 2,
    title: 'Stage 2: Debug the Code',
    description: 'Find and fix the bug in this function',
    initialCode: `function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i <= arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}`,
    validate: (code: string) => {
      const hasCorrectLoop = code.includes('i < arr.length') && !code.includes('i <= arr.length');
      return hasCorrectLoop;
    },
    hint: 'Check the loop condition - it causes an out-of-bounds error'
  },
  {
    id: 3,
    title: 'Stage 3: Generate Numbers 0 to 1000',
    description: 'Write code that generates all numbers from 0 to 1000',
    initialCode: `// Write your code here
function generateNumbers() {

}`,
    validate: (code: string) => {
      try {
        const hasLoop = /for\s*\(|while\s*\(/.test(code);
        const hasArray = /\[|\]|Array/.test(code);
        const has1000 = /1000|1001/.test(code);
        return hasLoop && hasArray && has1000;
      } catch {
        return false;
      }
    },
    hint: 'Use a loop to generate numbers and store them in an array'
  },
  {
    id: 4,
    title: 'Stage 4: Data Transformation',
    description: 'Convert this JSON data to CSV format',
    initialCode: `// Convert this JSON to CSV
const data = [
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "Boston" }
];

function jsonToCsv(data) {
  // Your code here
}`,
    validate: (code: string) => {
      const hasHeaders = /keys|Object\.keys|name.*age.*city/.test(code);
      const hasJoin = /join/.test(code);
      const hasMap = /map/.test(code);
      return hasHeaders && (hasJoin || hasMap);
    },
    hint: 'Extract headers from object keys, then map each object to a row'
  }
];

export default function EscapeRoomPage() {
  const [currentStage, setCurrentStage] = useState(0);
  const [code, setCode] = useState(stages[0].initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [customTime, setCustomTime] = useState('');
  const [feedback, setFeedback] = useState('');
  const [completed, setCompleted] = useState<number[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setCookie('lastVisitedPage', '/escape-room');
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => {
          if (prev <= 0) {
            // stop at zero
            if (interval) clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
          return prev - 1; // <-- decrement for countdown
        });
      }, 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isRunning]);


  useEffect(() => {
    setCode(stages[currentStage].initialCode);
    setFeedback('');
  }, [currentStage]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const setTimer = () => {
    const minutes = parseInt(customTime);
    if (!isNaN(minutes) && minutes > 0) {
      setTime(minutes * 60);
      setCustomTime('');
    }
  };

  const validateCode = () => {
    const stage = stages[currentStage];
    if (stage.validate(code)) {
      setFeedback('Correct! Moving to next stage...');
      setCompleted([...completed, stage.id]);
      setTimeout(() => {
        if (currentStage < stages.length - 1) {
          setCurrentStage(currentStage + 1);
        } else {
          setFeedback('Congratulations! You escaped the room!');
          setIsRunning(false);
        }
      }, 1500);
    } else {
      setFeedback('Not quite right. Try again!');
    }
  };

  const saveToDatabase = async () => {
    try {
      const response = await fetch('/api/outputs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outputType: 'escape_room',
          htmlContent: `Stage ${currentStage + 1} Solution:\n${code}`,
        }),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch (err) {
      console.error('Failed to save:', err);
    }
  };

  const stage = stages[currentStage];

  return (
    <div
  className="w-full h-screen bg-cover bg-center"
  style={{
    backgroundImage: 'url(https://my-assignment-outputs-21782127.s3.ap-southeast-2.amazonaws.com/extras/pngtree-free-passage-yearning-photorealistic-3d-render-of-a-person-longing-to-image_3787146.jpg)',
  }}
>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Escape Room Challenge
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Code your way out through {stages.length} challenging stages
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
          <h3 className="text-sm font-semibold mb-2 opacity-90">Current Stage</h3>
          <p className="text-3xl font-bold">{currentStage + 1} / {stages.length}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
          <h3 className="text-sm font-semibold mb-2 opacity-90">Timer</h3>
          <p className="text-3xl font-bold">{formatTime(time)}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
          <h3 className="text-sm font-semibold mb-2 opacity-90">Completed</h3>
          <p className="text-3xl font-bold">{completed.length}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            aria-label={isRunning ? 'Pause timer' : 'Start timer'}
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={() => { setTime(0); setIsRunning(false); }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            aria-label="Reset timer"
          >
            <RotateCcw size={18} />
            Reset
          </button>
          <input
            type="number"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            placeholder="Set minutes"
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white w-32"
            aria-label="Set timer in minutes"
          />
          <button
      onClick={() => {
        const minutes = parseInt(customTime, 10);
        if (!isNaN(minutes) && minutes > 0) {
          setTime(minutes * 60);
          setCustomTime('');
          setIsRunning(true); // auto-start countdown after setting
        }
      }}
      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
    >
      Set Timer
    </button>
        </div>

        <div className="flex gap-2 mb-4">
          {stages.map((s, idx) => (
            <div
              key={s.id}
              className={`flex-1 h-2 rounded-full ${
                completed.includes(s.id)
                  ? 'bg-green-500'
                  : idx === currentStage
                  ? 'bg-blue-500'
                  : 'bg-gray-300 dark:bg-gray-700'
              }`}
              aria-label={`Stage ${idx + 1} ${completed.includes(s.id) ? 'completed' : idx === currentStage ? 'current' : 'pending'}`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            {stage.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {stage.description}
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3 mb-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Hint:</strong> {stage.hint}
            </p>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-mono text-sm"
            spellCheck={false}
            aria-label="Code editor"
          />

          <div className="flex gap-2 mt-4">
            <button
              onClick={validateCode}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-semibold"
              aria-label="Submit solution"
            >
              <ChevronRight size={18} />
              Submit Solution
            </button>
            <button
              onClick={saveToDatabase}
              className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              aria-label="Save to database"
            >
              {saved ? <Check size={18} /> : <Save size={18} />}
            </button>
          </div>

          {feedback && (
            <div data-testid="feedback" className={`mt-4 p-3 rounded-md ${
              feedback.includes('Correct') || feedback.includes('Congratulations')
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
            }`}>
              {feedback}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Progress Overview
          </h2>

          <div className="space-y-3">
            {stages.map((s, idx) => (
              <div
                key={s.id}
                className={`p-4 rounded-lg border ${
                  completed.includes(s.id)
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : idx === currentStage
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                    : 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Stage {s.id}
                  </h3>
                  {completed.includes(s.id) && (
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      ✓ Completed
                    </span>
                  )}
                  {idx === currentStage && !completed.includes(s.id) && (
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">
                      In Progress
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {s.description}
                </p>
              </div>
            ))}
          </div>

          {completed.length === stages.length && (
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">
                You Escaped!
              </h3>
              <p>Time taken: {formatTime(time)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
