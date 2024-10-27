import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHocks/useAxiosSecure";
import useUser from "../../../CustomHocks/useUser";

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Product } from "../../CheckOut/CheckOut";
import DashPageHeading from "../../../SharedComponent/DashPageHeading/DashPageHeading";
import { useState } from "react";
import Swal from "sweetalert2";

interface Order {
    orderDate: string;
    products: Product[];
    status: string;
    totalAmount: number;
    totalProduct: number;
    userEmail: string;
    _id: string;
}



export interface FinalDataType extends Order {

    finalAmount: number;
    name: string;
    email: string;
    address: string;
    state: string;
    discountAmount?: number;
    paymentMethod: string;
    couponValue: string | null;
}

interface ResponseType {
    status:boolean;
    message:'string'
}

const MyOrder = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [productIndex, setIndex] = useState<number>(0)
    const { data, isLoading, error , refetch} = useQuery({
        queryKey: ['userOrderData', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get<FinalDataType[]>(`/payment/orderData/${user?.email}`);
            return res.data;
        }
    });

    console.log(data);



    const toggleDropdown = (index: number) => {
        setIndex(index)
        setIsOpen(!isOpen);
    }



    const handleCancelOrder = async (id: string, status: string) => {

        if (status !== "Processing") {
            Swal.fire({
                icon: "info",
                title: "This product is already on the way!",
                text: "You can't cancel this product.",
                confirmButtonText: "OK",
            });
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel this order?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, cancel it!",
        }).then(async (result) => {
            if (result.isConfirmed) {

                const cancelRes = await axiosSecure.patch <ResponseType> (`/payment/cancelOrder/${id}`)

                if (cancelRes.data?.status) {
                    refetch()
                    Swal.fire({
                        icon: "success",
                        title: "Cancelled!",
                        text: "Your order has been cancelled. You will receive your refund within 24 hours.",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#3085d6",
                    });

                }

                Swal.fire({
                    icon: "success",
                    title: "Cancelled!",
                    text: "Your order has been cancelled. You will receive your refund within 24 hours.",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#3085d6",
                });
            }
        });
    };


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error occurred while fetching data.</div>;
    }

    return (
        <div>
            <DashPageHeading title="My Order"></DashPageHeading>

            <Table className=" my-5 ">
                <Thead className=" my-6">
                    <Tr className=" text-xl bg-color-op  py-3" >

                        <Th className="text-start pl-2">Date</Th>
                        <Th className=" a text-start">Status</Th>
                        <Th className=" a text-start">Total Amount</Th>
                        <Th className=" a text-start">Payment Method</Th>
                        <Th className=" a text-start">Products</Th>
                        <Th className=" a text-start">Action</Th>
                    </Tr>
                </Thead>
                <Tbody className=" py-2  my-6 text-xl ">
                    {data?.map((order, i) => (
                        <Tr key={order._id} className="my-2 pb-2" >
                            <Td className=" pl-3 py-1">{new Date(order.orderDate).toLocaleDateString()}</Td>
                            <Td className=" pl-3">{order.status}</Td>
                            <Td className=" pl-3">${order.totalAmount.toFixed(2)}</Td>
                            <Td className=" pl-3">{order.paymentMethod}</Td>

                            <Td className="pl-3 relative">
                                <button
                                    className="btn-s"
                                    onClick={() => toggleDropdown(i)}>
                                    Total Products: {order.products.length}
                                </button>


                                {isOpen && productIndex === i && (
                                    <div className="absolute top-full left-0 mt-2 w-64 text-white bg-color-op z-50 shadow-lg rounded  overflow-auto max-h-64">

                                        {order.products.map((product, idx) => (
                                            <li
                                                key={`${product?.productId}-${idx}`}
                                                className="flex justify-between items-center py-1 border-b"
                                            >
                                                <span>{product.productName}</span>
                                                <span>{product.quantity} x ${product.price}</span>
                                            </li>
                                        ))}

                                    </div>
                                )}
                            </Td>

                            <Tr>  <button onClick={() => handleCancelOrder(order._id, order.status)} className="btn-p">  Cancel</button>  </Tr>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </div>
    );
};

export default MyOrder;     