import React  from 'react';
import { CiSearch } from "react-icons/ci";


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

const BikeFinder = ({brand,setBrand,model,setModel,engine,setEngine ,handleSearch,handleFine}:FinderValueType) => {



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
        <div className="max-w">
            <div className="bg-color-p p-6 w-11/12 m-auto h-auto">
                <div className=" flex gap-4 justify-between items-center lg:flex-row md:flex-row flex-col border-b-2 border-white  pb-3">
                <h1 className="text-white font-bold  text-2xl font-pFont">FIND YOUR MOTORBIKE</h1>
                <form onSubmit={handleSearch}  className=' h-10  flex justify-center items-center'>
                    <input className='px-3 py-1 h-full bg-gray-800' type="text" name="search"  placeholder='Search Brand Or Model ' />
                    <button className='btn-p py-1 px-4 text-white h-full  font-bold text-xl'><CiSearch/></button>
                </form>

                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-2 justify-center">
                    {/* Brand selection */}
                    <select
                        name="brand"
                        className="p-4 bg-gray-800 rounded w-full mb-4"
                        value={brand}
                        onChange={handleChange}
                    >
                        <option value="">All Brand</option>
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
                        <option value="">All Model</option>
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
                        <option value="">All Engine Capacity</option>
                        <option value="150cc">150cc</option>
                        <option value="200cc">200cc</option>
                        <option value="250cc">250cc</option>
                        <option value="300cc">300cc</option>
                        <option value="321cc">321cc</option>
                        <option value="636cc">636cc</option>
                        <option value="1340cc">1340cc</option>
                    </select>

                    {/* Search button */}
                    <button
                        className="btn-p my-0 max-h-[50px]"
                        onClick={handleFine}
                    >
                        Find Bike
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BikeFinder;
