import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiImagedotsc } from "react-icons/si";
import img1 from '../../../assets/Banner-Img/Post Design-01.png';
import img2 from '../../../assets/Banner-Img/Post Design-02.png';
import img3 from '../../../assets/Banner-Img/Post Design-03.png';
import img4 from '../../../assets/Banner-Img/Post Design-04.png';


const bannerContent = [
    {
        img: img1,
        title: (
            <>
                Explore the <br /> World on Two Wheels
            </>
        ),
        subtitle: "Find the best bike for your next adventure.",
    },
    {
        img: img2,
        title: (
            <>
                Rent Your <br /> Perfect Ride
            </>
        ),
        subtitle: "Discover a wide range of bikes for rent.",
    },
    {
        img: img3,
        title: (
            <>
                Unleash <br /> Your Freedom
            </>
        ),
        subtitle: "Ride freely with affordable bike rentals.",
    },
    {
        img: img4,
        title: (
            <>
                Your Adventure <br /> Starts Here
            </>
        ),
        subtitle: "Book your bike today and start exploring!",
    },
];


const Banner: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');


    useEffect(() => {
        const autoSlide = setTimeout(() => {
            setDirection('next');
            setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerContent.length);
        }, 5000);

        return () => clearTimeout(autoSlide);
    }, [currentIndex]);

    const handleNext = () => {
        setDirection('next');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerContent.length);
    };

    const handlePrev = () => {
        setDirection('prev');
        setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerContent.length) % bannerContent.length);
    };

    return (
        <div>
            <div className="relative w-full h-[200px] lg:h-[500px] md:h-[400px] overflow-hidden">
                <AnimatePresence>
                    <motion.div
                        key={currentIndex}
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${bannerContent[currentIndex].img})` }}
                        initial={{ x: direction === 'next' ? '100%' : '-100%', opacity: 0 }}
                        animate={{ x: '0%', opacity: 1 }}
                        exit={{ x: direction === 'next' ? '-100%' : '100%', opacity: 0 }}
                        transition={{ duration: 1 }}
                    />
                </AnimatePresence>

                {/* Title and Subtitle with Animation */}
                <div style={{ textShadow: '4px 4px 8px #090808' }} className={`absolute inset-0 flex ${currentIndex === 0 || currentIndex === 3 ? 'justify-end text-end right-[10%]' : 'justify-start left-[8%]'} items-center   lg:px-8  md:px-4 px-2 bg-opacity-40 lg:mx-8`}>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                    >
                        <h1 style={{ whiteSpace: 'pre-line' }} className="lg:text-5xl md:text-3xl text-xl font-bold mb-4 w-8/1 font-pFont text-white ">
                            {bannerContent[currentIndex].title}
                        </h1>
                        <p className="lg:text-xl md:text-lg text-sm mb-8 text-gray-200">
                            {bannerContent[currentIndex].subtitle}
                        </p>
                    </motion.div>
                </div>



            </div>


            <div className='max-w relative  lg:min-h-24 min-h-18 '>
                <div
                    style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)', }}
                    className='  bg-color-s bg-gradient-to-r from-color-p  absolute lg:-top-1/4 md:-top-4 -top-2  w-full  py-2 shadow-slate-50 -shadow-lg '
                >

                    <div className="flex justify-between items-center px-4 w-8/12 mx-auto">
                        {/* Previous Button */}
                        <button
                            onClick={handlePrev}
                            style={{ clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%)', }}
                            className="relative bg-gradient-to-l from-transparent to-red-700 text-black font-bold py-2 px-8 pr-16   min-w-[200px] ">
                            <span className="relative z-10">PREVIOUS</span>
                        </button>

                        {/* Middle Dots */}
                        <div className="flex items-center gap-3">
                            {bannerContent.map((_, i) => (
                                <p
                                    className={`transition-all ease-in-out duration-700 ${i === currentIndex ? 'text-color-p text-2xl' : 'text-white' }`}
                                    key={i}
                                > <SiImagedotsc /> </p>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={handleNext}
                            style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)', }}
                            className="relative bg-gradient-to-r from-transparent to-color-p text-black font-bold py-2 px-8 pl-16  min-w-[200px]">
                           
                            <span className="relative z-10">NEXT</span>
                        </button>
                    </div>

                </div>

            </div>


        </div>
    );
};

export default Banner;
