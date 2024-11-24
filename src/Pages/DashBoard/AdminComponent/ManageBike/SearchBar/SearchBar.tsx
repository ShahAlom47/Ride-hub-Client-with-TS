import React from 'react';
import { CiSearch } from 'react-icons/ci';

interface PropsType {
    setSearchValue: (value: string) => void;
  
    searchValue: string;
}


const SearchBar = ({ setSearchValue, searchValue }: PropsType) => {
    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const value = formData.get("value") as string;
        const trimValue = value.trim();
        setSearchValue(trimValue);
        // console.log(trimValue);
    };

    return (
        <div className="flex  justify-end gap-3">
                <form onSubmit={handleSubmit} className="flex border border-gray-800 rounded-md bg-slate-100">
                    <input
                        className="bg-slate-100 rounded-l-md outline-none px-3 text-black"
                        type="text"
                        name="value"
                        defaultValue={searchValue}
                       
                    />
                    <button type="submit" className="p-2 border-l bg-slate-300 text-black rounded-r-md hover:bg-slate-400">
                        <CiSearch />
                    </button>
                </form>

          
            </div>
    );
};

export default SearchBar;