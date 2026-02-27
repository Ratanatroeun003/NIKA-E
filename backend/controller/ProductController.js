import Product from '../Models/ProductModel.js';

//create products
export const createProduct = async (req, res) => {
  const {
    ProductName,
    description,
    price,
    category,
    image,
    hasWarranty,
    isRecommended,
    stock,
  } = req.body;
  try {
    const newProduct = new Product({
      ProductName,
      description,
      price,
      category,
      image,
      hasWarranty,
      isRecommended,
      stock,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ success: true, message: 'Product saved', data: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// getAllProduct
export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: products, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, success: false, message: 'Server Error' });
  }
};
export const recommendedProduct = async (req, res) => {
  try {
    const randomProduct = await Product.aggregate([
      { $match: { isRecommended: true } }, // filter only recommended
      { $sample: { size: 1 } }, // pick 1 random
    ]);

    res.status(200).json({
      success: true,
      data: randomProduct[0] || null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const latestProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
