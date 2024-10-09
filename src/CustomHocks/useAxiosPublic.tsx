import axios  from 'axios';


const base: string = import.meta.env.VITE_BASE_URL;


const AxiosPublic = axios.create({
  baseURL: base,
});


const useAxiosPublic = () => {
  return AxiosPublic;
};

// Default export ব্যবহার করা হচ্ছে
export default useAxiosPublic;


