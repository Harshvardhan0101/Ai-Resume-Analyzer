import React, { useState } from 'react';
import {
  FileDown,
  RotateCcw,
  Sparkles,
  FileText,
  Calendar,
  Layers,
  Check,
  Share2,
} from 'lucide-react';
import MatchScore from '../components/MatchScore';
import SkillsSection from '../components/SkillsSection';
import StrengthsSection from '../components/StrengthsSection';
import Recommendations from '../components/Recommendations';
import KeywordAnalysis from '../components/KeywordAnalysis';
import RelevantProjects from '../components/RelevantProjects';
import JobRequirements from '../components/JobRequirements';
import InterviewQuestions from '../components/InterviewQuestions';
import { generatePDFReport } from '../services/reportGenerator';

export default function Results({ analysisData, meta, onReset }) {
  const [isExporting, setIsExporting] = useState(false);

  if (!analysisData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-4">No Analysis Results Found</h2>
        <button
          onClick={onReset}
          className="px-5 py-2.5 rounded-xl bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition-colors"
        >
          Return to Analyzer
        </button>
      </div>
    );
  }

  const handleDownloadPDF = () => {
    setIsExporting(true);
    try {
      generatePDFReport(analysisData, meta);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert('Could not generate PDF report. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const formattedDate = meta?.analyzedAt
    ? new Date(meta.analyzedAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recent';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10 space-y-8">
      {/* Top Meta Bar */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 truncate max-w-[280px] sm:max-w-md">
                {meta?.fileName || 'Candidate_Resume.pdf'}
              </h2>
              {meta?.isDemo && (
                <span className="text-[10px] uppercase font-bold tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">
                  Demo Mode
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
              <span>Analyzed on {formattedDate}</span>
              {meta?.numPages && <span>• {meta.numPages} Page(s)</span>}
            </p>
          </div>
        </div>

        {/* Action Buttons: Download Report & Analyze Another Resume */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <FileDown className="w-4 h-4 text-sky-400" />
            <span>{isExporting ? 'Generating PDF...' : 'Download Report'}</span>
          </button>

          <button
            onClick={onReset}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-300 shadow-2xs transition-colors flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Analyze Another Resume</span>
          </button>
        </div>
      </div>

      {/* Match Score & Summary Card */}
      <MatchScore
        score={analysisData.matchScore}
        level={analysisData.matchLevel}
        summary={analysisData.summary}
      />

      {/* Matching Skills vs Missing Skills */}
      <SkillsSection
        matchingSkills={analysisData.matchingSkills}
        missingSkills={analysisData.missingSkills}
      />

      {/* Target Role Requirements Breakdown */}
      <JobRequirements jobRequirements={analysisData.jobRequirements} />

      {/* Strengths & Weaknesses */}
      <StrengthsSection
        strengths={analysisData.strengths}
        weaknesses={analysisData.weaknesses}
      />

      {/* Actionable Recommendations */}
      <Recommendations recommendations={analysisData.recommendations} />

      {/* ATS Keyword Analysis */}
      <KeywordAnalysis keywords={analysisData.keywords} />

      {/* Relevant Resume Projects */}
      {analysisData.relevantProjects && analysisData.relevantProjects.length > 0 && (
        <RelevantProjects relevantProjects={analysisData.relevantProjects} />
      )}

      {/* Interview Prep Questions */}
      <InterviewQuestions interviewQuestions={analysisData.interviewQuestions} />

      {/* Bottom Actions Bar */}
      <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          Want to test another job description or update your resume?
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadPDF}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors flex items-center gap-1.5"
          >
            <FileDown className="w-4 h-4" />
            <span>Save PDF Report</span>
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={onReset}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Analyze Another Resume</span>
          </button>
        </div>
      </div>
    </div>
  );
}
