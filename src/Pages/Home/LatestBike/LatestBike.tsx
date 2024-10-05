import { TbArrowUpRight } from "react-icons/tb";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BikeData } from "../../OurBikes/BikeDataInterFace/bikeDataIterFace";
import useAxiosPublic from "../../../CustomHocks/useAxiosPublic";
import Loading from "../../../SharedComponent/Loading/Loading";
import ErrorPage from "../../../SharedComponent/ErrorPage/ErrorPage";
import LatestBikeCard from "./LatestBikeCard/LatestBikeCard";

interface BikeResponse {
    data: BikeData[];
}

const LatestBike = () => {
    const AxiosPublic = useAxiosPublic();

    const { data, isLoading, error } = useQuery<BikeResponse, Error>({
        queryKey: ['latestBikeData'],
        queryFn: async (): Promise<BikeResponse> => {
            const res = await AxiosPublic.get(`/bikeData/latest-bike`);
            return res.data as BikeResponse;
        }
    });

    console.log(data);

    if (isLoading) return <Loading></Loading>;
    if (error) return <ErrorPage></ErrorPage>;
    return (
        <div className=" max-w p-4">
            <div className="header flex justify-between items-end my-4 p-2">
                <div className=" text-white space-y-3 uppercase">
                    <p className=" bg-color-s px-3 py-1 inline  ">Our Categories</p>
                    <h1 className="text-4xl font-bold font-pFont "> Latest Motorbikes</h1>
                </div>
                <Link to={'/our-bikes'}>
                    <button className=" flex items-center gap-1 transition-all duration-300 border-opacity-0 hover:border-opacity-100 ease-in-out   border-b-2 border-color-s group font-semibold">
                        VIEW OUR BIKES
                        <span className=" group-hover:text-color-s" >
                            <TbArrowUpRight />
                        </span>
                    </button>
                </Link>

            </div>
            <div className="Slider p-6">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    watchSlidesProgress={true}
                    slidesPerView={3}
                    autoplay={{
                        delay: 2500, // Set autoplay delay in milliseconds
                        disableOnInteraction: false, // Disable autoplay on interaction
                    }}
                    navigation
                    className="mySwiper "
                >
                    {
                        data?.data.map((bike) => <div key={bike?._id}>
                            <SwiperSlide>
                                < LatestBikeCard  bikeData={bike}/>
                            </SwiperSlide>
                        </div>)
                    }

                </Swiper>
            </div>
        </div>
    );
};

export default LatestBike;
