import Loading from "../../../../../SharedComponent/Loading/Loading";
import { Orders } from "../Orders";
import { ResponsiveTable } from "responsive-table-react";
import './table.css'
import useAxiosSecure from "../../../../../CustomHocks/useAxiosSecure";
import Swal from "sweetalert2";

interface OrdersTableProps {
    tableData?: Orders[];
    isLoading: boolean;
    refetch: ()=>void
}
interface ResType {
    status: boolean;
    message?: string;
}

const OrdersTable = ({ tableData = [], isLoading ,refetch}: OrdersTableProps) => {
    const axiosAxios = useAxiosSecure();

    const onStatusChange = async (id: string, value: string) => {

        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(  async (result) => {
            if (result.isConfirmed) {
                const updateRes = await axiosAxios.patch<ResType> (`/payment/updateOrder/${id}`, { status: value })
                console.log(updateRes);
                if (updateRes.data?.status) {
                    refetch()
                      Swal.fire({
                        
                        text:updateRes.data?.message ||'',
                        icon: "success",
                        toast:true,
                        position:"top-right"

                      });


                }


                //   Swal.fire({
                //     title: "Deleted!",
                //     text: "Your file has been deleted.",
                //     icon: "success"
                //   });
            }
        });



    }




    const columns = [
        {
            id: "name",
            text: "Name",
        },
        {
            id: "email",
            text: "Email",
        },
        {
            id: "finalAmount",
            text: "Final Amount",
        },
        {
            id: "orderDate",
            text: "Order Date",
        },
        {
            id: "status",
            text: "Status",
        },
        {
            id: "action",
            text: "Action",
        },
    ];

    // Transform the tableData to match the columns
    const data = tableData.map((order) => ({
        name: order.name,
        email: order.email,
        finalAmount: order.finalAmount,
        orderDate: new Date(order.orderDate).toLocaleDateString(),
        status: order.status,
        action: (
            <select
                className="bg-color-s p-1 rounded-sm cursor-pointer border"
                value={order.status}
                onChange={(e) => onStatusChange(order._id, e.target.value)}
            >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
            </select>
        ),
    }));

    // Show loading component while data is being fetched
    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="overflow-x-auto bg-color-op">
            <ResponsiveTable
                columns={columns}
                data={data}


            />
        </div>
    );
};

export default OrdersTable;
