import { useParams } from "react-router-dom";
import DashPageHeading from "../../../../../SharedComponent/DashPageHeading/DashPageHeading";
import useBikeDetailsData from "../../../../../CustomHocks/useBikeDetailsData";

import bikeImage from '../../../../../assets/image/bikeCard.jpg'
import { MdOutlineFileUpload } from "react-icons/md";
import EditForm from "./EditForm/EditForm";
import Loading from "../../../../../SharedComponent/Loading/Loading";

const path: string[] = ['/my-dashBoard', '/my-dashBoard/manageBike', '/my-dashBoard/manageBike'];
const pathName: string[] = ['DashBoard', 'Manage Bike', "Edit"];


const EditBikeData = () => {
    const { id } = useParams()
    const { data, isLoading } = useBikeDetailsData(id)
    console.log(id, data);
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <DashPageHeading title="Edit" path={path} pathName={pathName}></DashPageHeading>
            <div className=" grid gap-3 lg:grid-cols-12 md:grid-cols-12 grid-cols-1  mb-4 text-white ">
                <div className=" lg:col-span-4 md:col-span-4 col-span-12  border rounded-md bg-color-op ">
                    <h1 className="  font-medium pb-4 border-b  p-2 bg-color-op text-lg "> Product Image </h1>
                    <div className=" my-2 p-3">
                        <h1 className=" mb-3">Image</h1>
                        <div className="  overflow-hidden rounded-md">
                            <img className=" rounded-md" src={bikeImage} alt=" bike photo" />
                        </div>
                        <div className=" flex justify-between gap-2 py-4 border-b">
                            <button className="flex items-center btn btn-ghost btn-sm"> <MdOutlineFileUpload /> Add Image</button>
                            <button className="btn btn-ghost btn-sm btn-p">Remove</button>
                        </div>

                    </div>

                </div>

                <div className="lg:col-span-8 md:col-span-8 col-span-12 border rounded-md bg-color-op ">
                    <h1 className="  font-medium   border-b pb-4  p-2 text-lg"> General Information  </h1>
                    <div className=" my-2">
                        <EditForm bikeData={data!}></EditForm>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBikeData;