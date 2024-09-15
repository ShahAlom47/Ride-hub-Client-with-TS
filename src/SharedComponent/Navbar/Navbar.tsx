import {  NavLink, } from "react-router-dom";
import React  from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "./Logo";



const Navbar: React.FC = () => {



    const nav: React.ReactNode[] = [
        <NavLink
         key="home" to="/"
            className={({ isActive }) => `nav-link hover:bg-transparent bg-transparent hover:text-color-s px-3 rounded-sm ${isActive ? 'text-color-s font-bold' : 'bg-transparent'}`}
        > Home </NavLink>,
        <NavLink key="our-bikes" to="/our-bikes"
            className={({ isActive }) => ` hover:bg-transparent bg-transparent  hover:text-color-s px-3 rounded-sm ${isActive ? 'text-color-s font-bold' : ''}`}
        >Our Bikes</NavLink>,
        <NavLink key="our-service" to="/our-service"
            className={({ isActive }) => ` hover:bg-transparent bg-transparent  hover:text-color-s px-3 rounded-sm ${isActive ? 'text-color-s font-bold' : ''}`}
        >Our Service</NavLink>,
        <NavLink key="about-us" to="/about-us"
            className={({ isActive }) => ` hover:bg-transparent bg-transparent  hover:text-color-s px-3 rounded-sm ${isActive ? 'text-color-s font-bold' : ''}`}
        >About Us</NavLink>
    ];

    return (
        <div className="navbar bg-color-p absolute top-0 z-50 text-gray-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <GiHamburgerMenu />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <ul className="menu menu-horizontal px-1 flex flex-col bg-white uppercase">
                            {
                                nav.map((item, idx) => <li key={idx}>{item}</li>)
                            }
                        </ul>
                    </ul>
                </div>
                <Logo></Logo>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1  uppercase  ">
                    {
                        nav.map((item, idx) => <li key={idx}>{item}</li>)
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn btn-sm rounded-sm bg-opacity-70">Login</a>
            </div>
        </div>
    );
};

export default Navbar;
