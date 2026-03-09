import { User } from '../models/User.js';
import { BioData } from '../models/BioData.js';

export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// @desc    Toggle Premium/Admin status or Delete User
export const updateUserStatus = async (req: any, res: any) => {
  const { id } = req.params;
  const { isPremium, isAdmin, action } = req.body;

  try {
    if (action === 'delete') {
      await User.findByIdAndDelete(id);
      return res.json({ message: 'User deleted successfully' });
    }

    const user = await User.findById(id);
    if (user) {
      if (typeof isPremium !== 'undefined') user.isPremium = isPremium;
      if (typeof isAdmin !== 'undefined') user.isAdmin = isAdmin;
      await user.save();
      res.json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Update failed' });
  }
};

export const getAdminStats = async (req: any, res: any) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBioDatas = await BioData.countDocuments();
    const premiumUsers = await User.countDocuments({ isPremium: true });
    
    const recentActivity = await BioData.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({ 
      totalUsers, 
      totalBioDatas, 
      premiumUsers, 
      recentActivity 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
};