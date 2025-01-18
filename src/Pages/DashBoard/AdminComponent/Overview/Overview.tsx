import { FaUsers } from "react-icons/fa";
import DashPageHeading from "../../../../SharedComponent/DashPageHeading/DashPageHeading";
import { MdArrowOutward } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { RiMotorbikeFill } from "react-icons/ri";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../CustomHocks/useAxiosSecure";

interface AmountResType {
    monthlyData: {
        month: string;
        Shop: number;
        Bike: number;
        totalMonthAmount: number;
    }[];
    totalShopAmount: number;
    totalBikeAmount: number;
    totalAmount: number;
}


const path: string[] = ['/my-dashBoard', '/my-dashBoard/overview'];
const pathName: string[] = ['DashBoard', 'Overview'];

const visitorChatData = [
    { name: "Shop", value: 400 },
    { name: "Bike", value: 300 },
];


const COLORS = ["#5342f4", "#c8df1c"];
const Overview = () => {

    const axiosSecure = useAxiosSecure()

    const { data:amountSummery } = useQuery({
        queryKey: ['getSummery'],
        queryFn: async () => {
            const res = await axiosSecure.get<AmountResType>(`/payment/getSummery`)
            return res?.data
        }
    })


    console.log(amountSummery);



    return (
        <div>
            <DashPageHeading title="Overview" path={path} pathName={pathName}></DashPageHeading>
            <div id="overview-container " className=" py-4">

                <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-5  gap-3 ">

                    <div className="p-5 rounded-md bg-stone-950 shadow-[inset_0_0_20px_10px_rgba(255,255,255,0.2)] ">
                        <h1 className="flex items-center gap-3 font-bold "><FaUsers className=" p-1 text-2xl bg-gray-800 rounded-sm" /> Total Visitor</h1>
                        <p className="text-2xl font-bold mt-4 text-white ml-1">5446.67</p>
                        <p className="flex items-center gap-2 mt-1"><MdArrowOutward className=" text-green-800" />This Month</p>

                    </div>

                    <div className="p-5 rounded-md bg-stone-950 shadow-[inset_0_0_20px_10px_rgba(255,255,255,0.2)] ">
                        <h1 className="flex items-center gap-3 font-bold "><AiFillProduct className=" p-1 text-2xl bg-gray-800 rounded-sm" /> Shop Visitor</h1>
                        <p className="text-2xl font-bold mt-4 text-white ml-1">5446.67</p>
                        <p className="flex items-center gap-2 mt-1"><MdArrowOutward className=" text-green-800" />This Month</p>

                    </div>

                    <div className="p-5 rounded-md bg-stone-950 shadow-[inset_0_0_20px_10px_rgba(255,255,255,0.2)] ">
                        <h1 className="flex items-center gap-3 font-bold "><RiMotorbikeFill className=" p-1 text-2xl bg-gray-800 rounded-sm" /> Bike Visitor</h1>
                        <p className="text-2xl font-bold mt-4 text-white ml-1">5446.67</p>
                        <p className="flex items-center gap-2 mt-1"><MdArrowOutward className=" text-green-800" />This Month</p>

                    </div>


                    <div className="p-5 rounded-md bg-stone-950 shadow-[inset_0_0_20px_10px_rgba(255,255,255,0.2)] flex justify-center items-center ">
                        <PieChart width={150} height={100} className=" flex justify-center">
                            <Pie
                                data={visitorChatData}
                                cx="50%"
                                cy="50%"
                                innerRadius={20}
                                outerRadius={30}
                                // fill="#8884d8"
                                paddingAngle={8}
                                dataKey="value"
                                stroke="none"
                            >
                                {visitorChatData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>


                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1  lg:gap-5  gap-3  mt-5 ">

                    <div className="  flex flex-col ">
                        <div className=" grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-5  gap-3  ">


                            <div className="p-5 rounded-md bg-stone-950 shadow-[inset_0_0_20px_10px_rgba(255,255,255,0.2)] ">
                                <h1 className="flex items-center gap-3 font-bold "><AiFillProduct className=" p-1 text-2xl bg-gray-800 rounded-sm" /> Shop Revenue</h1>
                                <p className="text-2xl font-bold mt-4 text-white ml-1">Tk {amountSummery?.totalShopAmount || 0}</p>
                                <p className="flex items-center gap-2 mt-1"><MdArrowOutward className=" text-green-800" />total</p>

                            </div>

                            <div className="p-5 rounded-md bg-stone-950 shadow-[inset_0_0_20px_10px_rgba(255,255,255,0.2)] ">
                                <h1 className="flex items-center gap-3 font-bold "><RiMotorbikeFill className=" p-1 text-2xl bg-gray-800 rounded-sm" /> Bike Revenue</h1>
                                <p className="text-2xl font-bold mt-4 text-white ml-1"> Tk {amountSummery?.totalBikeAmount || 0}</p>
                                <p className="flex items-center gap-2 mt-1"><MdArrowOutward className=" text-green-800" />Total</p>

                            </div>

                        </div>

                        <div className="p-5 mt-5  flex-1 rounded-md bg-stone-950 shadow-[inset_0_0_20px_10px_rgba(255,255,255,0.2)] flex justify-center items-center  ">
                            <PieChart width={150} height={150} className=" flex justify-center">
                                <Pie
                                    data={visitorChatData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={30}
                                    outerRadius={40}
                                    // fill="#8884d8"
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {visitorChatData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>

                    </div>

                    <div className="p-5 rounded-md bg-stone-950 shadow-[inset_0_0_20px_10px_rgba(255,255,255,0.2)] ">
                        <h1 className="flex items-center gap-3 font-bold "><FaRegMoneyBill1 className=" p-1 text-2xl bg-gray-800 rounded-sm" /> Total Revenue <span className=" text-sm font-normal text-green-500">(last 6 Month)</span></h1>
                        <p className="text-3xl font-bold mt-4 text-white ml-1">Tk {amountSummery?.totalAmount || 0}</p>

                        <div className="flex justify-center items-center mt-5 ">
                            <BarChart
                                width={400}
                                height={300}
                                data={amountSummery?.monthlyData}
                                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                                
                            >
                                <CartesianGrid strokeDasharray="2 2" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Shop" fill="#5342f4" />
                                <Bar dataKey="Bike" fill="#a3a601" />
                            </BarChart>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default Overview;