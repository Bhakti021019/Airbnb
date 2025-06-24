// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:4000/api', // your backend url
//   withCredentials: true,
// });

// export default api;








import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;