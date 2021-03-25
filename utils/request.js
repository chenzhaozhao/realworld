import axios from 'axios';
const request = axios.create({
    baseURL: 'http://127.0.0.1:5000/api'
})
request.interceptors.request.use(function (config) {
    config.headers.Authorization = `Token `
    return config
}, error => {
    return Promise.reject(error)
})
export default request