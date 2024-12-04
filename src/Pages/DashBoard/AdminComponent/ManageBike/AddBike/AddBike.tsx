import DashPageHeading from "../../../../../SharedComponent/DashPageHeading/DashPageHeading";
import EditForm from "../EditBikeData/EditForm/EditForm";


const AddBike = () => {
    const path: string[] = ['/my-dashBoard', '/my-dashBoard/addBike'];
    const pathName: string[] = ['DashBoard', 'Add Bike'];
    return (
        <div>
                <DashPageHeading title="Add Bike" path={path} pathName={pathName}></DashPageHeading>
            
            <EditForm bikeData={null}></EditForm>
        </div>
    );
};

export default AddBike;