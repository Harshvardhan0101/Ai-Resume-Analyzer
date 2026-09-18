import React, { useState } from 'react';
import { HelpCircle, Copy, Check, MessageSquareCode, Briefcase, Users2 } from 'lucide-react';

const CATEGORY_COLORS = {
  Technical: 'bg-sky-50 text-sky-700 border-sky-200',
  Project: 'bg-purple-50 text-purple-700 border-purple-200',
  Behavioral: 'bg-amber-50 text-amber-700 border-amber-200',
};

const CATEGORY_ICONS = {
  Technical: MessageSquareCode,
  Project: Briefcase,
  Behavioral: Users2,
};

export default function InterviewQuestions({ interviewQuestions = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const categories = ['All', 'Technical', 'Project', 'Behavioral'];

  const filteredQuestions = interviewQuestions.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category?.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 lg:p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Tailored Interview Questions
            </h3>
            <p className="text-xs text-slate-500">
              Curated based on your specific projects, stack proficiencies, and job gaps
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((q, idx) => {
          const categoryName = q.category || 'Technical';
          const badgeClass = CATEGORY_COLORS[categoryName] || 'bg-slate-50 text-slate-700 border-slate-200';
          const IconComponent = CATEGORY_ICONS[categoryName] || HelpCircle;

          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:border-sky-300 hover:bg-sky-50/20 transition-all flex items-start justify-between gap-4 group"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-2xs">
                  {idx + 1}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${badgeClass}`}
                    >
                      <IconComponent className="w-3 h-3" />
                      <span>{categoryName}</span>
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-800 leading-relaxed">
                    {q.question}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleCopy(q.question, idx)}
                className="p-2 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors shrink-0"
                title="Copy question text"
                aria-label="Copy question text"
              >
                {copiedIndex === idx ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <p className="text-xs text-slate-400 italic text-center py-6">
            No questions found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
