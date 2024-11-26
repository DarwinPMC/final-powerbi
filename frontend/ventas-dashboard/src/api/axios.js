import axios from 'axios';

// Configuración de Axios con la URL base del backend Flask
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000', // URL de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
