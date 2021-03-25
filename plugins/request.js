import axios from 'axios';
export const request = axios.create({
    baseURL: 'http://127.0.0.1:5000/api'
})
export default ({store}) => {
   return request.interceptors.request.use(function (config) {
        console.log(config)
        const {user}=store.state;
        if(user && user.token){
            config.headers.Authorization = `Token ${user.token}`
        }
        
        return config
    }, error => {
        return Promise.reject(error)
    })

}