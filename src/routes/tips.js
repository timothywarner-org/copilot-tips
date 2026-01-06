/**
 * Tips routes - handles all /api/tips endpoints
 * Focus on GET operations for teaching Copilot debugging
 */
import express from 'express';
import * as tipController from '../controllers/tipController.js';

const router = express.Router();

// GET routes (primary focus for the course)
router.get('/', tipController.getAll);
router.get('/random', tipController.getRandom);
router.get('/topic/:topic', tipController.getByTopic);
router.get('/:id', tipController.getById);

// CRUD routes (secondary - for completeness)
router.post('/', tipController.create);
router.put('/:id', tipController.update);
router.delete('/:id', tipController.remove);

export default router;
