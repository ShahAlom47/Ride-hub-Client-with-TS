import { useLocation} from "react-router-dom";
import PageHeading from "../../SharedComponent/PageHeading/PageHeading";
import headingImg from '../../assets/Banner-Img/bike-page-banner.jpg';
import React, { useState } from "react";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import CheckOutForm, { OrderFormInputs } from "./CheckOutForm/CheckOutForm";
import useHandelCoupon from "../../CustomHocks/useHandelCoupon";


import { IoArrowBackCircleOutline } from "react-icons/io5";
import StripePayment from "../StripePayment/StripePayment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import PaymentMethodBtn from "./PaymentMethodBtn/PaymentMethodBtn";
import { Helmet } from "react-helmet-async";

export interface Product {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

interface Order {
    orderDate: string;
    products: Product[];
    status: string;
    totalAmount: number;
    totalProduct: number;
    userEmail: string;
}



export interface FinalDataType extends Order {

    finalAmount: number;
    name: string;
    email: string;
    address: string;
    state: string;
    discountAmount?:number;
    paymentMethod:string;
    couponValue:string|null;
}


const path: string[] = ['/', '/checkout'];
const pathName: string[] = ['Home', 'CheckOut'];

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckOut = () => {
    const location = useLocation();
    

    const [discountAmount, setDiscountAmount] = useState<number>(0)
    const [couponActive, setCouponActive] = useState<boolean>(false)
    const [couponMsg, setCouponMsg] = useState<string>('')
    const [couponValue,setCouponValue]=useState<string | null>(null)
    const [methodMsg, setMethodMsg] = useState<string | boolean>(false)
    const [selectedMethod, setMethod] = useState<string | false>(false)
    const [checkOutData, setCheckOutData] = useState<FinalDataType | null>(null)

    // const {updateProductStock}= useProductManage()

    const productSummary: Order = location?.state

    const { checkCoupon } = useHandelCoupon()


    //  for  checkOut form handling
    const formRef = React.useRef<HTMLFormElement | null>(null);
    const handleSubmitClick = () => {
        if (formRef.current) {
            formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
        }
    };

    const handelMethod = (method: string) => {

        setMethodMsg(false);
        setMethod(method)
    }
    const handleCouponBox = () => {
        setCouponMsg('')
        const newCouponActiveState = !couponActive;
        setCouponActive(newCouponActiveState);

        if (!newCouponActiveState) {
            setDiscountAmount(0);
        }
    };

    // Coupon  handling
    const handleCoupon = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setCouponMsg('')
        setCouponValue(null)
        const form = e.target as HTMLFormElement;
        const code = (form.elements.namedItem("code") as HTMLInputElement).value;
        const finalAmount = productSummary.totalAmount - discountAmount

        const checkingRes = await checkCoupon(code, 'bikesProduct', finalAmount)
        if (checkingRes?.success) {
            setCouponValue(code)
            setDiscountAmount(checkingRes?.discountAmount||0)
            setCouponMsg(checkingRes?.message)
            return
        }
        setCouponMsg(checkingRes?.message)
        setDiscountAmount(0)
    }

  
    const handleFormSubmit = (data: OrderFormInputs) => {
        if (selectedMethod === false) {
            setMethodMsg('Please select your favorite method.');
            return
        }
        setMethodMsg(false);
        const finalAmount = productSummary.totalAmount - discountAmount
        const finalData = { ...data, finalAmount ,...productSummary , discountAmount:discountAmount? discountAmount:0 , paymentMethod:selectedMethod?selectedMethod:'unknown' ,couponValue, category:'shopProduct'}
        setCheckOutData(finalData)
        // updateProductStock(productSummary?.products)
    };



    return (
        <div className="bg-color-p">
            <Helmet>
                <title>CheckOut || Ride Hub</title>
            </Helmet>
            <PageHeading img={headingImg} title="CHECK OUT" path={path} pathName={pathName} />
            <div className="grid  gap-4 lg;grid-cols-12 md:grid-cols-12 grid-cols-1 max-w min-h-10 p-6">
                <div className="lg:col-span-8 md:col-span-7 ">
                    {checkOutData === null ? (
                        <CheckOutForm onSubmit={handleFormSubmit} ref={formRef} />
                    ) : (
                        <div className=" text-white">
                            <div className=" bg-color-s flex  gap-5 items-center justify-start  py-2">
                                <button onClick={() => setCheckOutData(null)} className="  p-1 hover:text-black text-xl "><IoArrowBackCircleOutline /></button>
                                <h1 className=" uppercase font-bold text-xl">{selectedMethod} Payment</h1>
                            </div>
                            <div className=" border border-gray-500 py-3 my-4 h-full">
                                {selectedMethod === 'mastercard' && (
                                    <Elements stripe={stripePromise}>
                                        <StripePayment category={'shopProduct'} checkOutData={checkOutData !== null ? checkOutData: null} />
                                    </Elements>
                                )}
                                {selectedMethod === 'visa' && <div>'Visa Payment'</div>}
                                {selectedMethod === 'nagad' && <div className="text-2xl font-bold text-center h-full m-auto mt-16">'Nagad Payment' <h1 >This feature is currently under development</h1></div>}
                                {selectedMethod === 'bkash' && <div className="text-2xl font-bold text-center h-full m-auto mt-16">'Bkash Payment' <h1 >This feature is currently under development</h1></div>}

                            </div>
                        </div>
                    )}
                </div>

                <div className=" lg:col-span-4 md:col-span-5  p-4 bg-color-op text-white ">
                    <h1 className=" text-white text-2xl font-bold font-pFont mb-4">Your Order </h1>
                    <div className=" border border-gray-500 p-4 ">
                        <div className=" flex items-end justify-between  font-bold text-xl border-b border-gray-500 pb-3">
                            <p className="text-white">Product</p>
                            <p className="text-white">Subtotal</p>
                        </div>
                        <div>
                            {
                                productSummary?.products?.map((item) => <div
                                    className=" text-gray-300 text-l font-semibold my-3 grid grid-cols-12"
                                    key={item.productId}>
                                    <p className="col-span-8">{item.productName} </p>
                                    <p className="col-span-2">x ( {item.quantity} )</p>
                                    <p className="col-span-2 text-lg text-white text-end"> $ {item.price * item.quantity} </p>
                                </div>)
                            }
                        </div>

                        <div className="border-b border-gray-500 flex justify-between items-end py-3 mb-3 text-xl font-semibold">
                            <h1>SubTotal</h1>
                            <p>$ {productSummary?.totalAmount ? productSummary?.totalAmount : 0}</p>
                        </div>
                        <div className=" flex justify-between items-end py-3  text-xl font-semibold">
                            <h1>Discount</h1>
                            <p>$ {discountAmount}</p>
                        </div>
                        {checkOutData === null &&
                            <div className=" flex gap-4 border-b border-gray-500 mb-3 pb-3  ">
                                <button
                                    className=" text-lg font-bold "
                                    onClick={handleCouponBox}>
                                    {couponActive ? <ImCheckboxChecked className="text-green-600 text-xl" /> : <ImCheckboxUnchecked />}</button>
                                {
                                    !couponActive ? <p>Have Coupon?</p> :
                                        <div>{
                                            couponMsg === 'Coupon Accepted' ? <p className={`${couponMsg === 'Coupon Accepted' ? 'text-green-500' : 'text-red-600'}`}>{couponMsg}</p> :

                                                <div>
                                                    <p className={`${couponMsg === 'Coupon Accepted' ? 'text-green-500' : 'text-red-600'}`}>{couponMsg}</p>
                                                    <form onSubmit={handleCoupon} className="flex gap-3 flex-wrap ">
                                                        <input className="input input-md input-bordered bg-slate-800 rounded-sm" type="text" name="code" placeholder="Enter your coupon code" />
                                                        <button className="btn-p px-3" type="submit">Apply</button>
                                                    </form>
                                                </div>
                                        }
                                        </div>
                                }
                            </div>
                        }
                        <div className=" flex justify-between items-end py-3 text-xl font-bold">
                            <h1>Total</h1>
                            <p>$ {productSummary?.totalAmount - discountAmount}</p>
                        </div>

                    </div>

                   <PaymentMethodBtn handelMethod={handelMethod} methodMsg={methodMsg} selectedMethod={selectedMethod} ></PaymentMethodBtn>


                    {
                        checkOutData === null && <button onClick={() => handleSubmitClick()} className=" btn-p w-full uppercase font-pFont font-semibold">Order</button>
                    }
                </div>

            </div>
        </div>
    );
};

export default CheckOut;