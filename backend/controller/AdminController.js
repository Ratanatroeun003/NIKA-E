import User from '../Models/UserModel.js';

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password') // ✅ លុប password
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
