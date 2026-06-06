import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  console.error(
    '[API] VITE_API_URL is not set. ' +
    'Add it to .env (local) or Vercel Environment Variables (production).'
  );
}

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export default api;
