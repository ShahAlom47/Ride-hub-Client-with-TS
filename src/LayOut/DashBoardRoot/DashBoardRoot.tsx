import { RiLogoutCircleRLine } from "react-icons/ri";
import Logo from "../../SharedComponent/Navbar/Logo";
import useUser from "../../CustomHocks/useUser";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import NavItems from "./NavItem/NavItem";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const DashBoardRoot = () => {

    const { logOutUser } = useUser();
    const [isOpen, setOpen] = useState<boolean>(false)
   

    

    return (

        <div className=" relative grid  lg:grid-cols-12  md:grid-cols-12  grid-cols-1 w-full  bg-color-p ">
            <Helmet>
                <title> Dashboard|| Ride Hub</title>
            </Helmet>

            {/* for big screen */}

            
            <div className={`  bg-color-op min-h-screen lg:col-span-3 md:col-span-2  flex-col  lg:flex md:flex hidden    transition-all ease-in-out duration-500 overflow-hidden `}>
                <div className="p-2 flex gap-2 items-end  ">
                    <button onClick={() => setOpen(!isOpen)} className="mb-1 lg:hidden md:hidden flex"> <GiHamburgerMenu /> </button>
                    <Logo></Logo>
                </div>
                <div className="flex-grow lg:p-4 md:p-2 p-2 bg-color-p m-1 flex flex-col text-white list-none">
                    <NavItems></NavItems>

                </div>

                <div className="p-4 ">
                    <a onClick={() => logOutUser()} className=" flex items-center gap-2 group cursor-pointer text-white hover:text-gray-400 w-32" ><RiLogoutCircleRLine className="group-hover:text-color-s" /> Logout</a>
                </div>
            </div>


            {/* for mobile Screen  */}


            <div className={`  absolute ${isOpen ? 'w-6/12 left-0' : 'w-0  -left-52'} bg-color-op h-screen lg:col-span-3 md:col-span-3  flex-col  lg:hidden md:hidden flex   transition-all ease-in-out duration-500 overflow-hidden z-50 `}>
                <div className="p-2 flex gap-2 items-end  ">
                    <button onClick={() => setOpen(!isOpen)} className="mb-1"> <GiHamburgerMenu  className=" text-3xl"/> </button>
                    <Logo></Logo>
                </div>

                <div className="flex-grow p-4 bg-color-p m-1 flex flex-col text-white list-none">
                <NavItems></NavItems>
                </div>

                <div className="p-4 ">
                    <a onClick={() => logOutUser()} className=" flex items-center gap-2 group cursor-pointer text-white hover:text-gray-400 w-32" ><RiLogoutCircleRLine className="group-hover:text-color-s" /> Logout</a>
                </div>
            </div>


            <div className="lg:col-span-9 md:col-span-10 col-span-full  bg-color-p border-2 border-color-op min-h-screen">

                <div className="p-2 lg:hidden md:hidden flex gap-2 items-end  bg-color-op ">
                    <button onClick={() => setOpen(!isOpen)} className="mb-1"> <GiHamburgerMenu /> </button>
                    <Logo></Logo>
                </div>
                <div className=" w-full p-4 ">
                    <Outlet></Outlet>

                </div>


            </div>

        </div>


    );
};

export default DashBoardRoot;