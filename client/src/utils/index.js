import axios from "axios";

const api = axios.create({
  baseURL: 'https://react-chat-app-smwr.onrender.com' 
})

const token = localStorage.getItem('token');

if(token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if(token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
})

export default api;