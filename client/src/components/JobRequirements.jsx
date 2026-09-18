import React from 'react';
import { Target, Code, Users, Calendar, Wrench } from 'lucide-react';

export default function JobRequirements({ jobRequirements = {} }) {
  const technicalSkills = jobRequirements.technicalSkills || [];
  const softSkills = jobRequirements.softSkills || [];
  const experience = jobRequirements.experience || 'Not specified';
  const toolsAndTechnologies = jobRequirements.toolsAndTechnologies || [];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 lg:p-7 shadow-xs">
      <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 mb-6">
        <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
          <Target className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Job Requirements Breakdown
          </h3>
          <p className="text-xs text-slate-500">
            Structured criteria extracted from the employer's posting
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Technical Skills */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5">
            <Code className="w-3.5 h-3.5 text-sky-600" />
            <span>Technical Skills</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {technicalSkills.map((item, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-medium"
              >
                {item}
              </span>
            ))}
            {technicalSkills.length === 0 && (
              <span className="text-xs text-slate-400">None extracted</span>
            )}
          </div>
        </div>

        {/* Tools & Tech */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5">
            <Wrench className="w-3.5 h-3.5 text-sky-600" />
            <span>Tools & Tech</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {toolsAndTechnologies.map((item, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-medium"
              >
                {item}
              </span>
            ))}
            {toolsAndTechnologies.length === 0 && (
              <span className="text-xs text-slate-400">None extracted</span>
            )}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5">
            <Users className="w-3.5 h-3.5 text-sky-600" />
            <span>Soft Skills</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {softSkills.map((item, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-medium"
              >
                {item}
              </span>
            ))}
            {softSkills.length === 0 && (
              <span className="text-xs text-slate-400">None extracted</span>
            )}
          </div>
        </div>

        {/* Experience Level */}
        <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 mb-2.5">
            <Calendar className="w-3.5 h-3.5 text-sky-600" />
            <span>Experience Level</span>
          </div>
          <div className="mt-auto">
            <p className="text-xs text-slate-700 font-medium bg-white p-2.5 rounded-md border border-slate-200 leading-relaxed">
              {experience}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
