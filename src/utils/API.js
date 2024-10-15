import axios from 'axios';

const API_KEY = process.env.REACT_APP_ACCESS_KEY; // Get the API key from the environment variables
const api = axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: `Client-ID ${API_KEY}` // Set the Authorization header
  }
});

export default api;
