import { useParams } from "react-router-dom";
import DashPageHeading from "../../../../../SharedComponent/DashPageHeading/DashPageHeading";

const path: string[] = ['/my-dashBoard', '/my-dashBoard/manageBike','/my-dashBoard/manageBike'];
const pathName: string[] = ['DashBoard', 'Manage Bike', "Edit"];
const EditBikeData = () => {
    const {id}=useParams()
    console.log(id);
    return (
        <div>
             <DashPageHeading title="Edit" path={path} pathName={pathName}></DashPageHeading>
            EditBikeData
        </div>
    );
};

export default EditBikeData;