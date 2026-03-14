import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/adminContext';
import adminService from '../service/adminService';

const AdminProduct = () => {
  const { state, dispatch } = useAdmin();
  const nav = useNavigate();
  const [search, setSearch] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch({ type: 'ADMIN_REQUEST' });
        const res = await adminService.getAllProducts();
        dispatch({ type: 'GET_ALL_PRODUCTS', payload: res.data });
      } catch (error) {
        dispatch({ type: 'ADMIN_FAIL', payload: error.message });
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('តើអ្នកប្រាកដថាចង់លុប Product នេះមែនទេ?')) return;
    try {
      await adminService.deleteProduct(id);
      dispatch({ type: 'DELETE_PRODUCT', payload: id });
      setSuccessMsg('លុបបានជោគជ័យ!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      dispatch({ type: 'ADMIN_FAIL', payload: error.message });
    }
  };

  const filteredProducts = state.products?.filter((p) =>
    `${p.ProductName} ${p.category}`
      .toLowerCase()
      .replace(/\s+/g, '')
      .includes(search.toLowerCase().replace(/\s+/g, '')),
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Products</h1>
          <p className="text-slate-500 text-sm">
            Total:{' '}
            <span className="font-bold text-primary">
              {state.products?.length || 0}
            </span>{' '}
            products
          </p>
        </div>
      </div>

      {/* Search + Add */}
      <div className="flex gap-3 justify-between">
        <input
          type="text"
          placeholder="Search by name or category..."
          className="input input-bordered w-full max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setSearch('')}
          >
            ✕ Clear
          </button>
        )}
        <button
          className="btn btn-primary btn-sm"
          onClick={() => nav('/admin/products/add')}
        >
          + Add Product
        </button>
      </div>

      {successMsg && (
        <div className="alert alert-success">
          <span>{successMsg}</span>
        </div>
      )}
      {state.error && (
        <div className="alert alert-error">
          <span>{state.error}</span>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-slate-50">
              <tr className="text-slate-500 text-[11px] uppercase">
                <th className="px-6 py-4">#</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock / Sold</th>
                <th>Warranty</th>
                <th>Recommended</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {state.isLoading ? (
                <tr>
                  <td colSpan="8" className="text-center py-10">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                  </td>
                </tr>
              ) : filteredProducts?.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-slate-400">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts?.map((product, index) => (
                  <tr
                    key={product._id}
                    className="border-b border-slate-50 hover:bg-slate-50 transition-colors"
                  >
                    {/* # */}
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {index + 1}
                    </td>

                    {/* Product */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                          <img
                            src={
                              product.image ||
                              'https://placehold.co/48x48?text=No+Image'
                            }
                            alt={product.ProductName}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          {/* ✅ ProductName */}
                          <p className="font-bold text-slate-700 text-sm">
                            {product.ProductName}
                          </p>
                          <p className="text-[11px] text-slate-400 line-clamp-1">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td>
                      <span className="badge badge-ghost badge-sm">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="text-sm font-bold text-slate-700">
                      ${product.price?.toFixed(2)}
                    </td>

                    {/* Stock / Sold */}
                    <td>
                      <div className="flex flex-col gap-1">
                        <span
                          className={`badge badge-sm font-medium ${
                            product.stock > 10
                              ? 'badge-success'
                              : product.stock > 0
                                ? 'badge-warning'
                                : 'badge-error'
                          }`}
                        >
                          {product.stock > 0
                            ? `${product.stock} left`
                            : 'Out of stock'}
                        </span>
                        {/* ✅ sold */}
                        <span className="text-[10px] text-slate-400">
                          Sold: {product.sold}
                        </span>
                      </div>
                    </td>

                    {/* ✅ hasWarranty */}
                    <td>
                      <span
                        className={`badge badge-sm ${product.hasWarranty ? 'badge-success' : 'badge-ghost'}`}
                      >
                        {product.hasWarranty ? '✅ Yes' : '❌ No'}
                      </span>
                    </td>

                    {/* ✅ isRecommended */}
                    <td>
                      <span
                        className={`badge badge-sm ${product.isRecommended ? 'badge-warning' : 'badge-ghost'}`}
                      >
                        {product.isRecommended ? '⭐ Yes' : 'No'}
                      </span>
                    </td>

                    {/* Action */}
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-xs btn-info btn-outline"
                          onClick={() =>
                            nav(`/admin/updateProduct/${product._id}`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-xs btn-error btn-outline"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
