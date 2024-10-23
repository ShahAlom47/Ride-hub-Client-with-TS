


import useAxiosPublic from "./useAxiosPublic";

interface ResponseDataType {
    success:boolean;
    message:string;
    discountAmount?:number;
}
interface AddCouponUserDataType {
    couponValue:string|null;
    userEmail:string;
    userName:string;
    orderId:string;
    finalAmount: number;
    discountAmount:number;

}


const useHandelCoupon = () => {
    const AxiosPublic = useAxiosPublic();

    const checkCoupon = async (couponCode: string, category: string, amount: number) => {

        const res = await AxiosPublic.post<ResponseDataType>('/coupon/checkCoupon', { couponCode, category, amount })
        return res.data as ResponseDataType
    }

    const addCouponUser = async ( data:AddCouponUserDataType ): Promise <ResponseDataType> =>{
        const {couponValue,userEmail,discountAmount,finalAmount,userName,orderId}=data;
        const couponCategory ='bikesProduct'
        const finalData = {
            orderId,
            userName,
            userEmail,
            finalAmount,
            discountAmount,
            usedAt:new Date().toISOString(),
            couponValue,

        }

        const addingRes= await AxiosPublic.patch <ResponseDataType> (`/coupon/addCouponUser/${couponCategory}`,finalData)
        console.log(addingRes);
        return addingRes?.data as ResponseDataType


    }

    return { checkCoupon,addCouponUser }
};

export default useHandelCoupon;