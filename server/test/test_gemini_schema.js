import { analyzeResumeWithGemini } from '../services/geminiService.js';

// Verify that calling analyzeResumeWithGemini with missing key raises clean, descriptive error
async function testMissingKey() {
  try {
    await analyzeResumeWithGemini('Resume text sample', 'Job description sample');
    console.error('❌ Should have thrown missing key error');
    return false;
  } catch (err) {
    if (err.message.includes('GEMINI_API_KEY is not configured')) {
      console.log('✅ Gemini service accurately enforces missing key protection');
      return true;
    }
    console.error('❌ Unexpected error message:', err.message);
    return false;
  }
}

async function run() {
  console.log('🧪 Testing Gemini Service Guardrails...');
  const success = await testMissingKey();
  if (!success) process.exitCode = 1;
}

run();
