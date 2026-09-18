import React, { useState, useEffect } from 'react';
import { Loader2, FileSearch, Sparkles, BrainCircuit, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { text: 'Reading your resume...', icon: FileSearch, detail: 'Parsing text and identifying experience sections' },
  { text: 'Comparing skills...', icon: BrainCircuit, detail: 'Matching candidate capabilities against required stack' },
  { text: 'Analyzing job requirements...', icon: Sparkles, detail: 'Evaluating experience level, responsibilities, and ATS keywords' },
  { text: 'Preparing recommendations...', icon: CheckCircle2, detail: 'Synthesizing actionable advice and interview questions' },
];

export default function LoadingState() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 2400);

    return () => clearInterval(timer);
  }, []);

  const activeStep = STEPS[currentStepIndex];
  const StepIcon = activeStep.icon;

  return (
    <div className="w-full max-w-xl mx-auto py-12 px-6 flex flex-col items-center text-center">
      {/* Animated Icon Ring */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-3xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-lg shadow-sky-500/10">
          <StepIcon className="w-10 h-10 animate-bounce duration-1000" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center border border-slate-200">
          <Loader2 className="w-4 h-4 text-sky-600 animate-spin" />
        </div>
      </div>

      {/* Main Status Text */}
      <h3 className="text-xl font-bold text-slate-900 mb-2 transition-all duration-300">
        {activeStep.text}
      </h3>
      <p className="text-sm text-slate-500 mb-8 max-w-md">
        {activeStep.detail}
      </p>

      {/* Stepper Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
        <div
          className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full transition-all duration-500 rounded-full"
          style={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Step Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div
              key={step.text}
              className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                isDone
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : isCurrent
                  ? 'bg-sky-50 text-sky-700 border-sky-300 font-semibold ring-2 ring-sky-400/20'
                  : 'bg-white text-slate-400 border-slate-200 opacity-60'
              }`}
            >
              <div className="truncate">{step.text.replace('...', '')}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-xs text-slate-400 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping"></span>
        <span>Generating structured AI analysis via Gemini</span>
      </div>
    </div>
  );
}
