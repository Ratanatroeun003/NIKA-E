import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/user',
});
// helper functions
const getToken = () => {
  try {
    const savedUser = localStorage.getItem('user');
    const { token } = JSON.parse(savedUser);
    return token;
  } catch {
    return null;
  }
};

const clearSession = () => {
  localStorage.removeItem('user');
  window.location.href = '/profile';
};

// ===== Request — បន្ថែម Token =====
API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===== Response — Handle Error =====
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearSession(); // logout
    }
    return Promise.reject(error);
  },
);
const userService = {
  register: async (userData) => {
    const response = await API.post('/RegisterUser', userData);
    return response.data;
  },
  login: async (loginData) => {
    const response = await API.post('/LoginUser', loginData);
    return response.data;
  },
  getProfile: async () => {
    const response = await API.get('/get-profile');
    return response.data;
  },
  getUserById: async (id) => {
    const response = await API.get(`/getUserById/${id}`);
    return response.data;
  },
  updateProfile: async (userData) => {
    const response = await API.put('/update-user', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
export default userService;
