import mongoose from 'mongoose';
const ProductSchema = mongoose.Schema(
  {
    ProductName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    hasWarranty: {
      type: Boolean,
      default: true,
    },
    isRecommended: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
const Product = mongoose.model('Product', ProductSchema);
export default Product;
