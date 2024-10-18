import { useQuery } from "@tanstack/react-query";
import useUser from "../../../CustomHocks/useUser";
import useAxiosPublic from "../../../CustomHocks/useAxiosPublic";
import { Products } from "../../Shop/Shop";
import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaCircleMinus } from "react-icons/fa6";
import { GiCancel } from "react-icons/gi";
import useHandelAddToCart from "../../../CustomHocks/useHandelAddToCart";
import { useNavigate } from "react-router-dom";
import useUserData from "../../../CustomHocks/useUserData";


interface CartProductType extends Products {
    quantity: number;
}

const CartList = () => {
    const { user } = useUser();
    const {refetch:userRetch}=useUserData()
    const navigate = useNavigate()
    const AxiosPublic = useAxiosPublic();
    const { removeProduct } = useHandelAddToCart();

    const { data: products, refetch } = useQuery({
        queryKey: ['cartListData', user],
        queryFn: async (): Promise<CartProductType[]> => {
            const res = await AxiosPublic.get(`/users/userCartData/${user?.email}`);
            return res.data as CartProductType[];
        }
    });

    const [cartProducts, setCartProducts] = useState(products || [])

    const updateQuantity = (productId: string, operation: 'increase' | 'decrease') => {

        const updatedCart = cartProducts.map((product) => {
            if (product._id === productId) {

                let newQuantity = operation === 'increase' ? product.quantity + 1 : product.quantity - 1;
                if (newQuantity > product.stock) {
                    newQuantity = product.stock;
                }
                return {
                    ...product,
                    quantity: newQuantity < 1 ? 1 : newQuantity,
                };
            }
            return product;
        });
        setCartProducts(updatedCart);
    };

    const totalPrice = cartProducts.reduce((acc, product) => acc + product.price * product.quantity, 0);


    const handelRemove = async (id: string) => {
        const res = await removeProduct(id);
        if (res?.status) {
            refetch()
            userRetch()
        }
    }


    const handelCheckOut = async () => {
        const orderData = {
            totalAmount: totalPrice,
            totalProduct: cartProducts.length,
            userEmail: user?.email,
            products: cartProducts.map(product => {
                return ({
                    productId: product?._id,
                    productName: product?.name,
                    quantity: product.quantity,
                    price: product.price
                }
                )
            }),

            orderDate: new Date().toISOString(),
            status: "Processing"
        }
        navigate("/checkout", {
            state:orderData
        });
console.log(orderData);
    }

    return (
        <div className="h-full p-3 grid grid-cols-1 grid-rows-12 ">

            <div className="  flex justify-end items-center py-3 row-span-1 ">
                <h1 className=" text-white font-semibold  p-3 "> Your cart ( {products?.length} )</h1>
            </div>

            <div className=" row-span-8  overflow-y-scroll ">
                {cartProducts?.map((product) => <div
                    key={product._id}
                    className={`grid gap-4 grid-cols-12 mb-3 shadow-sm shadow-white p-3 group hover:bg-stone-950`}
                >
                    <div className="col-span-2  flex justify-center items-center">
                        <img
                            className=" w-full max-h-16 group-hover:w-[95%] transition-all ease-in-out duration-300"
                            src="https://m.media-amazon.com/images/I/61xv8k5p1gL._AC_SL1500_.jpg" alt={` ${product?.name || 'Product Photo'} Photo`} />
                    </div>
                    <div className=" col-span-8">


                        <div className=" flex justify-between pr-">
                            <h1 className=" text-xl font-semibold text-white">{product?.name} </h1>
                            <p className={` ${product?.stock > 0 ? 'text-green-600' : 'text-red-600'}  `}>  {product?.stock > 0 ? 'Available' : 'Stock Out'}</p>

                        </div>
                        <div className=" flex justify-between items-end">
                            <div className=" flex border px-2 mt-1  text-lg font-semibold text-white rounded-full">
                                <button onClick={() => updateQuantity(product._id, 'decrease')} className="  "><FaCircleMinus /></button>
                                <p className="px-3 ">{product.quantity}</p>
                                <button onClick={() => updateQuantity(product._id, 'increase')} className=""><AiFillPlusCircle /></button>
                            </div>
                            <p className="text-xl font-bold font-pFont  text-color-s"> $ {product?.price ? product?.price : 0}</p>

                        </div>
                    </div>
                    <div className="col-span-2 flex justify-center items-center">
                        <button onClick={() => handelRemove(product?._id)} className=" text-2xl text-white hover:text-color-s"><GiCancel /></button>
                    </div>

                </div>
                )
                }


            </div>

            <div className=" row-span-3 text-white bg-gray-900 flex flex-col items-center justify-between p-4 ">
                <div className="flex justify-between gap-3 w-full ">
                    <h1 className=" text-left font-semibold">Subtotal :</h1>
                    <p className=" text-lg font-bold pr-3">{totalPrice || 0} Tk</p>
                </div>
                <button onClick={handelCheckOut} className=" btn-p w-full font-bold">CheckOut</button>

            </div>

        </div>
    );
};

export default CartList;