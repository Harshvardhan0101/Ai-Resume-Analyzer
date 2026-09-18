import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import Results from './pages/Results';
import { analyzeResume, fetchDemoAnalysis } from './services/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'analyzer' | 'results'
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // File handlers
  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError(null);
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  // Job description handlers
  const handleJobDescriptionChange = (text) => {
    setJobDescription(text);
    setError(null);
  };

  const handleJobDescriptionClear = () => {
    setJobDescription('');
  };

  // Run Real Analysis
  const handleRunAnalysis = async () => {
    if (!file) {
      setError('Please upload your resume PDF before starting the analysis.');
      return;
    }

    if (!jobDescription || jobDescription.trim().length < 20) {
      setError('Please provide a meaningful job description (at least 20 characters) for accurate matching.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await analyzeResume(file, jobDescription);
      setAnalysisResult(response.data);
      setMeta(response.meta);
      setCurrentPage('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Analysis failed:', err);
      setError(err.message || 'An error occurred during analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load Demo Analysis
  const handleViewDemo = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const demoResponse = await fetchDemoAnalysis();
      setAnalysisResult(demoResponse.data);
      setMeta(demoResponse.meta);
      setCurrentPage('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Failed to load demo:', err);
      setError('Could not load demo data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset for new analysis
  const handleReset = () => {
    setFile(null);
    setJobDescription('');
    setAnalysisResult(null);
    setMeta(null);
    setError(null);
    setCurrentPage('analyzer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onDemoClick={handleViewDemo}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <Home
            onStartAnalysis={() => {
              setCurrentPage('analyzer');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewDemo={handleViewDemo}
          />
        )}

        {currentPage === 'analyzer' && (
          <Analyzer
            file={file}
            onFileSelect={handleFileSelect}
            onFileRemove={handleFileRemove}
            jobDescription={jobDescription}
            onChangeDescription={handleJobDescriptionChange}
            onJobDescriptionChange={handleJobDescriptionChange}
            onJobDescriptionClear={handleJobDescriptionClear}
            onAnalyze={handleRunAnalysis}
            isLoading={isLoading}
            error={error}
            onErrorDismiss={() => setError(null)}
          />
        )}

        {currentPage === 'results' && (
          <Results
            analysisData={analysisResult}
            meta={meta}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">CareerLens</span>
            <span>— AI Resume & Job Match Analyzer</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Powered by Google Gemini</span>
            <span>•</span>
            <span>Client-side PDF Generation</span>
            <span>•</span>
            <span>In-Memory Privacy</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
