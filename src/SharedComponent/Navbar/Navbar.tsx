import { Link, NavLink, } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "./Logo";
import useUser from "../../CustomHocks/useUser";
import img from '../../assets/png/user-pp.png'



const Navbar: React.FC = () => {
    const { user, logOutUser } = useUser();
    
    const [visible, setVisible] = useState(true);



    useEffect(() => {
        let prevSPos = window.pageYOffset;

        const handleScroll = () => {
            const currentSPos = window.pageYOffset;
            const isVisible = prevSPos > currentSPos;
            setVisible(isVisible);
            prevSPos = currentSPos;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [ visible ]);




    const nav: React.ReactNode[] = [
        <NavLink
            key="home" to="/"
            className={({ isActive }) => ` hover:text-color-s px-3 rounded-sm ${isActive ? 'text-color-s font-bold ' : ''}`}
        > Home </NavLink>,
        <NavLink key="our-bikes" to="/our-bikes"
            className={({ isActive }) => `   hover:text-color-s px-3 rounded-sm ${isActive ? 'text-color-s font-bold' : ''}`}
        >Our Bikes</NavLink>,
        <NavLink key="our-service" to="/our-service"
            className={({ isActive }) => `  hover:text-color-s px-3 rounded-sm ${isActive ? 'text-color-s font-bold' : ''}`}
        >Our Service</NavLink>,
        <NavLink key="our-service" to="/shop"
            className={({ isActive }) => `  hover:text-color-s px-3 rounded-sm ${isActive ? 'text-color-s font-bold' : ''}`}
        >Shop</NavLink>,
        <NavLink key="about-us" to="/about-us"
            className={({ isActive }) => `  hover:text-color-s px-3 rounded-sm ${isActive ? 'text-color-s font-bold' : ''}`}
        >About Us</NavLink>
    ];

    return (
        <div className={` ${visible? 'top-0':'-top-16'} transition-all duration-500 ease-in-out   navbar bg-black  sticky z-50 text-gray-300 `}>
            <div className="navbar-start">
                <div className="dropdown flex justify-between">
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
            <div className="navbar-end pr-5" >


                {
                    user ?
                        <div className=' flex items-center justify-end gap-4'>
                            <div className='pt-2'>

                            </div>
                            <div className="dropdown dropdown-end p-0 m-0">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar p-0 m-0">
                                    <div className="w-8 rounded-full flex justify-center items-center border text-center">
                                            <img alt="profile phot" src={user.photoURL?user.photoURL:img} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="-mt-1 z-[1] text-white p-2 shadow menu menu-sm dropdown-content bg-color-p rounded-sm w-32">
                                    <li className='border-b-2 pl-2  uppercase' >{user?.displayName} </li>
                                    <li><a onClick={() => logOutUser()}>Logout</a></li>

                                </ul>
                            </div>

                        </div>

                        :
                        <Link to={'/login'} className="btn btn-sm rounded-sm bg-opacity-70">Login</Link>
                }



            </div>
        </div>
    );
};

export default Navbar;
