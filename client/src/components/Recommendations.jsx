import React from 'react';
import { Lightbulb, CheckCheck, Info } from 'lucide-react';

export default function Recommendations({ recommendations = [] }) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 lg:p-7 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Actionable Resume Recommendations
            </h3>
            <p className="text-xs text-slate-500">
              High-impact revisions to optimize your resume for recruiters and ATS
            </p>
          </div>
        </div>

        <span className="bg-sky-50 text-sky-700 text-xs font-bold px-2.5 py-1 rounded-full border border-sky-200">
          {recommendations.length} Suggestions
        </span>
      </div>

      {/* Numbered Recommendations Cards */}
      <div className="space-y-3.5 mb-6">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-slate-50/60 border border-slate-200/70 hover:border-sky-300 hover:bg-sky-50/20 transition-all flex items-start gap-3.5 group"
          >
            <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 group-hover:bg-sky-600 group-hover:text-white transition-colors">
              {index + 1}
            </div>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {rec}
            </p>
          </div>
        ))}

        {recommendations.length === 0 && (
          <p className="text-xs text-slate-400 italic text-center py-4">
            No specific recommendations generated.
          </p>
        )}
      </div>

      {/* Ethical Guidance Notice */}
      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Ethical Resume Tip:</span> Only incorporate skills and technologies you genuinely understand and can confidently defend during technical interviews. Emphasize real-world impact and quantified results from your genuine coursework and personal projects.
        </div>
      </div>
    </div>
  );
}
