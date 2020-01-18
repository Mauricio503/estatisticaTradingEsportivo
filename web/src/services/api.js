import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3330-d93384df-4c0f-4a1b-96e7-9a2622a1fc2b.ws-us02.gitpod.io/'
});

export default api;