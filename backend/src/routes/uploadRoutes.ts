import express from 'express';
import { upload } from '../config/cloudinary.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
router.post('/', protect, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // 'path' is the Cloudinary URL
  res.status(200).json({
    message: 'Image uploaded successfully',
    url: req.file.path, 
  });
});

export default router;