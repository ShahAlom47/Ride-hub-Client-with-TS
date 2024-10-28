import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsCartCheckFill } from 'react-icons/bs';
import { RiMotorbikeFill } from 'react-icons/ri';
import useUserData from '../../../CustomHocks/useUserData';



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
                                    to="/my-dashBoard"
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
                                to="/my-dashBoard"
                                className={({ isActive }) =>
                                    `hover:text-color-s rounded-sm flex items-center gap-2 ${isActive ? 'text-color-s font-bold' : 'text-white'
                                    }`
                                }
                            >
                                <BsCartCheckFill /> Admin Panel
                            </NavLink>
                        </>

                    )}

                    {/* Moderator-রোল ভিত্তিক লিংক */}
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
