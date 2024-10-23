import { RiLogoutCircleRLine } from "react-icons/ri";
import Logo from "../../SharedComponent/Navbar/Logo";
import useUser from "../../CustomHocks/useUser";


const DashBoard = () => {
    const { logOutUser } = useUser();
    return (

        <div className=" grid p-4 lg:grid-cols-12 md:grid-cols-12 grid-cols-1  w-full  bg-color-p ">
            <div className="lg:col-span-3 md:col-span-4 bg-color-op h-screen flex flex-col">

                <div className="p-2 ">
                    <Logo></Logo>
                </div>


                <div className="flex-grow p-4 bg-color-p m-1">

                </div>


                <div className="p-4 ">
                    <a onClick={() => logOutUser()} className=" flex items-center gap-2 group cursor-pointer text-white hover:text-gray-400 w-32" ><RiLogoutCircleRLine className="group-hover:text-color-s" /> Logout</a>
                </div>
            </div>
            <div className="lg:col-span-9 md:col-span-8 bg-color-p border-2 border-color-op">

            </div>

        </div>


    );
};

export default DashBoard;