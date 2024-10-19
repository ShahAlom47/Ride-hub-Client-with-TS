import { useLocation } from "react-router-dom";
import PageHeading from "../../SharedComponent/PageHeading/PageHeading";
import headingImg from '../../assets/Banner-Img/bike-page-banner.jpg';
import React, { useState } from "react";
import { ImCheckboxUnchecked } from "react-icons/im";
import { ImCheckboxChecked } from "react-icons/im";
import CheckOutForm, { OrderFormInputs } from "./CheckOutForm/CheckOutForm";

interface Product {
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


const path: string[] = ['/', '/checkout'];
const pathName: string[] = ['Home', 'CheckOut'];

const CheckOut = () => {
    const location = useLocation();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [discountAmount, setDiscountAmount] = useState<number>(0)
    const [couponActive, setCouponActive] = useState<boolean>(false)
    const checkOutData: Order = location?.state


    //  for  checkOut form handling
    const formRef = React.useRef<HTMLFormElement | null>(null);
    const handleSubmitClick = () => {
        if (formRef.current) {
            formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
        }
    };

    // Coupon  handling
    const handleCoupon = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        const code = (form.elements.namedItem("code") as HTMLInputElement).value;
        console.log(code)
    }

    const handleFormSubmit = (data: OrderFormInputs) => {
        console.log("Order Data:", data);
    };



    return (
        <div className="bg-color-p">
            <PageHeading img={headingImg} title="CHECK OUT" path={path} pathName={pathName} />
            <div className="grid  gap-4 lg;grid-cols-12 md:grid-cols-12 grid-cols-1 max-w min-h-10 p-6">
                <div className=" lg:col-span-8 md:col-span-7  ">
                    <CheckOutForm onSubmit={handleFormSubmit} ref={formRef} />
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
                                checkOutData?.products?.map((item) => <div
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
                            <p>$ {checkOutData?.totalAmount ? checkOutData?.totalAmount : 0}</p>
                        </div>
                        <div className=" flex justify-between items-end py-3  text-xl font-semibold">
                            <h1>Discount</h1>
                            <p>$ {discountAmount}</p>
                        </div>
                        <div className=" flex gap-4 border-b border-gray-500 mb-3 pb-3  ">
                            <button
                                className=" text-lg font-bold "
                                onClick={() => setCouponActive(!couponActive)}>
                                {couponActive ? <ImCheckboxChecked className="text-green-600 text-xl" /> : <ImCheckboxUnchecked />}</button>
                            {
                                !couponActive ? <p>Have Coupon?</p> :
                                    <form onSubmit={handleCoupon} className="flex gap-3 flex-wrap ">
                                        <input className="input input-md input-bordered bg-slate-800 rounded-sm" type="text" name="code" placeholder="Enter your coupon code" />
                                        <button className="btn-p px-3" type="submit">Apply</button>
                                    </form>
                            }
                        </div>
                        <div className=" flex justify-between items-end py-3 mb-3 text-xl font-bold">
                            <h1>Total</h1>
                            <p>$ {checkOutData?.totalAmount - discountAmount}</p>
                        </div>

                        <button onClick={() => handleSubmitClick()} className=" btn-p w-full uppercase font-pFont font-semibold">Order</button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CheckOut;