import { useParams } from "react-router-dom";
import useBikeDetailsData from "../../../CustomHocks/useBikeDetailsData";
import PageHeading from "../../../SharedComponent/PageHeading/PageHeading";
import { BikeData } from "../BikeDataInterFace/bikeDataIterFace";

const BikeDetails = () => {
    const path: string[] = ['/', '/our-bikes', 'bike-details'];
    const pathName: string[] = ['Home', 'Our Bike', 'Bike Details'];

    const { id } = useParams<{ id: string }>(); // Type the id parameter
    const { data } = useBikeDetailsData(id);
    const bikeData = data as BikeData | undefined; 
  

    return (
        <div>
            <PageHeading title={`${bikeData?.brand}  ${bikeData?.model}`} path={path} pathName={pathName} />
        </div>
    );
};

export default BikeDetails;
