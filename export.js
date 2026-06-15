import express from 'express';
import { exportPDF, exportJSON, exportCAD } from '../controllers/exportController.js';

const router = express.Router();

// Export design as PDF
router.post('/pdf', exportPDF);

// Export design as JSON
router.post('/json', exportJSON);

// Export design data for CAD
router.post('/cad', exportCAD);

export default router;
