import axios from 'axios';

const request = axios.create(
    {
        baseURL: 'http://localhost:7777/'
    }
);

request.interceptors.request.use(
    async config => {
        const token = sessionStorage.getItem('access_token');
        config.headers = { 'authorization' : token }
        return config
    },
    error => {
        Promise.reject(error);
    }
);

request.interceptors.response.use(
    (res) => res.data,
    (e) => {
        // console.log(e);
        if (e.response?.status === 403) {
            sessionStorage.removeItem('access_token');
            window.location.href = '/' //will redirect to login
        }

        throw new Error(e.message || 'Unexpected Errors!')
    }
);

export default request;