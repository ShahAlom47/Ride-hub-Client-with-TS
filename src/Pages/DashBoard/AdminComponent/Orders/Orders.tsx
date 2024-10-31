import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../CustomHocks/useAxiosSecure";
import DashPageHeading from "../../../../SharedComponent/DashPageHeading/DashPageHeading";
import PaginationButtons from "../../../../SharedComponent/PaginationButtons/PaginationButtons";
import ActionBar from "./ActionBar/ActionBar";
import OrderSummary from "./OrderSummary/OrderSummary";
import { useState } from "react";




interface Product {
    // Define the properties for each product in the products array if known
    // Example:
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

interface Order {
    _id: string;
    address: string;
    couponValue: string;
    discountAmount: number;
    email: string;
    finalAmount: number;
    name: string;
    orderDate: string; // ISO date string, consider using Date if you parse it
    paymentMethod: string;
    products: Product[];
    state: string; // Can be further defined as an enum if there are specific states
    status: string; // Can also be defined as an enum if needed
    totalAmount: number;
    totalProduct: number;
    transactionId: string;
    type: string; // Consider using a union type if you have a limited set of types
    userEmail: string;
}

interface ResDataType {
    totalPages: number;
    currentPage: number;
    orders:Order

}

const Orders = () => {
    const path: string[] = ['/my-dashBoard', '/order'];
    const pathName: string[] = ['DashBoard', 'Orders'];

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchValue, setSearchValue] = useState<string>('');
    const [filterDate, setFilterDate] = useState<Date | null>(null);
    const itemPerPage: number = 3; 

    const axiosSecure = useAxiosSecure();

    const { data, isLoading, error } = useQuery({
        queryKey: ['admin order', itemPerPage, searchValue, filterDate, currentPage],
        queryFn: async () => {
            const dataRes = await axiosSecure.get(`/payment/orders?item=${itemPerPage}&search=${searchValue}&filterDate=${filterDate}&currentPage=${currentPage}`);
            return dataRes.data as ResDataType;
        }
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const totalPages = data?.totalPages || 1;
    console.log(data ,filterDate);

    return (
        <div>
            <DashPageHeading title="Orders" path={path} pathName={pathName}></DashPageHeading>
            <div className="p-3">
                <ActionBar setSearchValue={setSearchValue} setFilterDate={setFilterDate} filterDate={filterDate}></ActionBar>
                <OrderSummary ></OrderSummary>
                <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}></PaginationButtons>
            </div>
        </div>
    );
};

export default Orders;
