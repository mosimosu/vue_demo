import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const apiBatch = {
    signUp: '/users',
    login: '/users/sign_in',
    postTodos: '/todos',
    getTodos: '/todos',
    deleteTodos: '/todos',
    check: '/check'
}

api.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token.split(' ')[1]}`;
    }
    return config;
}, error => Promise.reject(error));

const requestToAPI = async (method, url, data = null) => {
    try {
        if (method === 'get') {
            return await api.get(url, data ? { params: data } : undefined);
        }
        return await api[method](url, data);
    } catch (error) {
        // Standardize error response
        return { error: true, message: error.response?.data?.message || error.message };
    }
};

export const getToAPI = (url) => requestToAPI('get', url);
export const postToAPI = ({ url, data }) => requestToAPI('post', url, data);
export const putToAPI = ({ url, data }) => requestToAPI('put', `${url}/${data.id}`, data);
export const patchToAPI = ({ url, data }) => requestToAPI('patch', `${url}/${data.id}/toggle`, data);
export const deleteToAPI = ({ url, data }) => requestToAPI('delete', `${url}/${data.id}`);