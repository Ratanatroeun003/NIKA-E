import User from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';
// create user
export const RegisterUser = async (req, res) => {
  const { fname, lname, address, phone, gender, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist)
      return res
        .status(400)
        .json({ success: false, message: 'User Exist', field: 'email' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      // 👈 ចាប់យក URL រូបភាពពី Cloudinary
      avatar: req.file
        ? req.file.path
        : 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      fname,
      lname,
      address,
      phone,
      gender,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found!', field: 'email' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials!',
        field: 'password',
      });
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
