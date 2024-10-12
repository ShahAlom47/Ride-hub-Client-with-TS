import { useState } from "react";

import useHandelWishList from "../../../../CustomHocks/useHandelWishList";


const WishList = () => {
    const [currentPage, setCurrentPage] = useState<string>('bike');
    const { getBikeWishList } = useHandelWishList()
    console.log(getBikeWishList);

    return (
        <div className=" p-3  w-full  relative  ">

            <div className=" border-b border-color-s flex gap-2" >
                <button onClick={() => setCurrentPage('bike')} className={`${currentPage === 'bike' ? 'bg-color-s ' : ''}  hover:bg-color-s hover:bg-opacity-50 transition-all ease-linear duration-200 rounded-t-lg text-white p-2 px-4 text-lg font-bold`}>Bike</button>
                <button onClick={() => setCurrentPage('Shop')} className={`${currentPage === 'Shop' ? 'bg-color-s' : ''} hover:bg-color-s hover:bg-opacity-50 transition-all ease-linear duration-200 rounded-t-lg text-white p-2 px-4 text-lg font-bold`}>Shop</button>
            </div>

            <div>


            </div>
        </div>
    );
};

export default WishList;