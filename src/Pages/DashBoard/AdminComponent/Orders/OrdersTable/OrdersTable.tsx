import Loading from "../../../../../SharedComponent/Loading/Loading";
import { Orders } from "../Orders";
import { ResponsiveTable } from "responsive-table-react";
import './table.css'

interface OrdersTableProps {
    tableData?: Orders[];
    isLoading: boolean;
}

const OrdersTable = ({ tableData = [], isLoading }: OrdersTableProps) => {
    // Define the columns for the ResponsiveTable

    const onStatusChange = async (id: string, value: string) => {
        console.log(id, value);

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
        orderDate: new Date(order.orderDate).toLocaleDateString(), // Format date if needed
        status: order.status,
        action: (
            <select
                value={order.status}
                onChange={(e) => onStatusChange(order._id, e.target.value)} // Call the parent function on change
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
