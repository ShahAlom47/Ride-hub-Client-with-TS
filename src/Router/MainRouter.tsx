

import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../LayOut/Root/Root";
import Home from "../Pages/Home/Home";
import OurService from "../Pages/OurService/OurService";
import OurBikes from "../Pages/OurBikes/OurBikes";
import BikeDetails from "../Pages/OurBikes/BikeDetails/BikeDetails";
import ErrorPage from "../SharedComponent/ErrorPage/ErrorPage";
import Register from "../Pages/Authentication/Register/Register";
import Login from "../Pages/Authentication/Login/Login";
import Shop from "../Pages/Shop/Shop";
import AboutUs from "../Pages/AboutUs/AboutUs";
import CheckOut from "../Pages/CheckOut/CheckOut";
import PrivetRoute from "./PrivetRoute";
import DashBoardRoot from "../LayOut/DashBoardRoot/DashBoardRoot";
import MyOrder from "../Pages/DashBoard/UserComponent/MyOrder/MyOrder";
import AdminRoute from "./AdminRoute";
import MyBikes from "../Pages/DashBoard/UserComponent/MyBikes/MyBikes";
import Orders from "../Pages/DashBoard/AdminComponent/Orders/Orders";
import RentNow from "../Pages/OurBikes/RentNow/RentNow";
import RentPayment from "../Pages/OurBikes/RentNow/RentPayment/RentPayment";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage />,
    children: [
     {
      path: "/",
      element: <Home></Home>
     },
     {
      path: "/our-bikes",
      element: <OurBikes></OurBikes>
     },
     {
      path: "/bike-details/:id",
      element: <BikeDetails></BikeDetails>
     },
     {
      path: "/shop",
      element: <Shop></Shop>
     },
     {
      path: "/our-service",
      element: <OurService></OurService>
     },
     {
      path: "/about-us",
      element: <AboutUs></AboutUs>
     },
     {
      path: "/login",
      element: <Login></Login>
     },
     {
      path: "/register",
      element: <Register></Register>
     },

    //  privet Route

     {
      path: "/checkout",
      element: <PrivetRoute> <CheckOut></CheckOut> </PrivetRoute>
     },
     {
      path: "/rentNow/:id",
      element: <PrivetRoute> <RentNow></RentNow> </PrivetRoute>
     },
    
     {
      path: "/rent-payment",
      element: <PrivetRoute> <RentPayment></RentPayment> </PrivetRoute>
     },
    
     
    ]
  },

  {
    path: "/my-dashBoard",
    element: <PrivetRoute> <DashBoardRoot></DashBoardRoot> </PrivetRoute>,
    errorElement: <ErrorPage />,
    children: [


      {
        path: "/my-dashBoard/my-order",
        element: <PrivetRoute> <MyOrder></MyOrder> </PrivetRoute>
       },
      {
        path: "/my-dashBoard/my-bikes",
        element: <PrivetRoute> <MyBikes></MyBikes> </PrivetRoute>
       },

      {
        path: "/my-dashBoard/orders",
        element:<AdminRoute> <Orders></Orders> </AdminRoute>
       },


    ]
  }


]);

export default router;