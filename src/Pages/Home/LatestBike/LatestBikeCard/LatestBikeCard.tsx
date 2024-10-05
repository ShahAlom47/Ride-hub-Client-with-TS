import { MdFavoriteBorder } from "react-icons/md";
import { FaMotorcycle } from "react-icons/fa";
import { BsFillFuelPumpFill, BsStack } from "react-icons/bs"
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdSpeedometer } from "react-icons/io";
import { GrManual } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { BikeData } from "../../../OurBikes/BikeDataInterFace/bikeDataIterFace";

import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { FaRegEye } from "react-icons/fa";
import img from '../../../../assets/image/bikeCard.jpg'
import useBikeCardViewUpdate from "../../../../CustomHocks/useBikeCardViewUpdate";


type BikeDataTypes = {
    bikeData: BikeData
}

const LatestBikeCard = ({ bikeData }: BikeDataTypes) => {
    const {handelBikeView}=useBikeCardViewUpdate();

    
    return (
        <div className=" bg-zinc-800 p-5  m-2">
            <div className=" flex justify-between items-center my-3">
                <div>
                    <h1 className="text-4xl font-bold font-pFont text-white ">{bikeData?.brand} {bikeData?.model}</h1>
                    <p className=" flex items-center gap-1 mt-2 text-color-s"> <FaRegEye className="mt-1" /> {bikeData?.total_view}</p>
                </div>
                <button
                    data-tooltip-id="my-tooltip" data-tooltip-content="Add To Wishlist"
                    className="   transition-all duration-500 ease-in-out    text-xl p-1 border hover:border-color-s border-stone-200 text-white hover:bg-color-s "><MdFavoriteBorder />
                </button>
            </div>


            <div className="relative max-h-64 overflow-y-hidden my-5">
                <img className=" w-full" src={img} alt="" />

            </div>

            <div className={` flex p-4 gap-3  rounded-ss-sm flex-row justify-between `}>
                    <div className=" space-y-3 text-gray-300">
                        <p className='flex items-start gap-2'>     <span className='text-color-s'><FaMotorcycle className="text-3xl" /> </span > <span className=' flex flex-col justify-start font-bold text-white  font-pFont text-xl '> {bikeData?.engine_capacity} <span className=" font-normal  text-sm text-gray-500" >Engine</span></span></p>
                        <p className='flex items-start gap-2'>    <span className='text-color-s'><BsStack className="text-3xl" /></span> <span className=' flex flex-col justify-start font-bold text-white font-pFont text-xl '> {bikeData?.color} <span className=" font-normal text-sm text-gray-500" >Color</span ></span></p>
                        <p className='flex items-start gap-2'>    <span className='text-color-s'><FaRegCalendarAlt className="text-3xl" /> </span> <span className=' flex flex-col justify-start font-bold text-white font-pFont text-xl '> {bikeData?.year} <span className=" font-normal text-sm text-gray-500" >Year</span></span></p>
                    </div>
                    <div className=" space-y-3 text-gray-300">
                        <p className='flex items-start gap-2'>    <span className='text-color-s'><IoMdSpeedometer className="text-3xl" /> </span>  <span className=' flex flex-col justify-start font-bold text-white font-pFont text-xl '> {bikeData?.mileage} <span className=" font-normal text-sm text-gray-500" >Mileage</span></span></p>
                        <p className='flex items-start gap-2'>    <span className='text-color-s'><GrManual className="text-3xl" /> </span> <span className=' flex flex-col justify-start font-bold text-white font-pFont text-xl '> {bikeData?.transmission} <span className=" font-normal text-sm text-gray-500" >Transmission</span></span></p>
                        <p className='flex items-start gap-2'>    <span className='text-color-s'><BsFillFuelPumpFill className="text-3xl" /> </span> <span className=' flex flex-col justify-start font-bold text-white font-pFont text-xl '> {bikeData?.fuel_type} <span className=" font-normal text-sm text-gray-500" >Fuel</span></span></p>
                    </div>
                </div>
                <div className=' border-t p-4 flex items-center justify-between' >
                    <div className=''>
                        <p className=' text-gray-300'> Price  (Per day)</p>
                        <h1 className=' uppercase font-bold text-xl font-pFont'>$  {bikeData.rental_price_per_day}</h1>
                    </div>
                    <Link to={`/bike-details/${bikeData._id}`}> <button onClick={() => handelBikeView(bikeData?._id)} role='button' className=' btn-p  p-4 py-1'>View More </button></Link>
                </div>
            <Tooltip id="my-tooltip" />
        </div>
    );
};

export default LatestBikeCard;