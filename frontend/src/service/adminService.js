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
    const response = await API.delete(`/users/${id}`);
    return response.data;
  },

  updateUserRole: async (id, role) => {
    const response = await API.put(`/users/${id}/role`, { role });
    return response.data;
  },

  // Products
  getAllProducts: async () => {
    const response = await API.get('/products');
    return response.data;
  },
};

export default adminService;
