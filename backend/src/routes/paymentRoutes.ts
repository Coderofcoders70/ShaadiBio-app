import express from 'express';
import { mockPaymentSuccess } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/mock-success', protect, mockPaymentSuccess);

export default router;