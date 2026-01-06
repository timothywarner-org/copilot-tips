/**
 * Main router - aggregates all API routes
 */
import express from 'express';
import tipRoutes from './tips.js';

const router = express.Router();

// Mount tip routes
router.use('/tips', tipRoutes);

export default router;
