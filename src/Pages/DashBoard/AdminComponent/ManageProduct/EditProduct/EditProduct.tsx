import { useParams } from "react-router-dom";
import DashPageHeading from "../../../../../SharedComponent/DashPageHeading/DashPageHeading";
import { useQuery } from "@tanstack/react-query";
import { Products } from "../../../../Shop/Shop";
import useAxiosPublic from "../../../../../CustomHocks/useAxiosPublic";
import ProductForm, { ProductFormValues } from "../ProductForm/ProductForm";


const EditProduct = () => {
    const { id } = useParams()
    const AxiosPublic = useAxiosPublic()

    const { data } = useQuery({
        queryKey: ['bike edit data', id],
        queryFn: async () => {
            const res = await AxiosPublic.get<Products>(`/shopData/productDetails/${id}`)
            return res?.data
        },

    })

    const formHandel = (data: ProductFormValues) => {
        console.log(data);

    }

    const path: string[] = ['/my-dashBoard', '/my-dashBoard/manageProduct', '/my-dashBoard/manageProduct'];
    const pathName: string[] = ['DashBoard', 'Manage Product', "Edit"];
    return (
        <div>
            <DashPageHeading title="Edit" path={path} pathName={pathName}></DashPageHeading>
            <div className=" grid gap-3 lg:grid-cols-12 md:grid-cols-12 grid-cols-1  mb-4 text-white ">
                <div className=" lg:col-span-4 md:col-span-4 col-span-12  border rounded-md bg-color-op ">
                    <h1 className="  font-medium pb-4 border-b  p-2 bg-color-op text-lg "> Product Image </h1>
                    <div className=" my-2 p-3">


                    </div>

                </div>

                <div className="lg:col-span-8 md:col-span-8 col-span-12 border rounded-md bg-color-op ">
                    <h1 className="  font-medium   border-b pb-4  p-2 text-lg"> General Information  </h1>
                    <div className=" my-2">
                        <ProductForm formHandel={formHandel} productData={data || null}></ProductForm>

                    </div>
                </div>


            </div>
        </div>
    );;
};

export default EditProduct;