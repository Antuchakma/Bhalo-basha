import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:5002',
    withCredentials:true
})

export default api;