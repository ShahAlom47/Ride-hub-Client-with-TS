import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


import img1 from '../../../assets/Banner-Img/banner1.jpg';
import img2 from '../../../assets/Banner-Img/banner4.jpg';
import img3 from '../../../assets/Banner-Img/banner3.jpg';
import BikeFinder from '../BikeFinder/BikeFinder';

const images = [img1, img2, img3];

const Banner: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');
    const intervalRef = useRef<number  | null>(null);

    const startAutoSlide = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setDirection('next');
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
    };

    useEffect(() => {
        startAutoSlide();
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const handleNext = () => {
        setDirection('next');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        startAutoSlide(); 
    };

    const handlePrev = () => {
        setDirection('prev');
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        startAutoSlide();
    };

    return (
       <div className=' relative '>
         <div className="relative w-full h-[500px] overflow-hidden">
            <AnimatePresence>
                <motion.div
                    key={currentIndex}
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${images[currentIndex]})` }}
                    initial={{ x: direction === 'next' ? '100%' : '-100%', opacity: 0 }}
                    animate={{ x: '0%', opacity: 1 }}
                    exit={{ x: direction === 'next' ? '-100%' : '100%', opacity: 0 }}
                    transition={{ duration: 1 }}
                />
            </AnimatePresence>
            <div className="absolute inset-0 flex justify-between items-center px-4">
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

        <div className=' absolute -bottom-1/4 w-full'>
           <BikeFinder></BikeFinder>
           </div>
       </div>
    );
};

export default Banner;
