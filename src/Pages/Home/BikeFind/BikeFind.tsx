import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bike from '../../../assets/png/bike-png1.png';

import { IoPlaySharp } from "react-icons/io5";


const BikeFind: React.FC = () => {
    const [isRunning, setIsRunning] = useState(false);
    const navigate = useNavigate();

    const handleGoClick = () => {
        setIsRunning(true);
        setTimeout(() => {
            navigate('/our-bikes');
            setIsRunning(false);
        }, 1000);
    };

    return (
        <div className="   text-white ">
            <div className="w-8/12 mx-auto   overflow-hidden ">


                <div className="flex items-center justify-between ">

                    <div className='flex flex-1 gap-2 items-center overflow-hidden px-2'>
                    
                        <div className="flex-1  w-full md:flex lg:flex hidden ">
                            <div className={`flex  items-center justify-start ${isRunning ? 'animate-bike' : ''}`}>
                                <img
                                    className={`transition-transform lg:w-20 lg:h-18 md:w-18 md:h-16 h-10 w-12 ${isRunning ? 'translate-x-full' : ''}`}
                                    src={bike}
                                    alt="Bike"
                                />
                            </div>
                        </div>
                    </div>


                    <button
                        onClick={handleGoClick}
                        className='relative group '>
                        <IoPlaySharp className=' text-color-s lg:text-8xl md:text-6xl text-4xl -ml-3  group-hover:text-red-600' />
                        <p className=' absolute lg:right-[57%] md:right-[56%] right-3/4 md:top-[36%] lg:top-[37%] top-[32%]  lg:text-lg md:text-sm text-[7px] font-semibold group-hover:text-black'>GO</p>
                    </button>

                </div>
            </div>
            <style>{`
                @keyframes bikeRun {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(100vw);
                    }
                }

                .animate-bike {
                    animation: bikeRun 1s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default BikeFind;
