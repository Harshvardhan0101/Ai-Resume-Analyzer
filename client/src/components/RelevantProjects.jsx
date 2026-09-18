import React from 'react';
import { FolderGit2, ArrowUpRight, CheckCircle } from 'lucide-react';

export default function RelevantProjects({ relevantProjects = [] }) {
  if (!relevantProjects || relevantProjects.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 lg:p-7 shadow-xs">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
        <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
          <FolderGit2 className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Relevant Resume Projects
          </h3>
          <p className="text-xs text-slate-500">
            Portfolio work from your resume that directly maps to this job's requirements
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relevantProjects.map((proj, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-sky-300 hover:bg-sky-50/20 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>{proj.name}</span>
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {proj.reason}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
              <span>Source: Candidate Resume</span>
              <span className="text-sky-600 font-medium">Core Match</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
