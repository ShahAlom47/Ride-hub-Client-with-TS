

import useAxiosPublic from "./useAxiosPublic";

interface ResponseDataType {
    success:boolean;
    message:string;
    discountAmount:number;
}


const useHandelCoupon = () => {
    const AxiosPublic = useAxiosPublic();

    const checkCoupon = async (couponCode: string, category: string, amount: number) => {

        const res = await AxiosPublic.post<ResponseDataType>('/coupon/checkCoupon', { couponCode, category, amount })
        return res.data as ResponseDataType
    }

    return { checkCoupon }
};

export default useHandelCoupon;