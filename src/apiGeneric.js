import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/" 
    // baseURL: "http://java-api/" 
});

export default api;