import axios from "axios";
const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_API_URL, ///base url for all the requests to the backend
    withCredentials:true ///browser will send cookies with every request to the backend
});
export default axiosInstance;
