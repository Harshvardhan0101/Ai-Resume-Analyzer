import { DEMO_RESULT } from '../data/demoData';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Uploads resume PDF and job description to the backend for analysis.
 * @param {File} resumeFile - Resume PDF file
 * @param {string} jobDescription - Job posting text
 * @returns {Promise<object>} Parsed analysis response
 */
export async function analyzeResume(resumeFile, jobDescription) {
  const formData = new FormData();
  formData.append('resume', resumeFile);
  formData.append('jobDescription', jobDescription);

  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error || `Server responded with status ${response.status}`);
    }

    return result;
  } catch (err) {
    if (err.message && err.message.includes('Failed to fetch')) {
      throw new Error(
        'Unable to connect to the CareerLens backend server. Please make sure the server is running on port 5000.'
      );
    }
    throw err;
  }
}

/**
 * Fetches demo analysis data from backend or returns fallback.
 * @returns {Promise<object>} Demo analysis payload
 */
export async function fetchDemoAnalysis() {
  try {
    const response = await fetch(`${API_BASE_URL}/demo`);
    if (response.ok) {
      const result = await response.json();
      if (result.success) return result;
    }
  } catch {
    // If backend is offline, return client-side demo directly
  }

  return DEMO_RESULT;
}

/**
 * Checks server health and Gemini configuration status.
 * @returns {Promise<{ status: string, aiConfigured: boolean }>}
 */
export async function checkServerHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (response.ok) {
      return await response.json();
    }
    return { status: 'error', aiConfigured: false };
  } catch {
    return { status: 'offline', aiConfigured: false };
  }
}
