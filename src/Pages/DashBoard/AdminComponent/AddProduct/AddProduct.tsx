import { useState } from "react";
import DashPageHeading from "../../../../SharedComponent/DashPageHeading/DashPageHeading";
import UploadPhoto from "../../../../SharedComponent/UploadPhoto/UploadPhoto";
import ProductForm, { ProductFormValues } from "../ManageProduct/ProductForm/ProductForm";
import useAxiosSecure from "../../../../CustomHocks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

interface ResType {
    message: string;
    success: boolean

}

const path: string[] = ['/my-dashBoard', '/my-dashBoard/addProduct',];
const pathName: string[] = ['DashBoard', 'Add Product'];

const AddProduct = () => {
    const [imgUrl, setImgUrl] = useState('')
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const formHandel = async (data: ProductFormValues) => {
        const productData = { ...data, img: imgUrl }
        console.log(productData);
        const AddRes = await axiosSecure.post<ResType>('/shopData/addProduct',productData)
        const resData = AddRes?.data
        console.log(resData);

        Swal.fire({
            toast: true,
            text: resData?.message || "Something went wrong!",
            icon: resData?.success ? 'success' : 'error',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });
        if (resData.success) {
            setTimeout(() => {
                navigate('/my-dashBoard/manageProduct')
            }, 1200);

        }

    }

    return (
        <div>
            <DashPageHeading title="Add Product" path={path} pathName={pathName}></DashPageHeading>
            <div className=" grid gap-3 lg:grid-cols-12 md:grid-cols-12 grid-cols-1  mb-4 text-white ">
                <div className=" lg:col-span-4 md:col-span-4 col-span-12  border rounded-md bg-color-op ">
                    <h1 className="  font-medium pb-4 border-b  p-2 bg-color-op text-lg "> Product Image </h1>
                    <div className=" my-2 p-3">
                        <UploadPhoto setImgUrl={setImgUrl} ></UploadPhoto>

                    </div>

                </div>

                <div className="lg:col-span-8 md:col-span-8 col-span-12 border rounded-md bg-color-op ">
                    <h1 className="  font-medium   border-b pb-4  p-2 text-lg"> General Information  </h1>
                    <div className=" my-2">
                        <ProductForm formHandel={formHandel} productData={null}></ProductForm>

                    </div>
                </div>


            </div>
        </div>
    );;
};

export default AddProduct;