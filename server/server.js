import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRoutes from './routes/analyzeRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend clients
app.use(
  cors({
    origin: true, // Allows all origins, including Vercel domains
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route for quick verification
app.get('/', (req, res) => {
  res.json({
    name: 'CareerLens API',
    version: '1.0.0',
    description: 'AI Resume & Job Match Analyzer API',
    endpoints: {
      health: 'GET /api/health',
      demo: 'GET /api/demo',
      analyze: 'POST /api/analyze (multipart/form-data with resume and jobDescription)',
    },
  });
});

// Mount API routes
app.use('/api', analyzeRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// Centralized error handling
app.use(errorHandler);

// Start server if not running on Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    const key = process.env.GEMINI_API_KEY || '';
    const isConfigured = Boolean(
      key.trim() !== '' &&
      !key.includes('your_api_key_here') &&
      !key.includes('your_gemini_api_key_here') &&
      key.length > 20
    );
    console.log(`🚀 CareerLens server listening on http://localhost:${PORT}`);
    console.log(`🔑 Gemini API configured: ${isConfigured}`);
  });
}

// Export for Vercel Serverless Functions
export default app;
