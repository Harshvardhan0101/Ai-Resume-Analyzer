import { extractTextFromPDF } from '../services/pdfService.js';
import { analyzeResumeWithGemini } from '../services/geminiService.js';

const DEMO_ANALYSIS = {
  matchScore: 78,
  matchLevel: 'Good Match',
  summary:
    'The candidate demonstrates strong foundational knowledge in modern frontend development (React, JavaScript ES6+, Tailwind CSS) along with solid practical academic projects. To reach an optimal match for this Full-Stack role, the candidate should highlight backend REST API integration, cloud deployment pipelines, and database query optimization.',
  matchingSkills: [
    'React.js',
    'JavaScript (ES6+)',
    'HTML5 / CSS3',
    'Tailwind CSS',
    'Git & GitHub',
    'Node.js (Basics)',
    'RESTful APIs',
    'Responsive Web Design',
    'Agile Methodologies',
  ],
  missingSkills: [
    'TypeScript',
    'Docker & Containerization',
    'PostgreSQL / SQL Optimization',
    'AWS / Cloud Deployment',
    'CI/CD Workflows',
    'Unit Testing (Jest / Vitest)',
  ],
  strengths: [
    'Strong hands-on experience building interactive React interfaces with modular state management.',
    'Clear evidence of independent project work, including full-stack e-commerce and student portal implementations.',
    'Solid grasp of modern styling frameworks (Tailwind CSS) and responsive cross-device layout design.',
    'Consistent track record of academic excellence in B.Tech Information Technology coursework.',
  ],
  weaknesses: [
    'Limited evidence of enterprise production testing (Jest, Cypress, React Testing Library).',
    'Docker and containerized deployment experience are not mentioned in the resume.',
    'Lack of quantified business impact metrics (e.g., performance improvements, user engagement numbers) on past projects.',
  ],
  recommendations: [
    'Incorporate measurable impact in project bullet points (e.g., "Reduced page load time by 30% through memoization and code-splitting").',
    'Build and document a small TypeScript & Docker project on GitHub to address the primary technical requirements gap.',
    'Detail specific REST API endpoints and data models designed in academic or personal full-stack projects.',
    'Add automated unit testing coverage (Jest or Vitest) to your portfolio repositories.',
  ],
  keywords: {
    found: [
      'React',
      'JavaScript',
      'Node.js',
      'REST API',
      'Git',
      'Tailwind CSS',
      'Frontend Development',
      'Single Page Applications',
    ],
    missing: [
      'TypeScript',
      'Docker',
      'PostgreSQL',
      'AWS',
      'CI/CD',
      'Unit Testing',
      'Microservices',
    ],
  },
  relevantProjects: [
    {
      name: 'CampusMart — Student E-Commerce Platform',
      reason:
        'Demonstrates end-to-end component hierarchy, client-side routing, shopping cart state management, and REST API consumption directly matching the core frontend duties.',
    },
    {
      name: 'DevPulse — Developer Portfolio & Blog Generator',
      reason:
        'Highlights responsive UI engineering, markdown rendering, and GitHub API integration relevant to dynamic web application development.',
    },
  ],
  interviewQuestions: [
    {
      question:
        'Explain how the React Virtual DOM diffing algorithm works and how React keys optimize rendering in lists.',
      category: 'Technical',
    },
    {
      question:
        'How do you manage complex shared state in a multi-page React application without causing unnecessary re-renders?',
      category: 'Technical',
    },
    {
      question:
        'What are the primary differences between SQL (e.g., PostgreSQL) and NoSQL (e.g., MongoDB) when architecting an e-commerce data model?',
      category: 'Technical',
    },
    {
      question:
        'Walk us through the architecture of your CampusMart project. What was the hardest architectural challenge you solved?',
      category: 'Project',
    },
    {
      question:
        'If you needed to migrate your DevPulse platform to TypeScript today, what approach and compiler configuration would you adopt?',
      category: 'Project',
    },
    {
      question:
        'Describe a time when you received constructive critique during a code review. How did you incorporate the feedback?',
      category: 'Behavioral',
    },
    {
      question:
        'How do you prioritize competing deadlines between academic exams and ongoing technical project deliverables?',
      category: 'Behavioral',
    },
    {
      question:
        'Tell me about an instance where you had to debug a production-like issue with limited documentation.',
      category: 'Behavioral',
    },
  ],
  jobRequirements: {
    technicalSkills: [
      'React.js',
      'TypeScript',
      'Node.js / Express',
      'REST APIs',
      'SQL / PostgreSQL',
    ],
    softSkills: [
      'Analytical Problem Solving',
      'Team Collaboration & Code Reviews',
      'Clear Written and Verbal Communication',
    ],
    experience: 'Fresher / B.Tech graduate or 0–2 years relevant software development experience',
    toolsAndTechnologies: [
      'Git / GitHub',
      'Docker',
      'Postman / API Clients',
      'AWS or Vercel',
      'Jest / Testing Frameworks',
    ],
  },
};

/**
 * Controller to handle resume analysis request.
 */
export async function handleAnalyze(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Please upload a valid resume PDF file.',
      });
    }

    const { jobDescription } = req.body;
    if (!jobDescription || jobDescription.trim().length < 20) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a detailed job description (at least 20 characters) for an accurate match analysis.',
      });
    }

    // Step 1: Extract text from PDF
    const { text: resumeText, numPages } = await extractTextFromPDF(req.file.buffer);

    // Step 2: Send extracted text + job description to Gemini AI
    const analysis = await analyzeResumeWithGemini(resumeText, jobDescription.trim());

    // Step 3: Return clean response
    return res.status(200).json({
      success: true,
      meta: {
        fileName: req.file.originalname,
        fileSize: req.file.size,
        numPages,
        analyzedAt: new Date().toISOString(),
      },
      data: analysis,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Controller to serve instant demo data.
 */
export function handleDemo(req, res) {
  return res.status(200).json({
    success: true,
    meta: {
      fileName: 'Alex_Johnson_Software_Engineer_Resume.pdf',
      fileSize: 142850,
      numPages: 1,
      analyzedAt: new Date().toISOString(),
      isDemo: true,
    },
    data: DEMO_ANALYSIS,
  });
}

/**
 * Health check controller.
 */
export function handleHealth(req, res) {
  const key = process.env.GEMINI_API_KEY || '';
  const isKeyConfigured = Boolean(
    key.trim() !== '' &&
    !key.includes('your_api_key_here') &&
    !key.includes('your_gemini_api_key_here') &&
    key.length > 20
  );

  return res.status(200).json({
    status: 'ok',
    service: 'CareerLens API',
    aiConfigured: isKeyConfigured,
    timestamp: new Date().toISOString(),
  });
}
