import { useParams } from "react-router-dom";
import useBikeDetailsData from "../../../CustomHocks/useBikeDetailsData";
import PageHeading from "../../../SharedComponent/PageHeading/PageHeading";
import { BikeData } from "../BikeDataInterFace/bikeDataIterFace";
import img from "../../../assets/image/bikeCard.jpg"
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import ContactForm from "../../../SharedComponent/ContactForm/ContactForm";
import Loading from "../../../SharedComponent/Loading/Loading";
import ErrorPage from "../../../SharedComponent/ErrorPage/ErrorPage";
import { useEffect, useState } from "react";
import useHandelWishList from "../../../CustomHocks/useHandelWishList";

const BikeDetails = () => {


    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error, } = useBikeDetailsData(id);
    const bikeData = data as BikeData | undefined;
    const { getBikeWishList, addBikeWishList } = useHandelWishList();
    const [currentWishList, setCurrentWishList] = useState<string[]>([]);

    const path: string[] = ['/', `/our-bikes`, `/our-bikes/bike-details/${id}`];
    const pathName: string[] = ['Home', 'Our Bike', 'Bike Details'];


    useEffect(() => {
        const wishList = getBikeWishList();
        setCurrentWishList(wishList);
    }, [getBikeWishList]);

    if (isLoading) return <Loading></Loading>
    if (error) return <ErrorPage></ErrorPage>
    return (
        <div>
            <PageHeading title={`${bikeData?.brand}  ${bikeData?.model}`} path={path} pathName={pathName} />
            <div className=" grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4 my-5 max-w ">
                <div className="lg:col-span-8 md:col-span-8 p-3 ">
                    <img className="p-4 w-full" src={img} alt=" bike photo" />
                    <div className=" flex gap-4 px-4">
                        <p className="text-lg flex items-center gap-2"><FaRegCalendarAlt /> {bikeData?.year}</p>
                        <p className="text-lg flex items-center gap-2"><FaEye /> {bikeData?.total_view}</p>
                    </div>
                    <div className=" p-4">
                        <h1 className=" text-xl font-bold border-b-2 text-white font-pFont uppercase">Overview</h1>
                        <p className="py-2">{bikeData?.description}</p>
                        <div className="py-4 shadow-lg bg-slate-800 p-3 my-">
                            <p className=" flex justify-between"> Brand <span className="font-bold text-white ">{bikeData?.brand}</span></p>
                            <p className="flex justify-between"> Color <span className="font-bold text-white">{bikeData?.color}</span></p>
                            <p className="flex justify-between"> Engine Capacity <span className="font-bold text-white">{bikeData?.engine_capacity}</span></p>
                            <p className="flex justify-between"> Mileage <span className="font-bold text-white">{bikeData?.mileage}</span></p>
                            <p className="flex justify-between"> Rear Brake Type <span className="font-bold text-white">{bikeData?.rear_brake_type}</span></p>
                            <p className="flex justify-between"> Front Brake Type <span className="font-bold text-white">{bikeData?.front_brake_type}</span></p>
                            <p className="flex justify-between"> Front Brake Diameter <span className="font-bold text-white">{bikeData?.front_brake_diameter_in_mm} </span></p>



                        </div>
                    </div>

                </div>
                <div className="lg:col-span-4 md:col-span-4 my-3 p-3 ">
                    <div className="bg-gray-800 p-3">
                        <h1 className=" flex items-center justify-between font-pFont font-bold">
                            <span className="text-lg"> PRICE :</span>
                            <span className=" text-3xl">$ {bikeData?.rental_price_per_day}</span>
                        </h1>
                        <p className="">(per day)</p>
                        <div className=" grid grid-cols-2 items-center gap-3 my-4 border-t-2 pt-4">
                            <button
                             onClick={() => bikeData?._id && addBikeWishList(bikeData._id)}
                                className="btn-s "
                                style={ bikeData?._id && currentWishList.includes(bikeData?._id )?{backgroundColor:'#ce7878'}:{}}
                                >
                                
                                Add To List</button>
                            <button className=" btn-p w-full'">Rent Now</button>
                        </div>
                    </div>

                    <div className="bg-gray-800 p-3 mt-4">
                        <ContactForm></ContactForm>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default BikeDetails;
