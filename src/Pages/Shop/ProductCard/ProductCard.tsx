import { Products } from "../Shop";
import ReactStars from "react-rating-stars-component";
import { MdFavoriteBorder } from "react-icons/md";
import { ImEye } from "react-icons/im";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import ReactModal from "../../../SharedComponent/ReactModal/ReactModal";
import { useEffect, useState } from "react";
import ProductDetails from "../ProductDetails/ProductDetails";
import useHandelWishList from "../../../CustomHocks/useHandelWishList";
import useHandelAddToCart from "../../../CustomHocks/useHandelAddToCart";

interface ProductCardProps {
    data: Products;
}


const ProductCard = ({ data }: ProductCardProps) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const {addShopWishList,getShopWishList}=useHandelWishList();
    const [currentWishList, setCurrentWishList] = useState<string[]>([]);
    const {addProduct}=useHandelAddToCart()

    useEffect(() => {
        const wishList = getShopWishList();
        setCurrentWishList(wishList);
    }, []); 



    return (
        <div>
            <div className=" flex flex-col justify-center items-center  gap-2 my-3 group rounded-sm">

                <div className=" relative  overflow-hidden rounded-sm">
                    <button
                    onClick={()=>addShopWishList(data?._id)}
                    data-tooltip-id="my-tooltip" data-tooltip-content="Add To Wishlist"
                    className={` ${currentWishList.includes(data?._id)?'bg-color-s border-color-s':' bg-none border-stone-200'}    transition-all duration-500 ease-in-out  absolute -top-20 group-hover:top-2 right-2 text-3xl p-4 bg-color-p text-white hover:bg-color-s `}><MdFavoriteBorder /></button>
                    <button 
                    onClick={()=>setIsOpen(true)}
                      data-tooltip-id="my-tooltip" data-tooltip-content="View Details"
                    className="   transition-all duration-500 ease-in-out  absolute -top-20 group-hover:top-20 right-2 text-3xl p-4 bg-color-p text-white hover:bg-color-s "><ImEye /></button>
                    <img src="https://m.media-amazon.com/images/I/61xv8k5p1gL._AC_SL1500_.jpg" alt={ ` ${data?.name||'Product Photo'} Photo`}/>
                    <button onClick={()=>addProduct(data?._id)}  className=" transition-all duration-500 ease-in-out  absolute -bottom-20 group-hover:bottom-0 w-full btn-p h-10 font-bold">ADD TO CART</button>
                </div>
                <p className="mt-3 font-semibold text-lg">{data?.category}</p>
                <h1 className=" text-2xl text-white font-pFont font-bold">{data?.name}</h1>
                <ReactStars
                    count={5}
                    value={data?.rating}
                    size={24}
                    edit={false}
                    activeColor="#ffd700"
                />
                <p className="text-3xl font-bold font-pFont text-color-s">$ {data?.price}</p>

                <ReactModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} >
                    <ProductDetails id={data?._id}></ProductDetails>
                </ReactModal>
            </div>
            <Tooltip id="my-tooltip" />
        </div>
    );
};

export default ProductCard;