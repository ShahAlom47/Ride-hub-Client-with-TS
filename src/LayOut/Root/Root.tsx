import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../../SharedComponent/Loading/Loading";
import Navbar from "../../SharedComponent/Navbar/Navbar";
import Footer from "../../SharedComponent/Footer/Footer";
import usePageLoading from "../../CustomHocks/usePageLoading";
import WishList from "../../Pages/DrawerComponent/WishList/WishList";
import CartList from "../../Pages/DrawerComponent/CartList/CartList"
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import useUser from "../../CustomHocks/useUser";



const Root = () => {
  const {user}=useUser()
  const [loading, setLoading] = useState(true);
  const [drawerContent, setDrawerContent] = useState<boolean | string>(false)
  const [drawerLoading, setDrawerLoading] = useState<boolean>(false)
  const [navbarPosition,setNavbarPosition]=useState<boolean>(false)

  const { pageLoading } = usePageLoading()

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
    };

    loadData();
  }, []);


  useEffect(() => {
    setDrawerLoading(true)
    setTimeout(() => {
      setDrawerLoading(false)
    }, 1000);

  }, [drawerContent]);



  return (
    loading ? <Loading></Loading> :
      <div className={` relative `}>
        <div className={` drawer transition-all ease-in-out duration-500 flex flex-col   fixed  ${navbarPosition?'h-[90vh]':'h-[100vh]'} -right-1  bg-color-p  z-50   border-color-s border-l border-b ${navbarPosition?'top-[65px]':'top-0'}  ${drawerContent !== false ? 'lg:w-[40vw] md:w-[50vw] right-0 ' : 'w-0 -right-30'}`}>
          <button onClick={() => setDrawerContent(false)} className=" hover:bg-red-800 group text-white bg-color-s h-16 rounded-r-xl absolute left-0 top-1/2  text-xl"><MdOutlineKeyboardArrowRight /></button>
          <h1 className=" w-full  text-xl font-bold font-pFont text-center  bg-color-s text-white p-2 ">{drawerContent==='wishList'?'Wish List':'Cart List'}</h1>
          {
            drawerLoading ? <div className={` ${drawerContent !== false ? '' : 'hidden'}`}><Loading></Loading></div> :
              <div className={` w-full px-4  h-[90%]  `}>
                {drawerContent === 'wishList' ? <WishList></WishList> : ''}
                {drawerContent === 'cartList' && user ? <CartList></CartList> : ''}
              </div>
          }
        </div>

        <Navbar drawerContent={drawerContent} setDrawerContent={setDrawerContent} setNavbarPosition={setNavbarPosition} ></Navbar>
        {
          pageLoading ? <div  className=" min-h-screen flex justify-center items-center"> <Loading></Loading></div> : <div onClick={():void =>setDrawerContent(false)}> <Outlet  ></Outlet> </div>
        }
        <Footer></Footer>

      </div>
  );
};

export default Root;