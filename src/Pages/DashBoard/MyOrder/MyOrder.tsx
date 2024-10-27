import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../CustomHocks/useAxiosSecure";
import useUser from "../../../CustomHocks/useUser";

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Product } from "../../CheckOut/CheckOut";
import DashPageHeading from "../../../SharedComponent/DashPageHeading/DashPageHeading";
import { useState } from "react";

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

const MyOrder = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [productIndex, setIndex]=useState<number>(0)
    const { data, isLoading, error } = useQuery({
        queryKey: ['userOrderData', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get<FinalDataType[]>(`/payment/orderData/${user?.email}`);
            return res.data;
        }
    });

    console.log(data);



    const toggleDropdown = (index:number) =>{
        setIndex(index)
        setIsOpen(!isOpen);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error occurred while fetching data.</div>;
    }

    return (
        <div>
            <DashPageHeading title="My Order"></DashPageHeading>

            <Table className=" my-5">
                <Thead>
                    <Tr className=" text-xl bg-color-op  py-3" >

                        <Th className="text-start">Date</Th>
                        <Th className=" a text-start">Status</Th>
                        <Th className=" a text-start">Total Amount</Th>
                        <Th className=" a text-start">Payment Method</Th>
                        <Th className=" a text-start">Total Product</Th>
                        <Th className=" a text-start">Products</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data?.map((order,i) => (
                        <Tr key={order._id} className="mb-2 pb-2" >
                            <Td className=" pl-3 py-1">{new Date(order.orderDate).toLocaleDateString()}</Td>
                            <Td className=" pl-3">{order.status}</Td>
                            <Td className=" pl-3">${order.totalAmount.toFixed(2)}</Td>
                            <Td className=" pl-3">{order.paymentMethod}</Td>
                            <Td className=" pl-3">{order.products?.length}</Td>

                            <Td className="pl-3 relative">
                                <button
                                    className="btn-s"
                                    onClick={()=> toggleDropdown(i)}>
                                    Total Products: {order.products.length}
                                </button>


                                {isOpen && productIndex===i && (
                                    <div className="absolute top-full left-0 mt-2 w-64 text-white bg-color-op z-50 shadow-lg rounded border overflow-auto max-h-64">

                                        {order.products.map((product, idx) => (
                                            <li
                                                key={`${product?.productId}-${idx}`} // Product ID এর সাথে Index যোগ করা হয়েছে
                                                className="flex justify-between items-center py-1 border-b"
                                            >
                                                <span>{product.productName}</span>
                                                <span>{product.quantity} x ${product.price}</span>
                                            </li>
                                        ))}

                                    </div>
                                )}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </div>
    );
};

export default MyOrder;     