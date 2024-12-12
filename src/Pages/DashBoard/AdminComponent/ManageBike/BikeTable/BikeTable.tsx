

import { Link } from "react-router-dom";
import { bikeDataType } from "../../../../OurBikes/BikeCard/BikeCard";

import { ResponsiveTable } from "responsive-table-react";
import { MdDeleteSweep } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../CustomHocks/useAxiosSecure";


interface PropsType {
    tableData: bikeDataType[];
    refetch: () => void;
}
interface ResType {

    success: boolean;
    message: string
}

const BikeTable = ({ tableData, refetch }: PropsType) => {
    const axiosSecure = useAxiosSecure();

    const columns = [
        {
            "id": "img",
            "text": "Photo"
        },
        {
            "id": "brand",
            "text": "Brand"
        },
        {
            "id": "model",
            "text": "Model"
        },
        {
            "id": "rentPrice",
            "text": "Rent Price"
        },
        {
            "id": "action",
            "text": "Action"
        },
        {
            "id": "delete",
            "text": "Delete"
        },
    ]

    const data = tableData?.map((bike) => ({
        img: (<img className="w-14 h-14" src={bike?.bike_image} alt="bike photo" />),
        brand: bike.brand,
        model: bike?.model,
        rentPrice: (<p>$ {bike.rental_price_per_day}</p>),
        action: (<Link to={`/my-dashBoard/editBike/${bike?._id}`}><button className=" btn-s">View $ Edit</button></Link>),
        delete: (<button type="button" onClick={() => handleDeleteBike(bike?._id)} className=" text-3xl  text-color-s hover:text-4xl transition-all duration-300"><MdDeleteSweep /></button>)
    }))


    const handleDeleteBike = async (id: string): Promise<void> => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",

            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const deleteRes = await axiosSecure.delete<ResType>(`/bikeData/deleteBike/${id}`)

                Swal.fire({
                    toast: true,
                    icon: deleteRes?.data.success ? 'success' : 'error',
                    title: deleteRes?.data.message,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });


                if (deleteRes?.data.success) {
                    refetch()
                }


            }
        });

    };



    return (
        <div className=" mb-5">
            <ResponsiveTable
                columns={columns}
                data={data}

            />

        </div>
    );
};

export default BikeTable;