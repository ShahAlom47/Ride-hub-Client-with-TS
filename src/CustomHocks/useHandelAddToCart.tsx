
import Swal from "sweetalert2";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";
interface ResType {
    status: boolean;
    message: string;
}
const useHandelAddToCart = () => {
    const AxiosPublic = useAxiosPublic()
    const { user } = useUser();

    const addProduct = async (id: string) => {
        const res = await AxiosPublic.post<ResType>(`/users/addToCartProduct/${user?.email}`, { id })
        if (res?.data?.status) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: res?.data?.message,
                showConfirmButton: false,
                timer: 2000,
            });
            return
        }
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: res?.data?.message,
            showConfirmButton: false,
            timer: 2000,
        });


    }


    return {
        addProduct
    }
};

export default useHandelAddToCart;