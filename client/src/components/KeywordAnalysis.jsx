import React from 'react';
import { Tag, Check, X, Search } from 'lucide-react';

export default function KeywordAnalysis({ keywords = { found: [], missing: [] } }) {
  const foundKeywords = keywords.found || [];
  const missingKeywords = keywords.missing || [];
  const totalKeywords = foundKeywords.length + missingKeywords.length;
  const matchPercentage =
    totalKeywords > 0 ? Math.round((foundKeywords.length / totalKeywords) * 100) : 0;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 lg:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              ATS Keyword Alignment
            </h3>
            <p className="text-xs text-slate-500">
              Key phrases and technical terms extracted from the job description
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Coverage:</span>
          <span className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-lg border border-slate-200">
            {foundKeywords.length}/{totalKeywords} Keywords ({matchPercentage}%)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Found Keywords */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Found in Resume ({foundKeywords.length})</span>
            </span>
          </div>

          {foundKeywords.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-4 text-center">
              No matching keywords detected.
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {foundKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white border border-emerald-200 text-emerald-800 text-xs font-medium shadow-2xs"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Missing Keywords */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Missing from Resume ({missingKeywords.length})</span>
            </span>
          </div>

          {missingKeywords.length === 0 ? (
            <p className="text-xs text-slate-400 italic py-4 text-center">
              No critical keyword gaps found!
            </p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {missingKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white border border-rose-200 text-rose-800 text-xs font-medium shadow-2xs"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
