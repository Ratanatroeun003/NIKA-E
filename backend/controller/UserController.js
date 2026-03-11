import User from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const generateToken = (id, role) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' },
  );
};
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

    const user = await newUser.save();
    const token = generateToken(user._id, user.role);
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(201).json({
      success: true,
      message: 'successful register',
      data: userResponse,
      token: token,
    });
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
    const token = generateToken(user._id, user.role);
    const userResponse = user.toObject();
    delete userResponse.password;
    res.status(200).json({
      success: true,
      message: 'Login successfully',
      data: userResponse,
      token: token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Server Error', error: error.message });
  }
};
export const GetProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found!' });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const UpdateUser = async (req, res) => {
  const { fname, lname, address, phone, gender, email, password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    if (email && email !== user.email) {
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        return res.status(400).json({
          success: false,
          message: 'Email Already Exist!',
          field: 'email',
        });
      }
    }
    let hashedPassword = user.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }
    let userAvatar = user.avatar;
    if (req.file) {
      userAvatar = req.file.path;
    }
    user.fname = fname || user.fname;
    user.lname = lname || user.lname;
    user.address = address || user.address;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.email = email || user.email;
    user.password = hashedPassword;
    user.avatar = userAvatar;
    const updatedUser = await user.save();
    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: userResponse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
