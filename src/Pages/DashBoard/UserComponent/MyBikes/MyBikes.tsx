import { useQuery } from "@tanstack/react-query";
import DashPageHeading from "../../../../SharedComponent/DashPageHeading/DashPageHeading";
import useUser from "../../../../CustomHocks/useUser";
import useAxiosSecure from "../../../../CustomHocks/useAxiosSecure";
import { BikeData } from "../../../OurBikes/BikeDataInterFace/bikeDataIterFace";

interface ResType {
    data: BikeData[]
}

const path: string[] = ['/my-dashBoard', '/my- bikes'];
const pathName: string[] = ['DashBoard', 'My Bikes'];
const MyBikes = () => {
    const { user } = useUser()
    const axiosSecure = useAxiosSecure()

    const { data: bikes } = useQuery({
        queryKey: ['my-bike-data', user?.email || ''],
        queryFn: async (): Promise<ResType> => {
          const res = await axiosSecure.get<ResType>(`/bikeData/getMyRentedBike/${user?.email}`);
          return res.data;
        },
        enabled: !!user?.email, // Ensures the query runs only if email exists
      });

      console.log(bikes);

    return (
        <div>
            <DashPageHeading title="My Bikes" path={path} pathName={pathName} ></DashPageHeading>

            <div className="">


            </div>
        </div>
    );
};

export default MyBikes;