import { useState } from "react";
import ShopList from "./ShopList/ShopList";
import BikeList from "./BikeList/BikeList";



const WishList = () => {
    const [currentPage, setCurrentPage] = useState<string>('bike');


    return (
        <div className=" p-3  w-full  h-full  ">

            <div className=" border-b border-color-s flex gap-2" >
                <button onClick={() => setCurrentPage('bike')} className={`${currentPage === 'bike' ? 'bg-color-s ' : ''}  hover:bg-color-s hover:bg-opacity-50 transition-all ease-linear duration-200 rounded-t-lg text-white p-2 px-4 text-lg font-bold`}>Bike</button>
                <button onClick={() => setCurrentPage('Shop')} className={`${currentPage === 'Shop' ? 'bg-color-s' : ''} hover:bg-color-s hover:bg-opacity-50 transition-all ease-linear duration-200 rounded-t-lg text-white p-2 px-4 text-lg font-bold`}>Shop</button>

            </div>

          <div className=" h-full overflow-y-scroll">
          {
            currentPage === 'bike' ?<BikeList  />:<ShopList  />
           }
          </div>
        </div>
    );
};

export default WishList;