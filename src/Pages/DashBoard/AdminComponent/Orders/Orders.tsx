import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../CustomHocks/useAxiosSecure";
import DashPageHeading from "../../../../SharedComponent/DashPageHeading/DashPageHeading";
import PaginationButtons from "../../../../SharedComponent/PaginationButtons/PaginationButtons";
import ActionBar from "./ActionBar/ActionBar";
import OrderSummary from "./OrderSummary/OrderSummary";
import { useState } from "react";

interface Product {
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
    orderDate: string;
    paymentMethod: string;
    products: Product[];
    state: string;
    status: string;
    totalAmount: number;
    totalProduct: number;
    transactionId: string;
    type: string;
    userEmail: string;
}
export interface SummaryType {
    totalCustomers:number;
    totalProductsSold:number;
    totalRevenue:number;
    totalTransactions:number;


}

interface ResDataType {
    totalPages: number;
    currentPage: number;
    orders: Order[];
    orderSummary:SummaryType ;
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
            const dateParam = filterDate ? filterDate.toISOString() : '';
            const dataRes = await axiosSecure.get(`/payment/orders?item=${itemPerPage}&search=${searchValue}&filterDate=${dateParam}&currentPage=${currentPage}`);
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
    
    console.log(data);

    return (
        <div>
            <DashPageHeading title="Orders" path={path} pathName={pathName}></DashPageHeading>
            <div className="p-3">
                <ActionBar setSearchValue={setSearchValue} searchValue={searchValue} setFilterDate={setFilterDate} filterDate={filterDate}></ActionBar>
                <OrderSummary summary={data?.orderSummary} ></OrderSummary>
            </div>
            <div className="py-3">
                {data?.orders?.map(order => (
                    <div key={order._id} className="flex gap-4">
                        <p>{order.name}</p>
                        <p>{order.email}</p>
                        <p>{order.orderDate}</p>
                        <p>{new Date(order.orderDate).toLocaleDateString()}</p>
                        <p>{order.totalAmount}</p>
                    </div>
                ))}
            </div>
            <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}></PaginationButtons>
        </div>
    );
};

export default Orders;
