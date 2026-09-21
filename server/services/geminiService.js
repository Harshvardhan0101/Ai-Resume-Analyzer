import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Validates and normalizes the AI analysis JSON schema.
 * @param {object} data - Raw parsed JSON from Gemini
 * @returns {object} Validated and structured response object
 */
function normalizeAnalysisResponse(data) {
  const matchScore = typeof data.matchScore === 'number' 
    ? Math.min(100, Math.max(0, Math.round(data.matchScore))) 
    : 50;

  let matchLevel = 'Moderate Match';
  if (matchScore >= 80) matchLevel = 'Strong Match';
  else if (matchScore >= 65) matchLevel = 'Good Match';
  else if (matchScore >= 50) matchLevel = 'Moderate Match';
  else matchLevel = 'Needs Improvement';

  return {
    matchScore,
    matchLevel: data.matchLevel || matchLevel,
    summary: typeof data.summary === 'string' && data.summary.trim().length > 0
      ? data.summary.trim()
      : 'Resume analysis completed. Review the detailed skill and experience breakdown below.',
    matchingSkills: Array.isArray(data.matchingSkills) ? data.matchingSkills.filter(Boolean) : [],
    missingSkills: Array.isArray(data.missingSkills) ? data.missingSkills.filter(Boolean) : [],
    strengths: Array.isArray(data.strengths) ? data.strengths.filter(Boolean) : [],
    weaknesses: Array.isArray(data.weaknesses) ? data.weaknesses.filter(Boolean) : [],
    recommendations: Array.isArray(data.recommendations) ? data.recommendations.filter(Boolean) : [],
    keywords: {
      found: Array.isArray(data.keywords?.found) ? data.keywords.found.filter(Boolean) : (Array.isArray(data.keywords) ? data.keywords : []),
      missing: Array.isArray(data.keywords?.missing) ? data.keywords.missing.filter(Boolean) : [],
    },
    relevantProjects: Array.isArray(data.relevantProjects)
      ? data.relevantProjects.map((p) => ({
          name: p.name || 'Relevant Experience',
          reason: p.reason || 'Aligns with core responsibilities outlined in the job description.',
        }))
      : [],
    interviewQuestions: Array.isArray(data.interviewQuestions)
      ? data.interviewQuestions.map((q) => ({
          question: q.question || 'Describe your technical workflow and project contributions.',
          category: ['Technical', 'Project', 'Behavioral'].includes(q.category)
            ? q.category
            : 'Technical',
        }))
      : [],
    jobRequirements: {
      technicalSkills: Array.isArray(data.jobRequirements?.technicalSkills)
        ? data.jobRequirements.technicalSkills.filter(Boolean)
        : [],
      softSkills: Array.isArray(data.jobRequirements?.softSkills)
        ? data.jobRequirements.softSkills.filter(Boolean)
        : [],
      experience: typeof data.jobRequirements?.experience === 'string'
        ? data.jobRequirements.experience
        : 'Not explicitly specified in the job posting.',
      toolsAndTechnologies: Array.isArray(data.jobRequirements?.toolsAndTechnologies)
        ? data.jobRequirements.toolsAndTechnologies.filter(Boolean)
        : [],
    },
  };
}

/**
 * Strips markdown code fences if present and parses JSON.
 * @param {string} raw - Raw text output from model
 * @returns {object} Parsed JSON
 */
function cleanAndParseJSON(raw) {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/```\s*$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/```\s*$/, '');
  }
  return JSON.parse(cleaned);
}

/**
 * Analyzes resume text against a job description using Google Gemini.
 * @param {string} resumeText - Extracted text from candidate's PDF
 * @param {string} jobDescription - Target job posting text
 * @returns {Promise<object>} Structured analysis JSON
 */
export async function analyzeResumeWithGemini(resumeText, jobDescription) {
  const apiKey = (process.env.GEMINI_API_KEY || '').trim();

  if (
    !apiKey ||
    apiKey.includes('your_api_key_here') ||
    apiKey.includes('your_gemini_api_key_here') ||
    apiKey.length < 20
  ) {
    throw new Error(
      'GEMINI_API_KEY is not configured. Please create a .env file inside the server directory with your Google Gemini API key (GEMINI_API_KEY=your_key).'
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey.trim());

  // Using gemini-flash-lite-latest which has low latency, high token limits, and native JSON mode
  const model = genAI.getGenerativeModel({
    model: 'gemini-flash-lite-latest',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.15,
    },
  });

  const prompt = `
You are an expert technical recruiter, hiring manager, and ATS (Applicant Tracking System) specialist.
Analyze the following candidate RESUME against the target JOB DESCRIPTION with high precision, realism, and objectivity.

CRITICAL RULES:
1. Do NOT invent or hallucinate candidate skills, tools, or projects that do not exist in the resume text.
2. Explicitly distinguish between:
   - skills genuinely found in the resume
   - skills/technologies mentioned in the job description that are missing from the resume.
3. Keep recommendations actionable, practical, and ethical (NEVER encourage lying or misrepresentation).
4. Evaluate match score (0-100) based on realistic hiring criteria:
   - 80-100: Candidate possesses nearly all essential technical requirements and relevant experience.
   - 65-79: Candidate meets core technical requirements with minor gaps in secondary tools or domain experience.
   - 50-64: Candidate has foundational skills but lacks multiple key technologies or sufficient depth.
   - Below 50: Significant gap between the candidate's background and the job requirements.
5. Generate 8 to 10 thoughtful, realistic interview questions tailored to the candidate's background, covering:
   - "Technical" (deep-dive into technologies mentioned in resume vs job description)
   - "Project" (probing their specific projects or practical implementation experience)
   - "Behavioral" (collaboration, problem-solving, handling ambiguity or technical challenges)
6. Extract key requirements from the job description categorized into Technical Skills, Soft Skills, Experience Level, and Tools/Technologies.

REQUIRED JSON OUTPUT SCHEMA:
{
  "matchScore": number (0 to 100),
  "matchLevel": "Strong Match" | "Good Match" | "Moderate Match" | "Needs Improvement",
  "summary": "Concise 2-3 sentence executive assessment of the candidate's alignment with the role.",
  "matchingSkills": ["string"],
  "missingSkills": ["string"],
  "strengths": ["string", "string", ...],
  "weaknesses": ["string", "string", ...],
  "recommendations": ["string", "string", ...],
  "keywords": {
    "found": ["string", "string", ...],
    "missing": ["string", "string", ...]
  },
  "relevantProjects": [
    {
      "name": "Project Name from Resume",
      "reason": "Why this specific project demonstrates relevance to the job requirements."
    }
  ],
  "interviewQuestions": [
    {
      "question": "Realistic question text",
      "category": "Technical" | "Project" | "Behavioral"
    }
  ],
  "jobRequirements": {
    "technicalSkills": ["string"],
    "softSkills": ["string"],
    "experience": "string",
    "toolsAndTechnologies": ["string"]
  }
}

---
JOB DESCRIPTION:
${jobDescription.slice(0, 10000)}

---
CANDIDATE RESUME:
${resumeText.slice(0, 15000)}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();

    if (!responseText) {
      throw new Error('Gemini returned an empty response.');
    }

    const parsedData = cleanAndParseJSON(responseText);
    return normalizeAnalysisResponse(parsedData);
  } catch (err) {
    if (err.message && err.message.includes('API_KEY_INVALID')) {
      throw new Error('Invalid Gemini API Key. Please verify your GEMINI_API_KEY in server/.env.');
    }
    if (err.message && err.message.includes('RESOURCE_EXHAUSTED')) {
      throw new Error('Gemini API rate limit exceeded. Please wait a few moments and try again.');
    }
    if (err instanceof SyntaxError) {
      throw new Error(`Failed to parse AI response into structured JSON: ${err.message}`);
    }
    throw err;
  }
}
