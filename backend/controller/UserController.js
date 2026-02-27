import User from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';
// create user
export const RegisterUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: 'User Already Exist',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    const userResponse = newUser.toObject();
    delete userResponse.password;
    res.status(201).json({ success: true, data: userResponse });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Server error', error: error.message });
  }
};
export const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found!' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials!' });
    }
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(200).json({
      success: true,
      message: 'Login successfully',
      data: userResponse,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Server Error', error: error.message });
  }
};
