import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdmin } from '../context/adminContext';
import adminService from '../service/adminService';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useAdmin();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [preview, setPreview] = useState('');
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    ProductName: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    hasWarranty: true,
    isRecommended: false,
  });

  // ✅ ហៅ API ផ្ទាល់
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await adminService.getProductById(id);
        const p = res.data;
        setFormData({
          ProductName: p.ProductName || '',
          description: p.description || '',
          price: p.price || '',
          category: p.category || '',
          stock: p.stock || '',
          hasWarranty: p.hasWarranty ?? true,
          isRecommended: p.isRecommended ?? false,
        });
        setPreview(p.image || '');
      } catch (err) {
        setFetchError('Failed to load product!');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value, // ✅ checkbox
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitError('');
      setSuccess(false);
      setIsLoading(true);

      let imageUrl = preview; // ✅ រក្សា image ចាស់មុន

      // ✅ បើមាន image ថ្មី → upload មុន
      if (image) {
        const imgData = new FormData();
        imgData.append('image', image);
        const imgRes = await adminService.uploadProductImage(imgData);
        imageUrl = imgRes.data.url; // ✅ Cloudinary URL ថ្មី
      }

      // ✅ ផ្ញើ JSON — type ត្រឹមត្រូវ
      const payload = {
        ProductName: formData.ProductName,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price), // ✅ Number
        stock: Number(formData.stock), // ✅ Number
        hasWarranty: Boolean(formData.hasWarranty), // ✅ Boolean
        isRecommended: Boolean(formData.isRecommended), // ✅ Boolean
        image: imageUrl, // ✅ URL
      };

      const res = await adminService.updateProduct(id, payload);
      dispatch({ type: 'UPDATE_PRODUCT', payload: res.data });

      setSuccess(true);
      setTimeout(() => navigate('/admin/products'), 1000);
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Update failed!');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading
  if (isLoading && !formData.ProductName) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Fetch Error
  if (fetchError) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <div className="alert alert-error max-w-sm">
          <span>{fetchError}</span>
        </div>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => navigate('/admin/products')}
        >
          ← Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => navigate('/admin/products')}
        >
          ← Back
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">
            Edit Product
          </h1>
          <p className="text-slate-500 text-sm">Update product information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Image */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center gap-4 h-fit">
          <div className="w-40 h-40 rounded-xl overflow-hidden bg-slate-100">
            <img
              src={preview || 'https://placehold.co/160x160?text=No+Image'}
              alt="product"
              className="object-cover w-full h-full"
            />
          </div>
          <label className="btn btn-primary btn-sm w-full">
            Change Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {/* ✅ Checkbox fields */}
          <div className="w-full flex flex-col gap-3 mt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="hasWarranty"
                checked={formData.hasWarranty}
                onChange={handleChange}
                className="checkbox checkbox-primary"
              />
              <span className="text-sm font-medium">Has Warranty</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isRecommended"
                checked={formData.isRecommended}
                onChange={handleChange}
                className="checkbox checkbox-warning"
              />
              <span className="text-sm font-medium">⭐ Recommended</span>
            </label>
          </div>
        </div>

        {/* Right — Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="font-bold text-slate-700 mb-6 uppercase text-xs tracking-wider">
            Product Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* ProductName */}
            <div className="form-control sm:col-span-2">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                name="ProductName"
                value={formData.ProductName}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Product Name"
              />
            </div>

            {/* Description */}
            <div className="form-control sm:col-span-2">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                placeholder="Description"
                rows={3}
              />
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price ($)</span>
              </label>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="0.00"
                min="0"
              />
            </div>

            {/* Stock */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Stock</span>
              </label>
              <input
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="0"
                min="0"
              />
            </div>

            {/* Category */}
            <div className="form-control sm:col-span-2">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Category"
              />
            </div>
          </div>

          {submitError && (
            <div className="alert alert-error mt-4">
              <span>{submitError}</span>
            </div>
          )}
          {success && (
            <div className="alert alert-success mt-4">
              <span>Updated successfully! ✅</span>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              className="btn btn-ghost"
              onClick={() => navigate('/admin/products')}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
