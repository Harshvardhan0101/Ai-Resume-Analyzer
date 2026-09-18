import React from 'react';
import { CheckCircle2, AlertOctagon, Check, MinusCircle } from 'lucide-react';

export default function SkillsSection({ matchingSkills = [], missingSkills = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Matching Skills Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Matching Skills</h3>
              <p className="text-xs text-slate-500">Found in both resume and job posting</p>
            </div>
          </div>

          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
            {matchingSkills.length} Matched
          </span>
        </div>

        {matchingSkills.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-6 text-center">
            No direct skill overlaps identified.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {matchingSkills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50/70 border border-emerald-200/80 text-emerald-900 text-xs font-semibold hover:bg-emerald-100/70 transition-colors"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Missing Skills Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Missing / Required Skills</h3>
              <p className="text-xs text-slate-500">Mentioned in job description but not in resume</p>
            </div>
          </div>

          <span className="bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200">
            {missingSkills.length} Gaps
          </span>
        </div>

        {missingSkills.length === 0 ? (
          <div className="flex items-center justify-center py-6 text-xs text-emerald-600 font-medium">
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            All target job requirements are covered in the resume!
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-amber-950 text-xs font-medium hover:bg-amber-100/70 transition-colors"
              >
                <MinusCircle className="w-3.5 h-3.5 text-amber-600 stroke-[2]" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
