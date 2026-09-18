# CareerLens — AI Resume & Job Match Analyzer

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Frontend: React + Vite](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61dafb.svg)](https://vitejs.dev/)
[![Styling: Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38bdf8.svg)](https://tailwindcss.com/)
[![Backend: Node.js + Express](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933.svg)](https://expressjs.com/)
[![AI: Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange.svg)](https://aistudio.google.com/)

**CareerLens** is an intelligent, full-stack resume and job match analyzer designed for computer science and engineering students, early-career developers, and job seekers. It bridges the gap between candidate resumes and modern Applicant Tracking Systems (ATS) by providing an objective, AI-driven assessment of alignment against real job postings.

Users can upload their resume in PDF format, paste any target job description, and instantly receive a comprehensive dashboard covering match scores, skill overlaps, technical gaps, ATS keyword analysis, actionable suggestions, and tailored interview prep questions.

---

## 🌟 Key Features

- **In-Memory PDF Parsing**: Securely extracts text from standard PDF resumes using `pdf-parse` without permanently writing resumes to disk.
- **Objective Match Score**: Calculates a 0–100% alignment score and match categorization (Strong, Good, Moderate, Needs Improvement) using Google Gemini AI.
- **Comparative Skills Section**: Clearly distinguishes skills found in the resume from required competencies that are missing.
- **Job Requirements Breakdown**: Automatically categorizes job posting criteria into Technical Skills, Soft Skills, Experience Level, and Tools & Technologies.
- **Key Strengths & Growth Areas**: Identifies candidate competitive advantages alongside constructive feedback.
- **Actionable & Ethical Recommendations**: Delivers practical tips to strengthen bullet points and quantify impact without ever encouraging fabrication.
- **ATS Keyword Analysis**: Highlights critical keywords from the job description and denotes whether they were discovered in the candidate's resume.
- **Relevant Projects Highlighter**: Identifies actual projects from the candidate's resume that demonstrate qualifications for the role.
- **Tailored Interview Prep**: Generates 8–10 realistic interview questions categorized into **Technical**, **Project**, and **Behavioral** categories with interactive filtering and one-click copy.
- **Client-Side PDF Report Generation**: Generates and downloads a clean, multi-page executive assessment PDF report directly in the browser using `jspdf` and `jspdf-autotable`.
- **Instant Demo Mode**: Test the full dashboard immediately with realistic sample engineering candidate data without uploading a file.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React.js](https://react.dev/) (v18) with [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Reporting**: [jsPDF](https://github.com/parallax/jsPDF) & [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/)
- **File Handling**: [Multer](https://github.com/expressjs/multer) (in-memory buffer storage with strict PDF MIME checking)
- **PDF Extraction**: [pdf-parse](https://www.npmjs.com/package/pdf-parse)
- **CORS & Config**: `cors`, `dotenv`

### AI Integration
- **SDK**: [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)
- **Model**: `gemini-1.5-flash` with native JSON mode (`responseMimeType: "application/json"`)
- **Security**: Environment variable configuration; API keys are never bundled in frontend client builds.

---

## 🏛️ System Architecture

```
[User Browser]
      │
      ├─► 1. Uploads PDF Resume & pastes Job Description
      ▼
[Vite + React Client] (Port 5173)
      │
      ├─► POST /api/analyze (multipart/form-data)
      ▼
[Express Backend Server] (Port 5000)
      │
      ├─► Multer Middleware (validates 5MB limit, PDF MIME type, memory storage)
      │
      ├─► pdf-parse Service (extracts, cleans, and normalizes resume text)
      │
      ├─► Gemini AI Service (gemini-1.5-flash)
      │     └─ Enforces structured JSON output schema & zero-hallucination rules
      │
      ├─► Schema Normalization & Validation Middleware
      ▼
[React Results Dashboard]
      │
      ├─► Match Score Gauge & AI Assessment Summary
      ├─► Matching Skills vs Missing Skills Cards
      ├─► ATS Keyword Analysis & Job Requirements Breakdown
      ├─► Strengths, Weaknesses, and Actionable Recommendations
      ├─► Categorized Interview Preparation Questions
      └─► Client-Side Download Report (jsPDF)
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (bundled with Node)
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/)

---

### Step 1: Clone or Navigate to Project

```bash
cd g:/projects/ai
```

### Step 2: Install Dependencies

You can install all dependencies (root, server, and client) with a single command:

```bash
npm run install:all
```

Or manually install each directory:
```bash
# Root dependencies
npm install

# Server dependencies
cd server
npm install

# Client dependencies
cd ../client
npm install
cd ..
```

---

### Step 3: Configure Environment Variables

1. Navigate to the `server/` folder.
2. Copy `.env.example` to `.env`:
   ```bash
   cp server/.env.example server/.env
   # Or on Windows PowerShell:
   Copy-Item server/.env.example server/.env
   ```
3. Open `server/.env` and replace `your_gemini_api_key_here` with your actual Google Gemini API key:
   ```env
   PORT=5000
   GEMINI_API_KEY=AIzaSy...your_actual_key_here
   ```

> [!IMPORTANT]
> **API Key Security**: The `GEMINI_API_KEY` is strictly accessed by the backend server via `process.env`. It is **never** prefixed with `VITE_` or sent to the frontend client. `server/.env` is ignored by Git.

#### How to Obtain a Gemini API Key:
1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click **"Get API key"** in the top navigation.
4. Click **"Create API key"** and copy the generated key string into your `server/.env` file.

---

### Step 4: Run the Application

From the root directory, run both frontend and backend concurrently:

```bash
npm run dev
```

This starts:
- **Backend API Server**: `http://localhost:5000`
- **Frontend Vite Client**: `http://localhost:5173`

Open `http://localhost:5173` in your browser.

#### Running Individually (Alternative):
```bash
# In Terminal 1 (Backend):
cd server
npm run dev

# In Terminal 2 (Frontend):
cd client
npm run dev
```

---

## 🧪 Testing & Verification Guide

1. **View Demo**: On the landing page or navbar, click **"View Demo"** to immediately explore the complete results dashboard with sample engineering candidate data.
2. **Upload Valid Resume**: Navigate to the Analyzer page, upload a standard text-based PDF resume (under 5MB).
3. **Paste Job Description**: Click **"Load Sample Job"** or paste any software developer job description.
4. **Run Analysis**: Click **"Analyze Resume"** and observe the progressive stepped loading indicator.
5. **Review Dashboard**: Verify match score gauge, matching/missing skills, ATS keywords, and interview questions.
6. **Download Report**: Click **"Download Report"** to export an executive PDF summary to your local machine.
7. **Test Another Resume**: Click **"Analyze Another Resume"** to reset and evaluate a new role.
8. **Error Handling**: Try uploading a non-PDF file or submitting with an empty job description to verify friendly error alerts.

---

## 📦 Production Build

To test and compile the production build:

```bash
# Build client
cd client
npm run build
```

This generates optimized static assets in `client/dist/`.

---

## 🔮 Future Improvements

The following features represent logical next steps for future versions of CareerLens:

- **User Authentication**: Secure developer sign-in via OAuth / GitHub.
- **Historical Analysis & MongoDB Persistence**: Save past resumes, job applications, and match score histories.
- **Multiple Resume Versions**: Compare different resume variants against the same job posting to determine the highest match.
- **Job Application Tracker**: Kanban board tracking status from "Applied" through "Interview" and "Offer".
- **RAG-based Resume Knowledge Base**: Vector search over a candidate's complete GitHub projects, repositories, and technical blog posts.
- **LinkedIn Profile Import**: Direct parsing from public professional profiles.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
