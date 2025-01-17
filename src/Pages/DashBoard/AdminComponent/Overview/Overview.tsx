import { FaUsers } from "react-icons/fa";
import DashPageHeading from "../../../../SharedComponent/DashPageHeading/DashPageHeading";
import { MdArrowOutward } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { RiMotorbikeFill } from "react-icons/ri";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { FaRegMoneyBill1 } from "react-icons/fa6";


const path: string[] = ['/my-dashBoard', '/my-dashBoard/overview'];
const pathName: string[] = ['DashBoard', 'Overview'];

const visitorChatData = [
    { name: "Shop", value: 400 },
    { name: "Bike", value: 300 },
];
const totalRevenueData = [
    { month: "Jan", Shop: 4000, Bike: 2400 },
    { month: "Feb", Shop: 3000, Bike: 1398 },
    { month: "Mar", Shop: 2000, Bike: 2800 },
    { month: "Apr", Shop: 2780, Bike: 3908 },
    { month: "May", Shop: 1890, Bike: 4800 },
    { month: "Jun", Shop: 2390, Bike: 3800 },
];

const COLORS = ["#5342f4", "#c7c1fa"];
const Overview = () => {
    return (
        <div>
            <DashPageHeading title="Overview" path={path} pathName={pathName}></DashPageHeading>
            <div id="overview-container " className=" py-4">

                <div className=" grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 ">

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

                <div className="grid grid-cols-2  gap-5  mt-5 ">

                    <div className="  flex flex-col ">
                        <div className=" grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5  ">


                            <div className="p-5 rounded-md bg-stone-950 shadow-[inset_0_0_20px_10px_rgba(255,255,255,0.2)] ">
                                <h1 className="flex items-center gap-3 font-bold "><AiFillProduct className=" p-1 text-2xl bg-gray-800 rounded-sm" /> Shop Revenue</h1>
                                <p className="text-2xl font-bold mt-4 text-white ml-1">$3446.67</p>
                                <p className="flex items-center gap-2 mt-1"><MdArrowOutward className=" text-green-800" />This Month</p>

                            </div>

                            <div className="p-5 rounded-md bg-stone-950 shadow-[inset_0_0_20px_10px_rgba(255,255,255,0.2)] ">
                                <h1 className="flex items-center gap-3 font-bold "><RiMotorbikeFill className=" p-1 text-2xl bg-gray-800 rounded-sm" /> Bike Revenue</h1>
                                <p className="text-2xl font-bold mt-4 text-white ml-1">$2446.67</p>
                                <p className="flex items-center gap-2 mt-1"><MdArrowOutward className=" text-green-800" />This Month</p>

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
                        <h1 className="flex items-center gap-3 font-bold "><FaRegMoneyBill1 className=" p-1 text-2xl bg-gray-800 rounded-sm" /> Total Revenue</h1>
                        <p className="text-3xl font-bold mt-4 text-white ml-1">$2446.67</p>

                        <div className="flex justify-center items-center mt-5 ">
                            <BarChart
                                width={400}
                                height={300}
                                data={totalRevenueData}
                                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="2 2" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Shop" fill="#5342f4" />
                                <Bar dataKey="Bike" fill="#c7c1fa" />
                            </BarChart>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
};

export default Overview;