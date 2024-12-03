import { useParams } from "react-router-dom";
import { TailSpin } from 'react-loader-spinner'
import DashPageHeading from "../../../../../SharedComponent/DashPageHeading/DashPageHeading";
import useBikeDetailsData from "../../../../../CustomHocks/useBikeDetailsData";

import bikeImage from '../../../../../assets/image/bikeCard.jpg'
import { MdOutlineFileUpload } from "react-icons/md";
import EditForm from "./EditForm/EditForm";
import Loading from "../../../../../SharedComponent/Loading/Loading";
import ReactModal from "../../../../../SharedComponent/ReactModal/ReactModal";
import { useState } from "react";
import useGetUploadedImageUrl from "../../../../../CustomHocks/useGetUploadedImageUrl";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../../CustomHocks/useAxiosSecure";

interface  PropsType {

    success:boolean;
    message:string
}

const path: string[] = ['/my-dashBoard', '/my-dashBoard/manageBike', '/my-dashBoard/manageBike'];
const pathName: string[] = ['DashBoard', 'Manage Bike', "Edit"];


const EditBikeData = () => {
    const { id } = useParams()
    const AxiosSecure= useAxiosSecure()
    const { data, isLoading,refetch } = useBikeDetailsData(id)
    const [modalIsOpen, setIsOpen] = useState(false)
    const { uploadImage, loading, error } = useGetUploadedImageUrl()

    const handleBikePhoto = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // File input value
        const file = (e.target as HTMLFormElement).photo.files?.[0];

        if (file) {
            const imageUrl = await uploadImage(file, 'Bike Photos')

            if (error) {
                Swal.fire({
                    toast: true,
                    icon: 'error', 
                    title: "Try Again",
                    text: error, 
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000 
                });
            }

            if (!loading && error === null) {
                const imgSetRes = await AxiosSecure.patch <PropsType>(`/bikeData/changeBikePhoto/${id}`,{imageUrl:imageUrl})
             
                Swal.fire({
                    toast: true,
                    icon:imgSetRes?.data.success?'success':'error', 
                    title: imgSetRes?.data.message,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000 
                });

                if(imgSetRes?.data.success){
                    setIsOpen(false)
                    refetch()
                }
            }

        } else {
            console.error("No file selected");
        }
    };

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
                            <img className=" rounded-md" src={data?.bike_image ||bikeImage} alt=" bike photo" />
                        </div>
                        <div className=" flex justify-between gap-2 py-4 border-b">
                            <button onClick={() => setIsOpen(true)} className="flex items-center btn btn-ghost btn-sm"> <MdOutlineFileUpload /> Add Image</button>
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

                <ReactModal setIsOpen={setIsOpen} modalIsOpen={modalIsOpen} label="bikePhotoChange" >
                    <div className="bg-color-op  p-5 pt-12">
                        <form onSubmit={handleBikePhoto} className=" flex items-center m-3 p-0 bg-black  ">
                            <input type="file" name="photo" id="" />
                            {
                                loading ?
                                    <button type="button" style={{ padding: '6px' }} className=" btn-p w-20  flex justify-center">
                                        <TailSpin
                                            visible={true}
                                            height="20"
                                            width="20"
                                            color="#fff"
                                            ariaLabel="tail-spin-loading"
                                            radius="3"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                        />
                                    </button> :
                                    <button type="submit" className=" btn-p w-20">Upload</button>
                            }
                        </form>
                    </div>
                </ReactModal>
            </div>
        </div>
    );
};

export default EditBikeData;