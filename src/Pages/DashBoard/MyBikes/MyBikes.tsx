import DashPageHeading from "../../../SharedComponent/DashPageHeading/DashPageHeading";

const path: string[] = ['/my-dashBoard', '/my- bikes'];
const pathName: string[] = ['DashBoard', 'My Bikes'];
const MyBikes = () => {

    
    return (
        <div>
            <DashPageHeading title="My Bikes" path={path} pathName={pathName} ></DashPageHeading>
            MyBikes
        </div>
    );
};

export default MyBikes;