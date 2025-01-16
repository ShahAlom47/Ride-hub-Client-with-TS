import DashPageHeading from "../../../../SharedComponent/DashPageHeading/DashPageHeading";



const path: string[] = ['/my-dashBoard', '/my-userContact/'];
const pathName: string[] = ['DashBoard', 'User Contact'];



const UserContact = () => {
    return (
        <div>
              <DashPageHeading title="User Contact" path={path} pathName={pathName}></DashPageHeading>
            
        </div>
    );
};

export default UserContact;