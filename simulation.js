import express from 'express';
import { runSimulation, getPerformanceCurves, analyzeThermalBehavior } from '../controllers/simulationController.js';

const router = express.Router();

// Run motor simulation
router.post('/run', runSimulation);

// Get performance curves
router.post('/performance-curves', getPerformanceCurves);

// Thermal analysis
router.post('/thermal-analysis', analyzeThermalBehavior);

export default router;
