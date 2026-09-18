import React from 'react';
import {
  FileText,
  Target,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  HelpCircle,
  FileDown,
  Layers,
  Search,
} from 'lucide-react';

export default function Home({ onStartAnalysis, onViewDemo }) {
  const steps = [
    {
      number: '01',
      title: 'Upload Resume',
      desc: 'Upload your standard PDF resume. Text is extracted securely in memory.',
      icon: FileText,
    },
    {
      number: '02',
      title: 'Add Job Description',
      desc: 'Paste the target job requirements or responsibilities from any job board.',
      icon: Search,
    },
    {
      number: '03',
      title: 'AI Analysis',
      desc: 'Gemini evaluates skill overlaps, gaps, ATS keywords, and experience relevance.',
      icon: Sparkles,
    },
    {
      number: '04',
      title: 'Improve & Prepare',
      desc: 'Get actionable suggestions, interview questions, and a downloadable PDF report.',
      icon: TrendingUp,
    },
  ];

  const features = [
    {
      title: 'Resume Analysis',
      desc: 'Deep structural comparison between candidate qualifications and role expectations.',
      icon: FileText,
    },
    {
      title: 'Job Match Score',
      desc: 'Objective 0–100% alignment score powered by structured AI analysis.',
      icon: Target,
    },
    {
      title: 'Skill Gap Detection',
      desc: 'Pinpoint exact missing technical tools, frameworks, and qualifications.',
      icon: Layers,
    },
    {
      title: 'AI Suggestions',
      desc: 'Ethical, actionable recommendations to improve project bullet points and ATS visibility.',
      icon: Sparkles,
    },
    {
      title: 'Interview Questions',
      desc: '8–10 tailored technical, project-based, and behavioral interview questions.',
      icon: HelpCircle,
    },
    {
      title: 'Download Report',
      desc: 'Generate a comprehensive client-side PDF assessment summary ready for review.',
      icon: FileDown,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="pt-8 sm:pt-14 text-center max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Engineered for CS & IT Students & Early-Career Developers</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
          CareerLens
          <span className="block text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-600 mt-3">
            Understand how well your resume matches the job you're applying for.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
          Upload your resume, paste a job description, and get AI-powered insights into your skills, gaps, and interview preparation.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
          <button
            onClick={onStartAnalysis}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm shadow-md shadow-sky-600/20 hover:shadow-sky-600/30 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Analyze My Resume</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={onViewDemo}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>View Demo</span>
          </button>
        </div>

        {/* Value Highlights */}
        <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-2">
            <div className="text-xl font-bold text-slate-900">100% Free</div>
            <div className="text-xs text-slate-500 mt-0.5">No login or signup required</div>
          </div>
          <div className="p-2">
            <div className="text-xl font-bold text-slate-900">Private & In-Memory</div>
            <div className="text-xs text-slate-500 mt-0.5">No files stored permanently</div>
          </div>
          <div className="p-2">
            <div className="text-xl font-bold text-slate-900">Gemini Powered</div>
            <div className="text-xs text-slate-500 mt-0.5">Structured, hallucination-checked</div>
          </div>
          <div className="p-2">
            <div className="text-xl font-bold text-slate-900">Instant PDF</div>
            <div className="text-xs text-slate-500 mt-0.5">Exportable assessment report</div>
          </div>
        </div>
      </section>

      {/* How it Works Workflow */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
            Clear Four-Step Workflow
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900">
            How CareerLens Evaluates Your Match
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-6 relative flex flex-col justify-between shadow-2xs hover:border-sky-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                      {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
            Comprehensive Analysis
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900">
            Everything You Need Before Hitting "Apply"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Callout Banner */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to verify your resume fit?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Upload your PDF resume and target job description now to identify keyword gaps and prepare for your upcoming technical interviews.
            </p>
            <div className="pt-2">
              <button
                onClick={onStartAnalysis}
                className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <span>Launch Analyzer Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
