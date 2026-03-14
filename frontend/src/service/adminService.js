import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/admin',
});

// ✅ token interceptor ដូចគ្នា
API.interceptors.request.use((config) => {
  const savedUser = localStorage.getItem('user');
  try {
    const { token } = JSON.parse(savedUser);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch {
    localStorage.removeItem('user');
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/profile';
    }
    return Promise.reject(error);
  },
);

const adminService = {
  // Users
  getAllUsers: async () => {
    const response = await API.get('/getAll');
    return response.data;
  },
  deleteUser: async (id) => {
    const response = await API.delete(`/delete/${id}`);
    return response.data;
  },
  getAuditLogs: async (userId) => {
    const response = await API.get(`/audit-logs/${userId}`);
    return response.data;
  },

  updateUserRole: async (id, role) => {
    const response = await API.put(`/updateUserRole/${id}/role`, { role });
    return response.data;
  },
  getAllProducts: async () => {
    const response = await API.get('/getAllProduct');
    return response.data;
  },
  deleteProduct: async (id) => {
    const response = await API.delete(`/deleteProduct/${id}`);
    return response.data;
  },
  getProductById: async (id) => {
    const response = await API.get(`/getProductById/${id}`);
    return response.data;
  },

  updateProduct: async (id, data) => {
    const response = await API.put(`/updateProduct/${id}`, data, {
      headers: { 'Content-Type': 'application/json' }, // ✅ JSON
    });
    return response.data;
  },

  // ✅ upload image ដាច់ស្រឡះ
  uploadProductImage: async (formData) => {
    const response = await API.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export default adminService;
