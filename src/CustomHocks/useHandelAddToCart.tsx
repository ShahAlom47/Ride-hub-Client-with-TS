
import Swal from "sweetalert2";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";
import { useNavigate } from "react-router-dom";
import useUserData from "./useUserData";
interface ResType {
    status: boolean;
    message: string;
}
const useHandelAddToCart = () => {
    const AxiosPublic = useAxiosPublic()
    const { user } = useUser();
    const {refetch}=useUserData()
    const navigate = useNavigate()

    const addProduct = async (id: string): Promise<boolean> => {
        if (!user) {
            Swal.fire({
                title: 'Login Required',
                text: 'Please log in to access this Cart.',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#4d4a4a",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return false;
        }
    
        try {
            const res = await AxiosPublic.post<ResType>(`/users/addToCartProduct/${user?.email}`, { id });
            if (res?.data?.status) {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: res?.data?.message,
                    showConfirmButton: false,
                    timer: 2000,
                });
                refetch()
                return true;
            }
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: res?.data?.message,
                showConfirmButton: false,
                timer: 2000,
            });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Failed to add product to cart. Please try again.',
                showConfirmButton: false,
                timer: 2000,
            });
        }
    
        return false;
    };
    

    const removeProduct = async (id: string) => {
        const res = await AxiosPublic.delete<ResType>(`/users/removeCartProduct?id=${id}&userEmail=${user?.email}`);
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: res?.data?.status?'success':'info',
            title: res?.data?.message,
            showConfirmButton: false,
            timer: 2000,
        });
        
        return res.data;
    };

    return {
        addProduct,
        removeProduct,
    }
};

export default useHandelAddToCart;