import express from 'express';
import { saveBioData, getMyBioData, getBioDataById, getAllMyBioData, cloneBiodata, deleteBiodata } from '../controllers/bioDataController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Both routes are protected
router.route('/').post(protect, saveBioData).get(protect, getMyBioData);
router.get('/all', protect, getAllMyBioData);
router.post('/clone/:id', protect, cloneBiodata);
router.get('/:id', protect, getBioDataById);

router.route('/:id').get(protect, getBioDataById).delete(protect, deleteBiodata);

export default router;