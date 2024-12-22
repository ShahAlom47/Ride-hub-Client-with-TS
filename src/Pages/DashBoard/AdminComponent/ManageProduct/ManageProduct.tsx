import { useQuery } from "@tanstack/react-query";
import DashPageHeading from "../../../../SharedComponent/DashPageHeading/DashPageHeading";
import useAxiosSecure from "../../../../CustomHocks/useAxiosSecure";
import { useState } from "react";
import { Products } from "../../../Shop/Shop";
import Loading from "../../../../SharedComponent/Loading/Loading";
import { Link } from "react-router-dom";
import SearchBar from "../ManageBike/SearchBar/SearchBar";
import PaginationButtons from "../../../../SharedComponent/PaginationButtons/PaginationButtons";
import { IoIosAddCircleOutline } from "react-icons/io";
import ProductTable from "./ProductTable/ProductTable";

const path: string[] = ['/my-dashBoard', '/my-dashBoard/manageBike'];
const pathName: string[] = ['DashBoard', 'Manage Bike'];

interface ResDataType {
    totalPage: number;
    currentPage: number;
    data: Products[];

}

const ManageProduct = () => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchValue, setSearchValue] = useState<string>('');
    const item: number = 6;

    const axiosSecure = useAxiosSecure();

    const { data, isLoading,  refetch } = useQuery({
        queryKey: ['admin order', item, searchValue, currentPage],
        queryFn: async () => {

            // const dataRes = await axiosSecure.get(`/payment/bikes?item=${itemPerPage}&search=${searchValue}&currentPage=${currentPage}`);
            const dataRes = await axiosSecure.get(`/shopData//all-products?item=${item}&page=${currentPage}&searchValue=${searchValue}`);
            return dataRes.data as ResDataType;
        }
    });
    const totalPages = data?.totalPage || 1;

    const tableData = data?.data || []

    console.log(tableData);

    return (
        <div className=" flex flex-col gap-3">
            <DashPageHeading title="Manage Product" path={path} pathName={pathName}></DashPageHeading>
            {
                isLoading ? <Loading /> :
                    <div className=" flex  flex-col justify-between">
                        <div className="pb-4 ">
                            <div className=" flex gap-3 justify-between flex-wrap p-1 mb-3">
                                <Link to={'/my-dashBoard/addBike'}>  <button className=" flex items-center gap-1 btn btn-sm group "><IoIosAddCircleOutline className=" group-hover:text-color-s" /> Add New Product</button></Link>
                                <SearchBar setSearchValue={setSearchValue} searchValue={searchValue}></SearchBar>
                            </div>
                       
                        <ProductTable tableData={tableData} refetch={refetch}></ProductTable>

                        </div>
                        <PaginationButtons currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} ></PaginationButtons>
                    </div>

            }

        </div>
    );
};

export default ManageProduct;