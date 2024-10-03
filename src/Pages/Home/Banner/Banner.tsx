import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import img1 from '../../../assets/Banner-Img/Post Design-01.png';
import img2 from '../../../assets/Banner-Img/Post Design-02.png';
import img3 from '../../../assets/Banner-Img/Post Design-03.png';
import img4 from '../../../assets/Banner-Img/Post Design-04.png';
import BikeFind from '../BikeFind/BikeFind';

// Array for banner data including title, subtitle, and image
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

    // Auto-slide functionality using setTimeout
    useEffect(() => {
        const autoSlide = setTimeout(() => {
            setDirection('next');
            setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerContent.length);
        }, 5000); // Slide every 5 seconds

        return () => clearTimeout(autoSlide); // Clear timeout on cleanup
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
                <div style={{ textShadow: '4px 4px 8px #090808' }} className={`absolute inset-0 flex ${currentIndex===0 || currentIndex===3?'justify-end text-end right-[10%]':'justify-start left-[8%]'} items-center   lg:px-8  md:px-4 px-2 bg-opacity-40 lg:mx-8`}>
                    <motion.div
                        key={currentIndex} // Key added to ensure animation triggers on slide change
                        initial={{ opacity: 0, y: -100 }}  // Change 'y' for top-down animation (-100 for top, 100 for bottom)
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}  // Optional: add exit animation (for bottom-up exit)
                        transition={{ duration: 1.2, ease: 'easeInOut' }}  // Adjust duration as needed
                    >
                        <h1 style={{ whiteSpace: 'pre-line' }} className="lg:text-5xl md:text-3xl text-xl font-bold mb-4 w-8/1 font-pFont text-white ">
                            {bannerContent[currentIndex].title}
                        </h1>
                        <p className="lg:text-xl md:text-lg text-sm mb-8 text-gray-200">
                            {bannerContent[currentIndex].subtitle}
                        </p>
                    </motion.div>
                </div>


                {/* Navigation Buttons */}
                <div className="absolute inset-0 lg:flex md:flex hidden justify-between items-center px-4">
                    <button
                        onClick={handlePrev}
                        className="bg-gray-800 bg-opacity-45 text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition"
                    >
                        &lt;
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-gray-800 bg-opacity-45 text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition"
                    >
                        &gt;
                    </button>
                </div>
            </div>

            {/* BikeFind Section */}
            <div className='relative py-5 lg:min-h-40 min-h-56'>
                <div className='absolute lg:-top-1/4 md:-top-4 -top-2 w-full h-full'>
                    <BikeFind />
                </div>
            </div>
        </div>
    );
};

export default Banner;
