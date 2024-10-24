import axios  from 'axios';


const base: string = import.meta.env.VITE_BASE_URL;


const AxiosPublic = axios.create({
  baseURL: base,
});


const useAxiosPublic = () => {
  return AxiosPublic;
};


export default useAxiosPublic;


