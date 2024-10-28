import DashPageHeading from "../../../../SharedComponent/DashPageHeading/DashPageHeading";


const Orders = () => {
    const path: string[] = ['/my-dashBoard', '/order'];
    const pathName: string[] = ['DashBoard', 'Orders'];


    return (
        <div>
            <DashPageHeading title="Orders" path={path}  pathName={pathName} ></DashPageHeading>

        </div>
    );
};

export default Orders;