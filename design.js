import express from 'express';
import { createDesign, getDesigns, updateDesign, deleteDesign, getDesignById } from '../controllers/designController.js';

const router = express.Router();

// Design CRUD operations
router.post('/', createDesign);
router.get('/', getDesigns);
router.get('/:id', getDesignById);
router.put('/:id', updateDesign);
router.delete('/:id', deleteDesign);

export default router;
