import axios from 'axios';
import { VITE_APP_API_URL } from 'utilities';

export * from './services/events';

const axiosInstance = axios.create({
  baseURL: VITE_APP_API_URL,
});

export default axiosInstance;
