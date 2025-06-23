// export const getProfile = async (req, res) => {
//   // req.user is set by authMiddleware
//   res.json({
//     id: req.user._id,
//     email: req.user.email,
//     name: req.user.name,
//   });
// };



import User from '../models/User.js';

export const updateProfile = async (req, res) => {
  try {
    const { email, phone } = req.body;
    const userId = req.user.id; // Set by your auth middleware
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email, phone },
      { new: true, runValidators: true, select: '-password' }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};




