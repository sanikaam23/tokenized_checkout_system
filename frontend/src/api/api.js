import axios from 'axios';

// 🔗 Base Axios instance
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // change to your backend URL
  withCredentials: true, // if using cookies for auth
});

// 🔑 Add JWT token to requests (if using auth tokens)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 🛒 Products API
export const fetchProducts = () => API.get('/products');

// 🔐 Auth APIs
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const signupUser = (data) => API.post('/auth/signup', data);
export const getProfile = () => API.get('/auth/profile');

// 💳 Payments APIs (using Stripe or Razorpay)
export const createPaymentIntent = (paymentData) =>
  API.post('/payments/create-payment-intent', paymentData);

export const createPaymentToken = (cardDetails) =>
  API.post('/payments/create-token', cardDetails);

export const processPayment = (tokenData) =>
  API.post('/payments/process-payment', tokenData);

// 📦 Orders APIs
export const fetchOrders = () => API.get('/orders');
export const createOrder = (orderData) => API.post('/orders', orderData);

export default API;
