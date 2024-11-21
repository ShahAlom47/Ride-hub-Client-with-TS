import { bikeDataType } from "../../../../OurBikes/BikeCard/BikeCard";


interface PropsType {
    tableData:bikeDataType[];
    refetch: ()=>void;
}

const BikeTable = ({tableData,refetch}:PropsType) => {
    console.log(refetch);
    return (
        <div>
            {
                tableData.map((bike,index)=><div key={index}>

                    <h1> {bike.brand}</h1>
                </div>)
            }
            
        </div>
    );
};

export default BikeTable;