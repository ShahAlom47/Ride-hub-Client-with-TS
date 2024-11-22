
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
            <ResponsiveTable
                columns={columns}
                data={data}
               />

        </div>
    );
};

export default BikeTable;