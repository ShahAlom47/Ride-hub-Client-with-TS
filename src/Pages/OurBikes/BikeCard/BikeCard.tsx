
import bikeImg from '../../../assets/image/bikeCard.jpg'
import { FaMotorcycle } from "react-icons/fa";
import { BsStack } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdSpeedometer } from "react-icons/io";
import { GrManual } from "react-icons/gr";
import { Link } from 'react-router-dom';
import useBikeCardViewUpdate from '../../../CustomHocks/useBikeCardViewUpdate';

export interface bikeDataType {
    _id: string,
    brand: string;
    model: string;
    engine_capacity: string;
    color: string;
    year: number;
    fuel_type: string;
    rental_price_per_day: number;
    availability: boolean;
    mileage: string;
    transmission: string;
    location: string;
    insurance_included: boolean;
    number_of_seats: number;
    license_requirement: string;
    additional_features: string[];
    bike_image: string;
}

interface BikeCardProps {
    bikeData: bikeDataType;
    cardView: string;
}

const BikeCard = ({ bikeData, cardView }: BikeCardProps) => {

    const { handelBikeView } = useBikeCardViewUpdate();
   

    return (
        <div className={` grid   bg-gray-950 rounded-ss-sm ${cardView === 'grid' ? ' gird-col-1' : ' lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center w-full'} overflow-hidden group`}>
            <div className="   relative  overflow-hidden">

                <img className=" h-full object-cover transition-transform duration-300 group-hover:scale-105 "
                    src={bikeImg} alt={`${bikeData?.brand} ${bikeData?.model}`} />
                <p className={` absolute top-6 -right-[40%]  w-full text-white font-semibold inline' inline-block p-2 text-center  rotate-45 ${bikeData?.availability ? 'bg-green-500 text-black' : 'bg-red-500'}`}>
                    {bikeData?.availability ? 'Available' : 'Not Available'}
                </p>
            </div>
            <div className=' text-white p-4 h-full'>
                <h2 className='font-bold uppercase font-pFont text-3xl text-center border-b  p-4  group-hover:text-color-s group-hover:bg-color-p'>{bikeData?.brand} {bikeData?.model}</h2>
                <div className={` flex p-4    bg-gray-950 rounded-ss-sm ${cardView === 'grid' ? ' flex-col' : ' flex-row justify-between '}`}>
                    <div className=" space-y-2 text-gray-300">
                        <p className='flex items-center gap-2'> <span className='text-color-s'>•</span>  Engine Capacity: <span className='text-color-s'><FaMotorcycle /> </span > <span className='font-bold text-white'> {bikeData?.engine_capacity}</span></p>
                        <p className='flex items-center gap-2'> <span className='text-color-s'>•</span>  Color: <span className='text-color-s'><BsStack /></span> <span className='font-bold text-white'> {bikeData?.color}</span></p>
                        <p className='flex items-center gap-2'> <span className='text-color-s'>•</span>  Year: <span className='text-color-s'><FaRegCalendarAlt /> </span> <span className='font-bold text-white'> {bikeData?.year}</span></p>
                    </div>
                    <div className=" space-y-2 text-gray-300">
                        <p className='flex items-center gap-2'> <span className='text-color-s'>•</span>  Mileage: <span className='text-color-s'><IoMdSpeedometer /> </span>  <span className='font-bold text-white'> {bikeData?.mileage}</span></p>
                        <p className='flex items-center gap-2'> <span className='text-color-s'>•</span>  Transmission: <span className='text-color-s'><GrManual /> </span> <span className='font-bold text-white'> {bikeData?.transmission}</span></p>
                    </div>
                </div>
                <div className=' border-t p-4 flex items-center justify-between' >
                    <div className=''>
                        <p className=' text-gray-300'> Price  (Per day)</p>
                        <h1 className=' uppercase font-bold text-xl font-pFont'>$  {bikeData.rental_price_per_day}</h1>
                    </div>
                    <Link to={`/bike-details/${bikeData._id}`}> <button onClick={() => handelBikeView(bikeData?._id)} role='button' className=' btn-p  p-4 py-1'>View More </button></Link>
                </div>
            </div>
        </div>
    );
};

export default BikeCard;
