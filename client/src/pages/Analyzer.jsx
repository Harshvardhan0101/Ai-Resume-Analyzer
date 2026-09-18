import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import ResumeUploader from '../components/ResumeUploader';
import JobDescriptionInput from '../components/JobDescriptionInput';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';

export default function Analyzer({
  file,
  onFileSelect,
  onFileRemove,
  jobDescription,
  onJobDescriptionChange,
  onJobDescriptionClear,
  onAnalyze,
  isLoading,
  error,
  onErrorDismiss,
}) {
  const isSubmitDisabled =
    !file ||
    !jobDescription ||
    jobDescription.trim().length < 20 ||
    isLoading;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Resume & Job Match Analyzer
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Compare your technical credentials against the target role's expectations and generate an ATS alignment report.
        </p>
      </div>

      {/* Error Message Banner */}
      {error && (
        <div className="mb-6">
          <ErrorMessage
            error={error}
            onDismiss={onErrorDismiss}
            onRetry={!isSubmitDisabled ? onAnalyze : undefined}
          />
        </div>
      )}

      {/* Conditional Rendering: Loading State vs Input Workspace */}
      {isLoading ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs min-h-[440px] flex items-center justify-center">
          <LoadingState />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Two-Column Inputs: Left Resume, Right Job Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Column: Resume Upload */}
            <div className="lg:col-span-5 flex flex-col">
              <ResumeUploader
                file={file}
                onFileSelect={onFileSelect}
                onFileRemove={onFileRemove}
              />
            </div>

            {/* Right Column: Job Description Input */}
            <div className="lg:col-span-7 flex flex-col">
              <JobDescriptionInput
                value={jobDescription}
                onChange={onJobDescriptionChange}
                onClear={onJobDescriptionClear}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submission Action Bar */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
              <span>
                Processed in real-time. No resume data is permanently saved or indexed.
              </span>
            </div>

            <button
              onClick={onAnalyze}
              disabled={isSubmitDisabled}
              className={`w-full sm:w-auto px-7 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                isSubmitDisabled
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : 'bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20 hover:shadow-sky-600/30'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Helper hint for user requirements */}
          {(!file || !jobDescription || jobDescription.trim().length < 20) && (
            <div className="text-center text-xs text-slate-400">
              To begin: {!file && '• Upload your resume PDF '}
              {(!jobDescription || jobDescription.trim().length < 20) && '• Enter or paste target job description'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
