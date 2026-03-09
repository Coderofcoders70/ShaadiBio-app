import express from 'express';
import { getAdminStats, getAllUsers, updateUserStatus } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', protect, admin, getAllUsers);
router.get('/stats', protect, admin, getAdminStats);
router.put('/users/:id', protect, admin, updateUserStatus);
router.delete('/users/:id', protect, admin, updateUserStatus);

export default router;