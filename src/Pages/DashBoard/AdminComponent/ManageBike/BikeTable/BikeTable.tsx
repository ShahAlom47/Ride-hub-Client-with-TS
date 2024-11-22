
import { FaTruckMoving } from "react-icons/fa";
import { bikeDataType } from "../../../../OurBikes/BikeCard/BikeCard";

import { ResponsiveTable } from "responsive-table-react";


interface PropsType {
    tableData: bikeDataType[];
    refetch: () => void;
}

const BikeTable = ({ tableData, refetch }: PropsType) => {
    console.log(refetch);
    console.log(tableData);

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
            "id": "status",
            "text": "Status"
        },
        {
            "id": "action",
            "text": "Action"
        },
    ]

    const data = tableData?.map((bike) => ({
        img: (<img className="w-14 h-14" src={bike?.bike_image} alt="bike photo" />),
        brand: bike.brand,
        model: bike?.model,
        rentPrice: bike.rental_price_per_day,
        status: bike?.availability ? <p className=" text-green-600">Available</p> : <p className=" text-color-s">Not Available</p>,
        action: (<button className=" btn-s">Edit</button>)
    }))




    return (
        <div className=" mb-5">
            {/* <ResponsiveTable
                columns={columns}
                data={data}
            /> */}
            <div>
            <div className="flex items-center justify-center">
                    <div className="rounded-full border-2 border-orange-400 w-[100px] h-[100px] flex items-center justify-center">
                        <div className="w-[80px] h-[80px] rounded-full bg-orange-400 flex items-center justify-center transition hover:rounded-tr-[120%] hover:rounded-bl-[120%]  hover:rounded-tl-[100%] hover:rounded-br-[100%]  ">
                            <FaTruckMoving className="text-white text-4xl" />
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    );
};

export default BikeTable;