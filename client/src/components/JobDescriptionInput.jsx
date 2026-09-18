import React from 'react';
import { Briefcase, Copy, Trash2, Sparkles } from 'lucide-react';
import { SAMPLE_JOB_DESCRIPTION } from '../data/demoData';

export default function JobDescriptionInput({
  value,
  onChange,
  onClear,
  disabled,
}) {
  const charCount = value ? value.length : 0;
  const wordCount = value && value.trim() ? value.trim().split(/\s+/).length : 0;

  const handleLoadSample = () => {
    onChange(SAMPLE_JOB_DESCRIPTION);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor="job-description-input"
          className="text-sm font-semibold text-slate-800 flex items-center gap-2"
        >
          <Briefcase className="w-4 h-4 text-sky-600" />
          <span>Target Job Description</span>
        </label>

        <div className="flex items-center gap-2">
          {!value && (
            <button
              type="button"
              onClick={handleLoadSample}
              disabled={disabled}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
            >
              <Sparkles className="w-3 h-3 text-sky-500" />
              <span>Load Sample Job</span>
            </button>
          )}

          {value && (
            <button
              type="button"
              onClick={onClear}
              disabled={disabled}
              className="text-xs text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1"
              title="Clear job description"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-white border border-slate-200 rounded-2xl focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all shadow-2xs">
        <textarea
          id="job-description-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Paste the job description here (responsibilities, required skills, preferred qualifications, tech stack)..."
          className="w-full flex-1 min-h-[220px] p-4 text-sm text-slate-800 placeholder-slate-400 bg-transparent border-none resize-none focus:outline-none focus:ring-0 leading-relaxed font-sans"
        />

        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 rounded-b-2xl flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <span>
              <strong className="text-slate-700 font-medium">{charCount}</strong> characters
            </span>
            <span>•</span>
            <span>
              <strong className="text-slate-700 font-medium">{wordCount}</strong> words
            </span>
          </div>

          <div>
            {charCount < 50 ? (
              <span className="text-amber-600 font-medium">Recommended: 100+ chars</span>
            ) : (
              <span className="text-emerald-600 font-medium">Good length</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
