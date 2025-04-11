import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";


interface FinderValueType {
    brand: string;
    setBrand: (view: string) => void;
    model: string;
    setModel: (sort: string) => void;
    engine: string;
    setEngine: (sort: string) => void;
    handleFine: () => void;
    handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

const BikeFinder = ({ brand, setBrand, model, setModel, engine, setEngine, handleSearch, handleFine }: FinderValueType) => {
    const [showOption, setShowOption] = useState(false)


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;


        if (name === 'brand') {
            setBrand(value);
        } else if (name === 'model') {
            setModel(value);
        } else if (name === 'engine') {
            setEngine(value);
        }
    };




    return (
        <div className="border-b-2 border-white  bg-color-p pt-5 px-5 ">
            <div className=" px-6 w-11/12 m-auto h-auto max-w">
                <div className=" flex gap-4 justify-between items-center lg:flex-row md:flex-row flex-col   ">
                    <h1 className="text-white font-bold  text-2xl font-pFont">FIND YOUR MOTORBIKE</h1>
                    <form onSubmit={handleSearch} className=' h-10  flex justify-center items-center'>
                        <input className='px-3 py-1 h-full bg-gray-800' type="text" name="search" placeholder='Search Brand Or Model ' />
                        <button className='btn-p py-1 px-4 text-white h-full  font-bold text-xl'><CiSearch /></button>
                    </form>

                </div>

                <div className=' w-full flex justify-center'>
                    <button className='mx-auto text-xl' onClick={() => setShowOption(!showOption)}>{showOption ? <BiSolidUpArrow /> : <BiSolidDownArrow />}</button>
                </div>


                <div className={`transition-all duration-500 ease-in-out ${showOption ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-2 justify-center">
                        <select
                            name="brand"
                            className="p-2 bg-gray-800 rounded w-full mb-4"
                            value={brand}
                            onChange={handleChange}
                        >
                            <option value="">All Brand</option>
                            <option value="Yamaha">Yamaha</option>
                            <option value="Honda">Honda</option>
                            <option value="Suzuki">Suzuki</option>
                            <option value="Kawasaki">Kawasaki</option>
                        </select>

                        <select
                            name="model"
                            className="p-2 bg-gray-800 rounded w-full mb-4"
                            value={model}
                            onChange={handleChange}
                        >
                            <option value="">All Model</option>
                            <option value="R15">R15</option>
                            <option value="CBR150R">CBR150R</option>
                            <option value="GSX-R150">GSX-R150</option>
                            <option value="Ninja 300">Ninja 300</option>
                        </select>

                        <select
                            name="engine"
                            className="p-2 bg-gray-800 rounded w-full mb-4"
                            value={engine}
                            onChange={handleChange}
                        >
                            <option value="">All Engine Capacity</option>
                            <option value="150cc">150cc</option>
                            <option value="200cc">200cc</option>
                            <option value="250cc">250cc</option>
                            <option value="300cc">300cc</option>
                            <option value="321cc">321cc</option>
                            <option value="636cc">636cc</option>
                            <option value="1340cc">1340cc</option>
                        </select>

                        <button
                            className="btn-p my-0 h-[38px]"
                            onClick={handleFine}
                        >
                            Find Bike
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default BikeFinder;
