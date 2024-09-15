import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BikeFinder: React.FC = () => {
    const [brand, setBrand] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [engine, setEngine] = useState<string>('');
    const navigate= useNavigate()

    
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

    const handleSearch = (): void => {
        interface BikeSearchData {
            brand:string;
            model:string;
            engine:string;
        }
       const data:BikeSearchData={ brand, model,engine };
       
       localStorage.setItem('bikeSearchData', JSON.stringify(data));
       navigate('/our-bikes')
    };

    return (
        <div className="max-w">
            <div className="bg-color-p p-6 w-10/12 m-auto h-auto">
                <h1 className="text-white font-bold border-b-2 border-white pb-3 text-2xl font-pFont">FIND YOUR MOTORBIKE</h1>
                <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-2 justify-center">
                    {/* Brand selection */}
                    <select
                        name="brand"
                        className="p-4 bg-gray-800 rounded w-full mb-4"
                        value={brand}
                        onChange={handleChange}
                    >
                        <option value="">Select Brand</option>
                        <option value="Yamaha">Yamaha</option>
                        <option value="Honda">Honda</option>
                        <option value="Suzuki">Suzuki</option>
                        <option value="Kawasaki">Kawasaki</option>
                    </select>

                    {/* Model selection */}
                    <select
                        name="model"
                        className="p-4 bg-gray-800 rounded w-full mb-4"
                        value={model}
                        onChange={handleChange}
                    >
                        <option value="">Select Model</option>
                        <option value="R15">R15</option>
                        <option value="CBR150R">CBR150R</option>
                        <option value="GSX-R150">GSX-R150</option>
                        <option value="Ninja 300">Ninja 300</option>
                    </select>

                    {/* Engine capacity selection */}
                    <select
                        name="engine"
                        className="p-4 bg-gray-800 rounded w-full mb-4"
                        value={engine}
                        onChange={handleChange}
                    >
                        <option value="">Select Engine Capacity</option>
                        <option value="150">150cc</option>
                        <option value="200">200cc</option>
                        <option value="300">300cc</option>
                    </select>

                    {/* Search button */}
                    <button
                        className="btn-p my-0 max-h-[50px]"
                        onClick={handleSearch}
                    >
                        Search Bike
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BikeFinder;
