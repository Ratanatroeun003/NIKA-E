import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api/product' });
const productService = {
  getAll: async () => {
    const Response = await API.get('/getAllProduct');
    return Response.data;
  },
  getRecommended: async () => {
    const Response = await API.get('/recommendedPro');
    return Response.data;
  },
  getLatestProduct: async () => {
    const Response = await API.get('/latestProduct');
    return Response.data;
  },
};
export default productService;
