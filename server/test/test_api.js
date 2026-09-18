import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:5000/api';

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);
  const data = await res.json();
  return { status: res.status, data };
}

async function runTests() {
  console.log('🧪 Starting CareerLens Backend Integration Tests...\n');
  let passed = 0;
  let failed = 0;

  // Test 1: Health Check
  try {
    const { status, data } = await fetchJSON(`${BASE_URL}/health`);
    if (status === 200 && data.status === 'ok') {
      console.log('✅ Test 1 Passed: /api/health returned 200 OK with status: ok');
      passed++;
    } else {
      console.error('❌ Test 1 Failed:', status, data);
      failed++;
    }
  } catch (err) {
    console.error('❌ Test 1 Failed to connect:', err.message);
    failed++;
  }

  // Test 2: Demo Data Endpoint
  try {
    const { status, data } = await fetchJSON(`${BASE_URL}/demo`);
    if (
      status === 200 &&
      data.success === true &&
      data.data.matchScore &&
      Array.isArray(data.data.matchingSkills) &&
      Array.isArray(data.data.interviewQuestions)
    ) {
      console.log(`✅ Test 2 Passed: /api/demo returned complete structured analysis (Score: ${data.data.matchScore}%)`);
      passed++;
    } else {
      console.error('❌ Test 2 Failed:', status, data);
      failed++;
    }
  } catch (err) {
    console.error('❌ Test 2 Error:', err.message);
    failed++;
  }

  // Test 3: Validation - Missing File
  try {
    const formData = new FormData();
    formData.append('jobDescription', 'Looking for React developer with 1+ years experience');

    const res = await fetch(`${BASE_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();

    if (res.status === 400 && data.success === false && data.error.includes('upload')) {
      console.log('✅ Test 3 Passed: Rejects request with missing resume PDF');
      passed++;
    } else {
      console.error('❌ Test 3 Failed:', res.status, data);
      failed++;
    }
  } catch (err) {
    console.error('❌ Test 3 Error:', err.message);
    failed++;
  }

  // Test 4: Validation - Empty Job Description
  try {
    const formData = new FormData();
    const pdfBuf = fs.readFileSync(path.join(__dirname, 'sample_resume.pdf'));
    const blob = new Blob([pdfBuf], { type: 'application/pdf' });
    formData.append('resume', blob, 'sample_resume.pdf');
    formData.append('jobDescription', '   ');

    const res = await fetch(`${BASE_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();

    if (res.status === 400 && data.success === false && data.error.includes('job description')) {
      console.log('✅ Test 4 Passed: Rejects request with empty job description');
      passed++;
    } else {
      console.error('❌ Test 4 Failed:', res.status, data);
      failed++;
    }
  } catch (err) {
    console.error('❌ Test 4 Error:', err.message);
    failed++;
  }

  // Test 5: Validation - Non-PDF upload
  try {
    const formData = new FormData();
    const txtBlob = new Blob(['This is not a PDF'], { type: 'text/plain' });
    formData.append('resume', txtBlob, 'resume.txt');
    formData.append('jobDescription', 'Senior React engineer needed.');

    const res = await fetch(`${BASE_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();

    if (res.status === 400 && data.success === false && data.error.includes('PDF')) {
      console.log('✅ Test 5 Passed: Rejects non-PDF file upload');
      passed++;
    } else {
      console.error('❌ Test 5 Failed:', res.status, data);
      failed++;
    }
  } catch (err) {
    console.error('❌ Test 5 Error:', err.message);
    failed++;
  }

  console.log(`\n📊 Integration Test Summary: ${passed} Passed, ${failed} Failed\n`);
  if (failed > 0) process.exitCode = 1;
}

runTests();
