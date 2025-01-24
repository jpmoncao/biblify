import axios from "axios"

const apiBible = axios.create({
    baseURL: import.meta.env.VITE_BASEURL_API_BIBLE,
    headers: {
        Authorization: 'Bearer ' + import.meta.env.VITE_TOKEN_API_BIBLE
    },
    timeout: 10000
});

const apiAccount = axios.create({
    baseURL: import.meta.env.VITE_BASEURL_API_ACCOUNT,
    timeout: 60000
});

export { apiBible, apiAccount };
