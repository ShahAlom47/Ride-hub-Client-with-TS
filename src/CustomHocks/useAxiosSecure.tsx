import axios from "axios";
import { useEffect } from "react";


const axiosSecure = axios.create({
    baseURL: import.meta.env.BASE_URL
});

const useAxiosSecure = () => {


    useEffect(() => {

        axios.interceptors.request.use(function (config) {
            const token= localStorage.getItem('token')

            console.log(token,config);

            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });

        // Add a response interceptor
        axios.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        });

    }, [])



    return axiosSecure;
};

export default useAxiosSecure;