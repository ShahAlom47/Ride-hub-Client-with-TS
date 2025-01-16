import React from 'react';
import summeryIcon from '../../../assets/icons/summery-icon.png'
import { NavLink } from 'react-router-dom';
import { BsCartCheckFill } from 'react-icons/bs';
import { RiFunctionAddFill, RiMenuAddFill, RiMotorbikeFill } from 'react-icons/ri';
import useUserData from '../../../CustomHocks/useUserData';
import { MdConnectWithoutContact, MdOutlineDirectionsBike } from 'react-icons/md';
import { AiFillProduct } from 'react-icons/ai';
import { FaUsersCog } from 'react-icons/fa';



const NavItems: React.FC = () => {
    const { userData } = useUserData();



    return (
        <nav className="flex flex-col gap-3">
            {userData && (
                <>

                    {
                        userData?.userRole === 'user' && (
                            <>
                                <NavLink
                                    key="order"
                                    to="/my-dashBoard/my-order"
                                    className={({ isActive }) =>
                                        `hover:text-color-s rounded-sm flex items-center gap-2 ${isActive ? 'text-color-s font-bold' : 'text-white'
                                        }`
                                    }
                                >
                                    <BsCartCheckFill /> My Order
                                </NavLink>

                                <NavLink
                                    key="order"
                                    to="/my-dashBoard/my-bikes"
                                    className={({ isActive }) =>
                                        `hover:text-color-s rounded-sm flex items-center gap-2 ${isActive ? 'text-color-s font-bold' : 'text-white'
                                        }`
                                    }
                                >
                                    <BsCartCheckFill /> My Bikes
                                </NavLink>
                            </>
                        )
                    }

                    {/* Admin-রোল ভিত্তিক লিংক */}
                    {userData?.userRole === 'admin' && (
                        <>
                            <NavLink
                                key="admin-panel"
                                to="/my-dashBoard/overview"
                                className={({ isActive }) =>
                                    `hover:text-color-s rounded-sm flex items-center gap-2 ${isActive ? 'text-color-s font-bold' : 'text-white'
                                    }`
                                }
                            >
                                <img className=' w-4' src={summeryIcon} alt="summeryIcon" />Overview
                            </NavLink>
                            <NavLink
                                key="admin-panel"
                                to="/my-dashBoard/orders"
                                className={({ isActive }) =>
                                    `hover:text-color-s rounded-sm flex items-center gap-2 ${isActive ? 'text-color-s font-bold' : 'text-white'
                                    }`
                                }
                            >
                                <BsCartCheckFill /> Manage Order
                            </NavLink>
                            <NavLink
                                key="admin-panel"
                                to="/my-dashBoard/manageBike"
                                className={({ isActive }) =>
                                    `hover:text-color-s rounded-sm flex items-center gap-2 ${isActive ? 'text-color-s font-bold' : 'text-white'
                                    }`
                                }
                            >
                                <MdOutlineDirectionsBike /> Manage Bike
                            </NavLink>
                            <NavLink
                                key="admin-panel"
                                to="/my-dashBoard/addBike"
                                className={({ isActive }) =>
                                    `hover:text-color-s rounded-sm flex items-center gap-2 ${isActive ? 'text-color-s font-bold' : 'text-white'
                                    }`
                                }
                            >
                                <RiMenuAddFill />Add Bike
                            </NavLink>
                            <NavLink
                                key="admin-panel"
                                to="/my-dashBoard/manageProduct"
                                className={({ isActive }) =>
                                    `hover:text-color-s rounded-sm flex items-center gap-2 ${isActive ? 'text-color-s font-bold' : 'text-white'
                                    }`
                                }
                            >
                                <AiFillProduct /> Manage Product
                            </NavLink>
                            <NavLink
                                key="admin-panel"
                                to="/my-dashBoard/addProduct"
                                className={({ isActive }) =>
                                    `hover:text-color-s rounded-sm flex items-center gap-2 ${isActive ? 'text-color-s font-bold' : 'text-white'
                                    }`
                                }
                            >
                               <RiFunctionAddFill />  Add Product
                            </NavLink>

                            <NavLink
                                key="admin-panel"
                                to="/my-dashBoard/manageUser"
                                className={({ isActive }) =>
                                    `hover:text-color-s rounded-sm flex items-center gap-2 ${isActive ? 'text-color-s font-bold' : 'text-white'
                                    }`
                                }
                            >
                               <FaUsersCog />  Manage User
                            </NavLink>
                            <NavLink
                                key="admin-panel"
                                to="/my-dashBoard/userContact"
                                className={({ isActive }) =>
                                    `hover:text-color-s rounded-sm flex items-center gap-2 ${isActive ? 'text-color-s font-bold' : 'text-white'
                                    }`
                                }
                            >
                              <MdConnectWithoutContact />   User Contact
                            </NavLink>
                        </>

                    )}


                    {userData?.userRole === 'moderator' && (
                        <>
                            <NavLink
                                key="moderator-tools"
                                to="/moderator-tools"
                                className={({ isActive }) =>
                                    `hover:text-color-s rounded-sm flex items-center gap-2 ${isActive ? 'text-color-s font-bold' : 'text-white'
                                    }`
                                }
                            >
                                <RiMotorbikeFill /> Moderator Tools
                            </NavLink>
                        </>
                    )}

                    ------------------
                    <NavLink
                        key="home"
                        to="/"
                        className={({ isActive }) =>
                            `hover:text-color-s rounded-sm flex items-center gap-2 ${isActive ? 'text-color-s font-bold' : 'text-white'
                            }`
                        }
                    >
                        <BsCartCheckFill /> Home
                    </NavLink>
                </>
            )}
        </nav>
    );
};

export default NavItems;
