import DashPageHeading from "../../../../../SharedComponent/DashPageHeading/DashPageHeading";
import AddBikeForm from "./AddBikeForm/AddBikeForm";



const AddBike = () => {
    const path: string[] = ['/my-dashBoard', '/my-dashBoard/addBike'];
    const pathName: string[] = ['DashBoard', 'Add Bike'];
    return (
        <div className="pb-10">
            <DashPageHeading title="Add Bike" path={path} pathName={pathName}></DashPageHeading>

            <AddBikeForm></AddBikeForm>

        </div>
    );
};

export default AddBike;