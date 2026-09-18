import React from 'react';
import { Award, CheckCircle2, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';

export default function MatchScore({ score = 0, level = 'Good Match', summary = '' }) {
  // Determine color theme based on match score
  let strokeColor = '#0284c7'; // sky-600
  let badgeBg = 'bg-sky-50 text-sky-700 border-sky-200';
  let scoreDescription = 'Strong alignment with core responsibilities and tech stack.';

  if (score >= 80) {
    strokeColor = '#10b981'; // emerald-500
    badgeBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    scoreDescription = 'Excellent candidate fit. Resume directly mirrors primary job requirements.';
  } else if (score >= 65) {
    strokeColor = '#0284c7'; // sky-600
    badgeBg = 'bg-sky-50 text-sky-700 border-sky-200';
    scoreDescription = 'Solid match. Meets primary requirements with minor opportunities for stack enhancement.';
  } else if (score >= 50) {
    strokeColor = '#f59e0b'; // amber-500
    badgeBg = 'bg-amber-50 text-amber-700 border-amber-200';
    scoreDescription = 'Moderate match. Foundational skills match, but several critical skills or projects are missing.';
  } else {
    strokeColor = '#f43f5e'; // rose-500
    badgeBg = 'bg-rose-50 text-rose-700 border-rose-200';
    scoreDescription = 'Low alignment. Substantial gaps between stated resume experience and job requirements.';
  }

  // Circular gauge math
  const radius = 64;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 lg:p-8 shadow-xs">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left: Score Gauge */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg
              height={radius * 2}
              width={radius * 2}
              className="transform -rotate-90"
            >
              {/* Background track */}
              <circle
                stroke="#e2e8f0"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Animated Progress */}
              <circle
                stroke={strokeColor}
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
            </svg>

            {/* Center score readout */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                {score}%
              </span>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                Match
              </span>
            </div>
          </div>

          <div className="mt-4">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${badgeBg}`}>
              <Award className="w-3.5 h-3.5" />
              <span>{level}</span>
            </span>
          </div>
        </div>

        {/* Right: AI Assessment & Executive Summary */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 rounded-md bg-sky-50 text-sky-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              AI Assessment Summary
            </h3>
          </div>

          <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed mb-4">
            {summary}
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-xs text-slate-600">
            <TrendingUp className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <p className="leading-normal">
              <strong className="text-slate-800">Insight:</strong> {scoreDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
