import { CiSearch } from "react-icons/ci";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React from "react";
import { RxCross1 } from "react-icons/rx";

interface PropsType {
    setSearchValue: (value: string) => void;
    setFilterDate: (date: Date | null) => void; 
    filterDate: Date | null; 
}

const ActionBar = ({ setSearchValue, setFilterDate, filterDate }: PropsType) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const value = formData.get("value") as string;
        const trimValue = value.trim();
        setSearchValue(trimValue);
    };

    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold">Orders</h1>
            </div>

            <div className="flex my-4 justify-end gap-3">
                <form onSubmit={handleSubmit} className="flex border border-gray-800 rounded-md bg-slate-100">
                    <input
                        className="bg-slate-100 rounded-l-md outline-none px-3 text-black"
                        type="text"
                        name="value"
                    />
                    <button className="p-2 border-l bg-slate-300 text-black rounded-r-md hover:bg-slate-400">
                        <CiSearch />
                    </button>
                </form>

                <div className="w- bg-slate-300 items-center flex px-1 rounded-md  text-black">
                  
                     <DatePicker
                        selected={filterDate}
                        onChange={(date: Date | null) => {
                            // Here date is of type Date or null, no conversion needed
                            setFilterDate(date);
                        }}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        placeholderText="Date"
                        className="w-26 bg-slate-300 text-black"
                    />
                    <RxCross1 className=" hover:text-color-s"  />
                </div>
            </div>
        </div>
    );
};

export default ActionBar;
