import type { Request, Response } from 'express';
import { BioData } from '../models/BioData.js';

interface AuthRequest extends Request {
  user?: any;
}

export const getAllMyBioData = async (req: AuthRequest, res: Response) => {
  try {
    const versions = await BioData.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json(versions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching versions' });
  }
};

export const getBioDataById = async (req: AuthRequest, res: Response) => {
  try {
    const bio = await BioData.findById(req.params.id);
    if (!bio) return res.status(404).json({ message: 'Not found' });

    // Verify ownership
    if (bio.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    res.json(bio);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching specific version' });
  }
};

// @desc    Clone a specific BioData version (FR-15)
export const cloneBiodata = async (req: AuthRequest, res: Response) => {
  try {
    const original = await BioData.findById(req.params.id);
    if (!original) return res.status(404).json({ message: "Original not found" });

    // Verify ownership
    if (original.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // FIXED: Instead of 'delete', use destructuring to avoid ts(2790)
    const { _id, createdAt, updatedAt, ...rest } = original.toObject();

    const newVersion = new BioData({
      ...rest,
      versionName: `${original.versionName || 'Profile'} (Copy)`,
      isPrimary: false
    });

    await newVersion.save();
    res.status(201).json(newVersion);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Create or Update BioData
// @route   POST /api/biodata
export const saveBioData = async (req: AuthRequest, res: Response) => {
  const { _id, personal, ...rest } = req.body;

  // CLEANING: If dob is an empty string, set it to null so Mongoose doesn't crash
  if (personal && personal.dob === "") {
    personal.dob = null;
  }

  try {
    let bio;
    if (_id) {
      bio = await BioData.findById(_id);
      if (bio && bio.userId.toString() === req.user._id.toString()) {
        Object.assign(bio, { personal, ...rest });
        const updatedBio = await bio.save();
        return res.json(updatedBio);
      }
    }

    // Create new version
    const newBioData = new BioData({
      userId: req.user._id,
      personal,
      ...rest
    });

    const savedBio = await newBioData.save();
    res.status(201).json(savedBio);
  } catch (error: any) {
    console.error("VALIDATION ERROR:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get user BioData
// @route   GET /api/biodata
export const getMyBioData = async (req: AuthRequest, res: Response) => {
  try {
    const bioData = await BioData.findOne({ userId: req.user._id });
    if (bioData) {
      res.json(bioData);
    } else {
      res.status(404).json({ message: 'BioData not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a specific BioData version
// @route   DELETE /api/biodata/:id
export const deleteBiodata = async (req: AuthRequest, res: Response) => {
  try {
    const bio = await BioData.findById(req.params.id);

    if (!bio) {
      return res.status(404).json({ message: 'Biodata not found' });
    }

    // Security check: Ensure the user owns this profile
    if (bio.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await BioData.findByIdAndDelete(req.params.id);
    res.json({ message: 'Profile removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting biodata' });
  }
};