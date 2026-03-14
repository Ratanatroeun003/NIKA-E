import User from '../Models/UserModel.js';
import Product from '../Models/ProductModel.js';
import AuditLog from '../Models/AuditLogModel.js';

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
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // 👈 យក ID ពី URL (ឧទាហរណ៍៖ /api/users/:id)

    // ១. ស្វែងរក និងលុបក្នុងពេលតែមួយ
    const user = await User.findByIdAndDelete(id);

    // ២. បើរកមិនឃើញ User ដែលត្រូវលុប
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
      });
    }

    // ៣. បើលុបជោគជ័យ
    return res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const oldUser = await User.findById(id).select('role');

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { returnDocument: 'after' },
    ).select('-password');

    // ✅ save audit log
    await AuditLog.create({
      action: 'ROLE_CHANGED',
      targetUser: id,
      changedBy: req.user.id,
      before: { role: oldUser.role },
      after: { role },
    });

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// AdminController.js
export const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find({ targetUser: req.params.userId })
      .populate('changedBy', 'fname lname avatar')
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: logs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, success: false, message: 'Server Error' });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found!' });
    }
    return res
      .status(200)
      .json({ success: true, message: 'Product delete successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// AdminController.js
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found!' });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
    });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found!' });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image provided!',
      });
    }
    return res.status(200).json({
      success: true,
      data: { url: req.file.path }, // ✅ ដូច Register
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
