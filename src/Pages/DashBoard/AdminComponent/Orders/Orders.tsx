import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../CustomHocks/useAxiosSecure";
import DashPageHeading from "../../../../SharedComponent/DashPageHeading/DashPageHeading";
import PaginationButtons from "../../../../SharedComponent/PaginationButtons/PaginationButtons";
import ActionBar from "./ActionBar/ActionBar";
import OrderSummary from "./OrderSummary/OrderSummary";
import { useState } from "react";
import OrdersTable from "./OrdersTable/OrdersTable";

interface Product {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

 export interface Orders {
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
const defaultSummary: SummaryType = {
    totalRevenue: 0,
    totalTransactions: 0,
    totalCustomers: 0,
    totalProductsSold: 0,
};

interface ResDataType {
    totalPages: number;
    currentPage: number;
    orders: Orders[];
    orderSummary:SummaryType ;
}

const Orders = () => {
    const path: string[] = ['/my-dashBoard', '/order'];
    const pathName: string[] = ['DashBoard', 'Orders'];

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchValue, setSearchValue] = useState<string>('');
    const [filterDate, setFilterDate] = useState<Date | null>(null);
    const itemPerPage: number = 10; 

    const axiosSecure = useAxiosSecure();

    const { data, isLoading, error,refetch } = useQuery({
        queryKey: ['admin order', itemPerPage, searchValue, filterDate, currentPage],
        queryFn: async () => {
            const dateParam = filterDate ? filterDate.toISOString() : '';
            const dataRes = await axiosSecure.get(`/payment/orders?item=${itemPerPage}&search=${searchValue}&filterDate=${dateParam}&currentPage=${currentPage}`);
            return dataRes.data as ResDataType;
        }
    });

    

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const totalPages = data?.totalPages || 1;
    


    return (
        <div className=" flex flex-col gap-3">
            <DashPageHeading title="Orders" path={path} pathName={pathName}></DashPageHeading>
            <div className="p-3">
                <ActionBar setSearchValue={setSearchValue} searchValue={searchValue} setFilterDate={setFilterDate} filterDate={filterDate}></ActionBar>
                <OrderSummary summary={data?.orderSummary || defaultSummary} />
            </div>
            <div className="py-3">
            <OrdersTable isLoading={isLoading} tableData={data?.orders} refetch={refetch}></OrdersTable>
            </div>
          
            <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}></PaginationButtons>
        </div>
    );
};

export default Orders;
