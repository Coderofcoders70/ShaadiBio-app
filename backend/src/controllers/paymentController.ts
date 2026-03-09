import { User } from '../models/User.js';
import type { Response } from 'express';

// @desc    Simulate successful payment and upgrade user
// @route   POST /api/payments/mock-success
export const mockPaymentSuccess = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isPremium = true; // Toggle the premium flag
    await user.save();

    res.json({ 
      message: 'Payment Successful! You are now a Premium member.',
      isPremium: true 
    });
  } catch (error) {
    res.status(500).json({ message: 'Payment processing failed' });
  }
};