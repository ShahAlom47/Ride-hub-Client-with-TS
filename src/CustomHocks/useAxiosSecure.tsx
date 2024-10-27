import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useUser from "./useUser";


const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
});

const useAxiosSecure = () => {
    const {logOutUser}=useUser()
      const navigate = useNavigate()


  
    useEffect(() => {

        axiosSecure.interceptors.request.use(function (config) {
          const token= localStorage.getItem('token')
          if (config.headers) { // Check if headers exist
            config.headers.authorization = `bearer ${token}`;
        } else {
            config.headers = { authorization: `bearer ${token}` }; // Create headers if not exist
        }
          return config;
        }, function (error) {
          
          return Promise.reject(error);
        });
    
        axiosSecure.interceptors.response.use(function (response) {
          return response;
        }, function (error) {
          const status= error.response?.status
          if(status===401|| status===403){
            
            Swal.fire(error.response.data.message)
            logOutUser()
            .then(()=>{
             
              navigate('/login')
            })
            
          }
          return Promise.reject(error);
        });
      
      }, [navigate,logOutUser])



    return axiosSecure;
};

export default useAxiosSecure;