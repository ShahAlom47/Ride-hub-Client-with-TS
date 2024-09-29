import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../../SharedComponent/Loading/Loading";
import Navbar from "../../SharedComponent/Navbar/Navbar";
import Footer from "../../SharedComponent/Footer/Footer";
import usePageLoading from "../../CustomHocks/usePageLoading";



const Root = () => {
  const [loading, setLoading] = useState(true);

  const { pageLoading } = usePageLoading()

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    loading ? <Loading></Loading> :
      <div className=" ">
       
        <Navbar></Navbar>
        {
          pageLoading ?<div className=" min-h-screen flex justify-center items-center"> <Loading></Loading></div> : <Outlet ></Outlet>
        }
        <Footer></Footer>

      </div>
  );
};

export default Root;