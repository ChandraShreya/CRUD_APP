import axios from "axios"
// import { cookies } from "next/headers";
import { Cookies } from "react-cookie";
export const baseURL = `http://localhost:4000/`
let cookies= new Cookies()
export const AxiosInstance = axios.create({
     baseURL
})
export default AxiosInstance

AxiosInstance.interceptors.request.use(
     function (config) {

          const token = cookies.get("token");
          console.log(token, "token");
          if (token) {
               config.headers = config.headers || {};
               config.headers["x-access-token"] = token;
          }
          return config;
     },
     function (error) {
          return Promise.reject(error);
     }
);

