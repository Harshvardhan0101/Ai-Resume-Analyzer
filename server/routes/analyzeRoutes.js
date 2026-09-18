import { Router } from 'express';
import { uploadResume } from '../middleware/uploadMiddleware.js';
import { handleAnalyze, handleDemo, handleHealth } from '../controllers/analyzeController.js';

const router = Router();

// Routes
router.post('/analyze', uploadResume, handleAnalyze);
router.get('/demo', handleDemo);
router.get('/health', handleHealth);

export default router;
