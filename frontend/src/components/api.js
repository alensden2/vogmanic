import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6001/', // Replace this with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to attach the access token to the request header before each request is sent
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
