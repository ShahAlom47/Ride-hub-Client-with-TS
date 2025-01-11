import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../CustomHocks/useAxiosSecure";
import DashPageHeading from "../../../../SharedComponent/DashPageHeading/DashPageHeading";

const path: string[] = ['/my-dashBoard', '/my-dashBoard/manageUser'];
const pathName: string[] = ['DashBoard', 'Manage User'];

const ManageUser = () => {
    const axiosSecure = useAxiosSecure()


const {data}= useQuery({
    queryKey:['manage User'],
    queryFn: async ()=>{
        const res = await axiosSecure.get(`/userData/getAllUser`)
        return res.data 
    }
})

console.log(data);

    return (
        <div>
          <DashPageHeading title="Manage User" path={path} pathName={pathName}></DashPageHeading>
            
        </div>
    );
};

export default ManageUser;