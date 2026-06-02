import api from "../api/axios";

const API = axios.create({
    baseURL: "https://student-management-system-1-l7p0.onrender.com/api"
});

export default API;