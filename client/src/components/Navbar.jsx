import React, { useState, useEffect } from 'react';
import { FileText, Sparkles, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { checkServerHealth } from '../services/api';

export default function Navbar({ onNavigate, currentPage, onDemoClick }) {
  const [health, setHealth] = useState({ status: 'checking', aiConfigured: false });

  useEffect(() => {
    checkServerHealth().then(setHealth);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 group text-left focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-slate-900">CareerLens</span>
                <span className="bg-sky-50 text-sky-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-sky-200">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block -mt-0.5">
                Resume & Job Match Analyzer
              </p>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-3">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('analyzer')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'analyzer' || currentPage === 'results'
                  ? 'bg-sky-50 text-sky-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Analyzer
            </button>

            <button
              onClick={onDemoClick}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>View Demo</span>
            </button>

            {/* Health / Status Indicator */}
            <div className="hidden md:flex items-center gap-1.5 pl-3 border-l border-slate-200 text-xs text-slate-500">
              {health.status === 'ok' ? (
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200" title={health.aiConfigured ? "Backend & Gemini AI Connected" : "Backend Connected (Add Gemini API key in server/.env)"}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-medium">
                    {health.aiConfigured ? 'AI Ready' : 'API Key Needed'}
                  </span>
                </div>
              ) : health.status === 'offline' ? (
                <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-200" title="Backend server offline. Run 'npm run dev' or 'cd server && npm start'">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="font-medium">Server Offline</span>
                </div>
              ) : null}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
