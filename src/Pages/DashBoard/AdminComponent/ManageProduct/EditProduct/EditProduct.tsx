import { useNavigate, useParams } from "react-router-dom";
import DashPageHeading from "../../../../../SharedComponent/DashPageHeading/DashPageHeading";
import { useQuery } from "@tanstack/react-query";
import { Products } from "../../../../Shop/Shop";
import useAxiosPublic from "../../../../../CustomHocks/useAxiosPublic";
import ProductForm, { ProductFormValues } from "../ProductForm/ProductForm";
import useAxiosSecure from "../../../../../CustomHocks/useAxiosSecure";
import Swal from "sweetalert2";
import UploadPhoto from "../../../../../SharedComponent/UploadPhoto/UploadPhoto";
import { useState } from "react";

interface ResType {
    success: boolean,
    message: string,
}


const EditProduct = () => {
    const { id } = useParams()
    const AxiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const [imgUrl, setImgUrl] = useState<string>('')
 

    const { data } = useQuery({
        queryKey: ['bike edit data', id],
        queryFn: async () => {
            const res = await AxiosPublic.get<Products>(`/shopData/productDetails/${id}`)
            return res?.data
        },

    })

  

    const formHandel = async (data: ProductFormValues) => {
        console.log(data);
        try {
            const updateRes = await axiosSecure.patch<ResType>(`/shopData/editProduct/${id}`,{ ...data, img:imgUrl});

            // Update response data extraction
            const resData = updateRes.data;

            Swal.fire({
                toast: true,
                text: resData?.message || "Something went wrong!",
                icon: resData?.success ? 'success' : 'error',
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            if (resData.success) (
                setTimeout(() => {
                    navigate('/my-dashBoard/manageProduct')
                }, 1200))




        } catch (error) {
            console.error(error);

            Swal.fire({
                toast: true,
                text: "Failed to update product!",
                icon: 'error',
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    };


    const path: string[] = ['/my-dashBoard', '/my-dashBoard/manageProduct', '/my-dashBoard/manageProduct'];
    const pathName: string[] = ['DashBoard', 'Manage Product', "Edit"];
    return (
        <div>
            <DashPageHeading title="Edit" path={path} pathName={pathName}></DashPageHeading>
            <div className=" grid gap-3 lg:grid-cols-12 md:grid-cols-12 grid-cols-1  mb-4 text-white ">
                <div className=" lg:col-span-4 md:col-span-4 col-span-12  border rounded-md bg-color-op ">
                    <h1 className="  font-medium pb-4 border-b  p-2 bg-color-op text-lg "> Product Image </h1>
                    <div className=" my-2 p-3">
                        <UploadPhoto setImgUrl={setImgUrl} previousImg={data?.img} ></UploadPhoto>

                    </div>

                </div>

                <div className="lg:col-span-8 md:col-span-8 col-span-12 border rounded-md bg-color-op ">
                    <h1 className="  font-medium   border-b pb-4  p-2 text-lg"> General Information  </h1>
                    <div className=" my-2">
                        <ProductForm formHandel={formHandel}  productData={data || null}></ProductForm>

                    </div>
                </div>


            </div>
        </div>
    );;
};

export default EditProduct;