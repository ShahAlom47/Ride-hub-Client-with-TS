import DashPageHeading from "../../../../SharedComponent/DashPageHeading/DashPageHeading";


const path: string[] = ['/my-dashBoard', '/my-dashBoard/overview'];
const pathName: string[] = ['DashBoard', 'Overview'];


const Overview = () => {
    return (
        <div>
              <DashPageHeading title="Overview" path={path} pathName={pathName}></DashPageHeading>
            
        </div>
    );
};

export default Overview;