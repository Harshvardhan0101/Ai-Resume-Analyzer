import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, X, AlertTriangle, CheckCircle2, FileUp } from 'lucide-react';

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export default function ResumeUploader({ file, onFileSelect, onFileRemove }) {
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState(null);
  const fileInputRef = useRef(null);

  const validateAndSetFile = (selectedFile) => {
    setLocalError(null);

    if (!selectedFile) return;

    // Validate MIME type & extension
    const isPdf =
      selectedFile.type === 'application/pdf' ||
      selectedFile.name.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      setLocalError('Invalid file type. Only PDF documents (.pdf) are supported.');
      return;
    }

    if (selectedFile.size > MAX_SIZE_BYTES) {
      setLocalError('File is too large. The maximum supported resume size is 5MB.');
      return;
    }

    onFileSelect(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-slate-800 flex items-center gap-2">
          <FileText className="w-4 h-4 text-sky-600" />
          <span>Upload Resume</span>
        </label>
        <span className="text-xs text-slate-400 font-medium">PDF up to 5MB</span>
      </div>

      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex-1 min-h-[260px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-sky-500 bg-sky-50/70 scale-[0.99]'
              : 'border-slate-300 hover:border-sky-400 hover:bg-slate-50/80 bg-white'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-colors ${
              isDragging
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                : 'bg-sky-50 text-sky-600 group-hover:scale-105'
            }`}
          >
            <UploadCloud className="w-7 h-7" />
          </div>

          <p className="text-sm font-semibold text-slate-800 mb-1">
            {isDragging ? 'Drop your resume PDF here' : 'Drag & drop your resume PDF'}
          </p>
          <p className="text-xs text-slate-500 mb-4 max-w-[220px]">
            Supports standard text-based PDF resumes
          </p>

          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors border border-slate-200 shadow-2xs"
          >
            <FileUp className="w-3.5 h-3.5" />
            <span>Browse Files</span>
          </button>
        </div>
      ) : (
        <div className="flex-1 min-h-[260px] bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-2xs">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Ready
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 truncate mt-1 max-w-[260px]" title={file.name}>
                  {file.name}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {formatFileSize(file.size)} • PDF Document
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onFileRemove();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Remove resume"
              aria-label="Remove resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Resume loaded and validated</span>
            </div>
            <p className="text-[11px] text-slate-500 pl-6">
              Text will be extracted automatically when you run the analysis.
            </p>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
            >
              Replace with another PDF
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
        </div>
      )}

      {localError && (
        <div className="mt-2.5 flex items-center gap-2 text-xs text-rose-600 bg-rose-50 border border-rose-200 px-3 py-2 rounded-xl animate-in fade-in">
          <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
          <span>{localError}</span>
        </div>
      )}
    </div>
  );
}
