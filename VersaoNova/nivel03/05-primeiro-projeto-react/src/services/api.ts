import axios from 'axios';

// Para ter acesso à api's externas
const api = axios.create({
    baseURL: 'https://api.github.com/',
});

export default api;