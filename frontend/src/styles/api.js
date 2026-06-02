import api from "../api/axios";

const API = axios.create({
    baseURL:"http://localhost:5000/api"
});

export default API;