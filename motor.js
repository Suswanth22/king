import express from 'express';
import { calculateMotorSpecs, getMotorStandards, validateMotorParameters } from '../controllers/motorController.js';

const router = express.Router();

// Calculate motor specifications
router.post('/calculate', calculateMotorSpecs);

// Get NEMA/IEC standards reference
router.get('/standards/:standard', getMotorStandards);

// Validate motor parameters
router.post('/validate', validateMotorParameters);

export default router;
