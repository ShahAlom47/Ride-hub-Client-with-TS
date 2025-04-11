import { useState } from "react";
import useAxiosSecure from "../../../../CustomHocks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { bikeDataType } from "../../../OurBikes/BikeCard/BikeCard";
import DashPageHeading from "../../../../SharedComponent/DashPageHeading/DashPageHeading";
import PaginationButtons from "../../../../SharedComponent/PaginationButtons/PaginationButtons";
import SearchBar from "./SearchBar/SearchBar";
import BikeTable from "./BikeTable/BikeTable";
import Loading from "../../../../SharedComponent/Loading/Loading";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

interface ResDataType {
  totalPage: number;
  currentPage: number;
  data: bikeDataType[];
}

const ManageBike = () => {
  const path: string[] = ["/my-dashBoard", "/my-dashBoard/manageBike"];
  const pathName: string[] = ["DashBoard", "Manage Bike"];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const item: number = 6;

  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin order", item, searchValue, currentPage],
    queryFn: async () => {
      // const dataRes = await axiosSecure.get(`/payment/bikes?item=${itemPerPage}&search=${searchValue}&currentPage=${currentPage}`);
      const dataRes = await axiosSecure.get(
        `/bikeData/all-bikeData?item=${item}&page=${currentPage}&searchValue=${searchValue}`
      );
      return dataRes.data as ResDataType;
    },
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const totalPages = data?.totalPage || 1;
  const tableData = data?.data || [];

  return (
    <div className=" flex flex-col gap-3">
      <DashPageHeading
        title="Manage Bike"
        path={path}
        pathName={pathName}
      ></DashPageHeading>
      {isLoading ? (
        <Loading />
      ) : (
        <div className=" flex  flex-col justify-between">
          <div className="pb-4 ">
            <div className=" flex gap-3 justify-between flex-wrap p-1 mb-3">
              <Link to={"/my-dashBoard/addBike"}>
                {" "}
                <button className=" flex items-center gap-1 btn btn-sm group ">
                  <IoIosAddCircleOutline className=" group-hover:text-color-s" />{" "}
                  Add New Bike
                </button>
              </Link>
              <SearchBar
                setSearchValue={setSearchValue}
                searchValue={searchValue}
              ></SearchBar>
            </div>
            <BikeTable tableData={tableData} refetch={refetch}></BikeTable>
          </div>
          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          ></PaginationButtons>
        </div>
      )}
    </div>
  );
};

export default ManageBike;
