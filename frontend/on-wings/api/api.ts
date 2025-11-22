import axios from 'axios';
import { cookies } from 'next/headers';

const API_URL = 'http://localhost:8000/api/auth/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('jwt')?.value;
    
    if (token && !config.url?.includes('login/') && !config.url?.includes('register/')) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
