
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
        <div className={`  p-1 grid gap-2 grid-rows-2  h-full   bg-gray-950 rounded-sm ${cardView === 'grid' ? ' gird-col-1 w-full' : ' lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center w-full'}  group`}>
            <div className="    w-full h-full items-center justify-center  relative  overflow-hidden ">

                <img className="   h-full   transition-transform duration-300 group-hover:scale-105 "
                    src={bikeData?.bike_image || bikeImg} alt={`${bikeData?.brand} ${bikeData?.model}`} />
             
            </div>

            <div className='  w-full  text-white p-4 '>
                <h2 className='font-bold  uppercase font-pFont text-3xl text-center border-b  p-4  group-hover:text-color-s group-hover:bg-color-p'>{bikeData?.brand} {bikeData?.model}</h2>
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
