import { useParams } from "react-router-dom";
import AvailableDate from "./AvailableDate/AvailableDate";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaLongArrowAltRight, FaLongArrowAltDown } from "react-icons/fa";
import { useState } from "react";
import useUser from "../../../CustomHocks/useUser";
import useBikeDetailsData from "../../../CustomHocks/useBikeDetailsData";
import PaymentMethodBtn from "../../CheckOut/PaymentMethodBtn/PaymentMethodBtn";
import Swal from "sweetalert2";



interface FormData {
    name: string;
    email: string;
    startDate: string;
    endDate: string;
}

const RentNow: React.FC = () => {
    const { id } = useParams();
    const { user } = useUser()
    const { register, handleSubmit } = useForm<FormData>();
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(startDate);
    const [dateError, setDateError] = useState('')
    const [methodMsg, setMethodMsg] = useState<string | boolean>(false)
    const [selectedMethod, setMethod] = useState<string | false>(false)

    const { data: bikeData } = useBikeDetailsData(id);
    const rentals = bikeData?.rentals ?? []

    const handelMethod = (method: string) => {
        if(method==='bkash'|| method === 'nagad'){
            Swal.fire({
                title:'This Feature  Under Development',
                position:'top-right',
                toast:true,
                showLoaderOnConfirm:false,
                icon:'info'

            })
            return
        }

        setMethodMsg(false);
        setMethod(method)
    }


    const onSubmit: SubmitHandler<FormData> = (data) => {
        setDateError('')

        if (startDate === null || endDate === null) {
            setDateError('*Please Select Date')
            return
        }

        const isoStartDate = startDate.toISOString();
        const isoEndDate = endDate.toISOString();
        const renterData = {
            ...data,
            userEmail: user?.email,
            startDate: isoStartDate,
            endDate: isoEndDate,
            bikeId: bikeData?._id
        }

        console.log("Form Data:", renterData);

    };
    console.log(bikeData);

    return (
        <div className="max-w my-5">
            <div className="my-6 p-5 flex justify-center flex-col items-center">
                <h1 className="text-3xl font-bold mb-4  text-color-s">Rent a Bike</h1>
                <form onSubmit={handleSubmit(onSubmit)} className=" border p-2 border-gray-700 flex gap-2 flex-col justify-center items-center max-w-xl">
                    <input className="input input-bordered rounded-sm w-full" defaultValue={user?.displayName ?? 'Name'} required {...register("name")} placeholder="Your Name" />
                    <input className="input input-bordered rounded-sm w-full" defaultValue={user?.email ?? "Email"} required {...register("email")} type="email" placeholder="Your Email" />


                    <div className="lg:flex md:flex gap-1 p-2 items-center justify-center border border-gray-700">
                        <div>
                            <h2 className="font-semibold my-1">Rent Start Date: {startDate ? startDate.toLocaleDateString() : <p className="text-color-s">{dateError}</p>}</h2>
                            <AvailableDate rentals={rentals} setDate={setStartDate} date={startDate} />
                        </div>
                        <div>
                            <p className="lg:inline md:inline hidden text-2xl text-color-s"><FaLongArrowAltRight /></p>
                            <p className="lg:hidden md:hidden inline text-2xl text-color-s"><FaLongArrowAltDown /></p>
                        </div>
                        <div>
                            <h2 className="font-semibold my-1">Rent End Date: {endDate ? endDate.toLocaleDateString() : <p className="text-color-s">{dateError}</p>}</h2>
                            <AvailableDate rentals={rentals} setDate={setEndDate} date={endDate} isEnd={true} />
                        </div>
                    </div>
                    <div className="  flex flex-col items-start border border-gray-700 p-2 w-full ">
                        <p className=" font-bold text-lg text-white">Rental Price: $ <span className=" text-2xl text-color-s">{bikeData?.rental_price_per_day}</span> <span className=" font-normal text-lg">(Per Day)</span></p>
                        <div className=" w-full">
                            <PaymentMethodBtn selectedMethod={selectedMethod} methodMsg={methodMsg}  handelMethod={handelMethod} > </PaymentMethodBtn>
                        </div>
                    </div>

                    <input className="btn-p my-2" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default RentNow;
