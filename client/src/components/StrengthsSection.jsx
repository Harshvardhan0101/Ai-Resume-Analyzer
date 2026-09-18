import React from 'react';
import { ThumbsUp, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export default function StrengthsSection({ strengths = [], weaknesses = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Strengths Column */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ThumbsUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Key Resume Strengths</h3>
            <p className="text-xs text-slate-500">Standout competitive advantages identified</p>
          </div>
        </div>

        <div className="space-y-3 flex-1">
          {strengths.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 text-xs sm:text-sm text-slate-700 flex items-start gap-3 hover:bg-slate-50 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
          {strengths.length === 0 && (
            <p className="text-xs text-slate-400 italic text-center py-4">
              No specific strengths listed.
            </p>
          )}
        </div>
      </div>

      {/* Weaknesses / Growth Areas Column */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-4">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Areas for Growth</h3>
            <p className="text-xs text-slate-500">Opportunities to refine before applying</p>
          </div>
        </div>

        <div className="space-y-3 flex-1">
          {weaknesses.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 text-xs sm:text-sm text-slate-700 flex items-start gap-3 hover:bg-slate-50 transition-colors"
            >
              <div className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                !
              </div>
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
          {weaknesses.length === 0 && (
            <p className="text-xs text-slate-400 italic text-center py-4">
              No critical weaknesses noted.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
