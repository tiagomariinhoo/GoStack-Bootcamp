import axios from 'axios'

export const api = axios.create({ // Axios instance
    baseURL: 'http://localhost:3000/api',
    // headers
})