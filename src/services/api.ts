import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_BASEURL_API,
    headers: {
        Authorization: 'Bearer ' + import.meta.env.VITE_TOKEN_API
    },
    timeout: 10000
})

export default api;
