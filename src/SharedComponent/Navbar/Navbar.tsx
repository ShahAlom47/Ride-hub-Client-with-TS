import { Link, NavLink, } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "./Logo";
import useUser from "../../CustomHocks/useUser";
import img from '../../assets/png/user-pp.png'
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import useHandelWishList from "../../CustomHocks/useHandelWishList";

interface DrawerProps {
    drawerContent: string | boolean;
    setDrawerContent: React.Dispatch<React.SetStateAction<string | boolean>>
    setNavbarPosition: React.Dispatch<React.SetStateAction<boolean>>
}


const Navbar = ({ drawerContent, setDrawerContent, setNavbarPosition }: DrawerProps) => {
    const { user, logOutUser } = useUser();

    const [visible, setVisible] = useState(true);
    const { getBikeWishList, getShopWishList } = useHandelWishList();
    const totalWishListItem: number = getBikeWishList().length + getShopWishList().length

    console.log(getBikeWishList().length, getShopWishList().length)

    useEffect(() => {
        let prevSPos = window.pageYOffset;

        const handleScroll = () => {
            const currentSPos = window.pageYOffset;
            const isVisible = prevSPos > currentSPos;
            setVisible(isVisible);
            setNavbarPosition(isVisible);
            prevSPos = currentSPos;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [visible]);

    const handelDrawer = (value: string): void => {
        if (drawerContent === value) {
            setDrawerContent(false);
            return
        }
        setDrawerContent(value);
    }


    const drawerNav: React.ReactNode = (
        <div className=" flex items-center   ">
            <button
                onClick={() => handelDrawer('wishList')}
                className={` relative  group hover:text-color-s text-2xl px-3 rounded-sm ${drawerContent === 'wishList' ? 'text-color-s' : ''} `}
            >  <FaHeart></FaHeart>
                <p className=" -top-2 - right-1 p-1  text-[8px] group-hover:bg-white group-hover:text-black bg-color-s bg-opacity-75 rounded-full absolute h-4 w-4 flex items-center justify-center transition-all ease-in-out duration-300">
                    {totalWishListItem > 99 ? '99' : totalWishListItem}
                    </p>
            </button>
            {
                user ? <button
                    onClick={() => handelDrawer('cartList')}
                    className={` hover:text-color-s text-2xl px-3 rounded-sm  ${drawerContent === 'cartList' ? 'text-color-s' : ''}`}
                >  <FaShoppingCart></FaShoppingCart></button> : ''
            }

        </div>
    )

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
        <div className={` ${visible ? 'top-0' : '-top-16'} transition-all duration-500 ease-in-out   navbar bg-black  sticky z-50 text-gray-300 `}>
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

            <div className="navbar-center hidden lg:flex   ">
                <ul className="menu menu-horizontal px-1  uppercase  ">
                    {
                        nav.map((item, idx) => <li key={idx}>{item}</li>)
                    }
                </ul>

            </div>

            <div className="navbar-end pr-5" >

                {
                    drawerNav
                }

                {
                    user ?
                        <div className=' flex items-center justify-end gap-4'>
                            <div className='pt-2'>

                            </div>
                            <div className="dropdown dropdown-end p-0 m-0">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar p-0 m-0">
                                    <div className="w-8 rounded-full flex justify-center items-center border text-center">
                                        <img alt="profile phot" src={user.photoURL ? user.photoURL : img} />
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
