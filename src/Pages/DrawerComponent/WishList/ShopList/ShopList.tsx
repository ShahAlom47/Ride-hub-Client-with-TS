import { useState } from "react";
import useHandelWishList from "../../../../CustomHocks/useHandelWishList";
import useWishListFetch from "../../../../CustomHocks/useWishListFetch";
import DataNotAvailable from "../../../../SharedComponent/DataNotAvailable/DataNotAvailable";
import ErrorPage from "../../../../SharedComponent/ErrorPage/ErrorPage";
import Loading from "../../../../SharedComponent/Loading/Loading";
import useHandelAddToCart from "../../../../CustomHocks/useHandelAddToCart";


const ShopList = () => {
    const { getShopWishList } = useHandelWishList()
    const shopProductIds = getShopWishList();
    const { productData } = useWishListFetch('product', shopProductIds)
    const { addProduct } = useHandelAddToCart()
    const [reload, setReload] = useState(false)



    const handelRemove = (id: string) => {
        const currentWishList = getShopWishList();
        const updatedList = currentWishList.filter((i: string) => i != id)
        console.log(updatedList, currentWishList);
        localStorage.setItem('shopWishList', JSON.stringify(updatedList))
        productData.refetch()
        setReload(!reload)
    }

    const handelAddToCart = async(id: string) => {
        const addRes = await addProduct(id)
        if(addRes){
            handelRemove(id)
        }

    }


    if (shopProductIds.length === 0) return <DataNotAvailable />
    if (productData.isLoading) return <Loading />;
    if (productData.error) return <ErrorPage />;
    return (
        <div className=" my-5 ">
            {
                productData?.data?.map((product) => <div
                    className=" grid gap-4 grid-cols-12 mb-3 shadow-sm shadow-white p-3 group hover:bg-stone-950 "
                    key={product?._id}>
                    <div className="col-span-3  flex justify-center items-center">
                        <img
                            className=" w-full max-h-20 group-hover:w-[95%] transition-all ease-in-out duration-300"
                            src="https://m.media-amazon.com/images/I/61xv8k5p1gL._AC_SL1500_.jpg" alt={` ${product?.name || 'Product Photo'} Photo`} />
                    </div>
                    <div className=" col-span-6">
                        <h1 className=" text-xl font-semibold text-white">{product?.name} </h1>

                        <div className=" flex justify-between pr-2">
                            <p className={` ${product?.stock > 0 ? 'text-green-600' : 'text-red-600'}  `}>  {product?.stock > 0 ? 'Available' : 'Stock Out'}</p>
                            <p className="text-xl font-bold font-pFont  text-color-s"> $ {product?.price ? product?.price : 0}</p>
                        </div>

                    </div>

                    <div className=" col-span-3 space-y-2 items-end flex flex-col  justify-end">
                        <button onClick={() => product?._id && handelAddToCart(product._id)} className=" btn-p p-2 w-full text-xs"> Add to Cart</button>
                        <button onClick={() => handelRemove(product?._id)} className=" text-xs btn-s w-full text-black"> Remove</button>
                    </div>


                </div>)
            }
        </div>
    );
};

export default ShopList;