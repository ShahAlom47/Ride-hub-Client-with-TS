// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";



const LatestBike = () => {
    return (
        <div className=" max-w p-4">
            <div className="header">

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
                    className="mySwiper"
                >
                    <SwiperSlide>Slide 1</SwiperSlide>
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                    <SwiperSlide>Slide 5</SwiperSlide>
                    <SwiperSlide>Slide 6</SwiperSlide>
                    <SwiperSlide>Slide 7</SwiperSlide>
                    <SwiperSlide>Slide 8</SwiperSlide>
                    <SwiperSlide>Slide 9</SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default LatestBike;
