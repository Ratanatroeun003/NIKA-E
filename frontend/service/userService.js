import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/user',
});

const userService = {
  register: async (userData) => {
    const response = await API.post('/RegisterUser', userData);
    return response.data;
  },

  login: async (loginData) => {
    const response = await API.post('/LoginUser', loginData);
    return response.data;
  },
};

export default userService;
