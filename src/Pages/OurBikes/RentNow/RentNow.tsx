import { useParams } from "react-router-dom";
import AvailableDate from "./AvailableDate/AvailableDate";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";



interface Rental {
    user_email: string;
    rent_start_date: string;
    rent_end_date: string;
    status: string;
}

interface FormData {
    name: string;
    email: string;
    startDate: string;
    endDate: string;
}

const RentNow: React.FC = () => {
    const { id } = useParams();
    const { register, handleSubmit } = useForm<FormData>();

    const rentals: Rental[] = [
        {
            user_email: "user1@example.com",
            rent_start_date: "2024-11-05",
            rent_end_date: "2024-11-08",
            status: "Booked"
        },
        {
            user_email: "user2@example.com",
            rent_start_date: "2024-11-12",
            rent_end_date: "2024-11-15",
            status: "Booked"
        },
        {
            user_email: "user2@example.com",
            rent_start_date: "2024-11-22",
            rent_end_date: "2024-11-22",
            status: "Booked"
        }
    ];

    const onSubmit: SubmitHandler<FormData> = (data) => {

        console.log("Form Data:", data);
    };

    return (
        <div className=" max-w my-5">

            <div className=" my-6 p-5   flex justify-center flex-col items-center">
                <h1 className="text-3xl font-bold  mb-4">Rent a Bike</h1>
                <form onSubmit={handleSubmit(onSubmit)} className=" flex gap-2 flex-col justify-center items-center max-w-xl">
                    <input className=" input input-bordered rounded-sm w-full " {...register("name")} placeholder="Your Name" />
                    <input className=" input input-bordered rounded-sm w-full " {...register("email")} type="email" placeholder="Your Email" />
                    <div className=" lg:flex md:flex gap-1 p-2  items-center justify-center border border-gray-700">
                        <div>
                            <h2 className="font-semibold my-1 ">Rent Start Date : </h2>
                            <AvailableDate rentals={rentals} />

                        </div>
                        <div>
                            <p className="lg:inline md:inline hidden text-2xl text-color-s" > < FaLongArrowAltRight /></p>
                            <p className="lg:hidden md:hidden inline text-2xl text-color-s" > <FaLongArrowAltDown /></p>

                        </div>
                        <div>
                            <h2 className="font-semibold my-1">Rent End Date : </h2>
                            <AvailableDate rentals={rentals} />

                        </div>

                    </div>
                    <input className=" btn-p" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default RentNow;
