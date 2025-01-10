import { useQuery } from "@tanstack/react-query";
import DashPageHeading from "../../../../SharedComponent/DashPageHeading/DashPageHeading";
import useUser from "../../../../CustomHocks/useUser";
import useAxiosSecure from "../../../../CustomHocks/useAxiosSecure";
import { BikeData } from "../../../OurBikes/BikeDataInterFace/bikeDataIterFace";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';


interface RentalDetails {
    rent_start_date: string; // ISO format date
    rent_end_date: string; // ISO format date
    renterUser: string;
}

interface Bike {
    bikeId: string;
    bikeImage: string;
    brand: string;
    model: string;
    rentalDetails?: RentalDetails; // Optional as it's not present in all items
    rental_price_per_day: number;
}



const path: string[] = ['/my-dashBoard', '/my- bikes'];
const pathName: string[] = ['DashBoard', 'My Bikes'];
const MyBikes = () => {
    const { user } = useUser()
    const axiosSecure = useAxiosSecure()

    const { data: bikes } = useQuery({
        queryKey: ['my-bike-data', user?.email || ''],
        queryFn: async (): Promise<Bike[]> => {
            const res = await axiosSecure.get<Bike[]>(`/bikeData/getMyRentedBike/${user?.email}`);
            return res.data; // Assuming the API returns an array of bikes
        },
        enabled: !!user?.email,
    });
    console.log(bikes);

    return (
        <div>
            <DashPageHeading title="My Bikes" path={path} pathName={pathName} ></DashPageHeading>

            <div className="">
                <Table className=" my-5  resTable">
                    <Thead className=" my-6 py-2 bg-color-op ">
                        <Tr className="  " >

                            <Th className="text-start p-3 ">Bike Photo</Th>
                            <Th className="text-start p-3 ">Brand</Th>
                            <Th className="text-start p-3">Model</Th>
                            <Th className="text-start p-3">Price Per Day</Th>
                            <Th className="text-start p-3">Renter Email</Th>
                            <Th className="text-start p-3">Start Date</Th>
                            <Th className="text-start p-3">End Date </Th>
                        </Tr>
                    </Thead>
                    <Tbody className=" py-2  my-6 text-xl ">
                        {bikes?.map((bike:Bike) => (
                            <Tr key={bike.bikeId} className="my-2 pb-2" >
                                <Td className=" p-3 py-1 "><img className="" src={bike?.bikeImage} alt="bike Photo" /></Td>
                                <Td className=" p-3 py-1">{bike?.brand}</Td>
                                <Td className=" p-3 py-1">{bike?.model}</Td>
                                <Td className=" p-3 py-1">{bike?.rental_price_per_day}</Td>
                                <Td className=" p-3 py-1">{bike?.rentalDetails?.renterUser}</Td>
                                <Td className=" p-3 py-1">{new Date(bike?.rentalDetails?.rent_start_date||'').toLocaleDateString()}</Td>
                                <Td className=" p-3 py-1">{new Date(bike?.rentalDetails?.rent_end_date ||'').toLocaleDateString()}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>


            </div>
        </div>
    );
};

export default MyBikes;