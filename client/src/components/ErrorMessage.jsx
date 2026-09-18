import React from 'react';
import { AlertCircle, X, RefreshCw, Key, FileWarning } from 'lucide-react';

export default function ErrorMessage({ error, onDismiss, onRetry }) {
  if (!error) return null;

  const isKeyError = error.toLowerCase().includes('api_key') || error.toLowerCase().includes('gemini_api_key');
  const isPdfError = error.toLowerCase().includes('pdf') || error.toLowerCase().includes('scanned');

  return (
    <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 sm:p-5 text-rose-900 shadow-sm relative animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-rose-100 text-rose-700 shrink-0 mt-0.5">
          {isKeyError ? (
            <Key className="w-5 h-5" />
          ) : isPdfError ? (
            <FileWarning className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
        </div>

        <div className="flex-1 pr-6">
          <h4 className="text-sm font-semibold text-rose-950 mb-1">
            {isKeyError
              ? 'Gemini API Key Required'
              : isPdfError
              ? 'Resume Extraction Issue'
              : 'Analysis Error'}
          </h4>
          <p className="text-xs sm:text-sm text-rose-800 leading-relaxed">{error}</p>

          {isKeyError && (
            <div className="mt-3 text-xs bg-white/70 p-2.5 rounded-lg border border-rose-200 text-slate-700">
              <span className="font-semibold text-rose-900">How to configure:</span> Open{' '}
              <code className="bg-slate-100 px-1 py-0.5 rounded text-rose-900 font-mono">
                server/.env
              </code>{' '}
              and add your key: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">GEMINI_API_KEY=your_key</code>.
              Get a free API key at{' '}
              <a
                href="https://aistudio.google.com/"
                target="_blank"
                rel="noreferrer"
                className="text-sky-700 underline font-medium hover:text-sky-800"
              >
                Google AI Studio
              </a>
              . (You can also click <strong>"View Demo"</strong> to test the dashboard right away!)
            </div>
          )}

          {onRetry && (
            <div className="mt-3">
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-700 text-white text-xs font-semibold hover:bg-rose-800 transition-colors shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          )}
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 text-rose-400 hover:text-rose-700 p-1 rounded-md transition-colors"
            aria-label="Dismiss error"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
