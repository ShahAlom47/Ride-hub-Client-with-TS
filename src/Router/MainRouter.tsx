

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
import ManageBike from "../Pages/DashBoard/AdminComponent/ManageBike/ManageBike";
import EditBikeData from "../Pages/DashBoard/AdminComponent/ManageBike/EditBikeData/EditBikeData";
import AddBike from "../Pages/DashBoard/AdminComponent/ManageBike/AddBike/AddBike";
import ManageProduct from "../Pages/DashBoard/AdminComponent/ManageProduct/ManageProduct";
import EditProduct from "../Pages/DashBoard/AdminComponent/ManageProduct/EditProduct/EditProduct";
import AddProduct from "../Pages/DashBoard/AdminComponent/AddProduct/AddProduct";
import Settings from "../Pages/Settings/Settings";
import ManageUser from "../Pages/DashBoard/AdminComponent/ManageUser/ManageUser";
import UserContact from "../Pages/DashBoard/AdminComponent/UserContact/UserContact";



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

      {
        path: "/settings",
        element: <PrivetRoute> <Settings></Settings> </PrivetRoute>
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
        element: <AdminRoute> <Orders></Orders> </AdminRoute>
      },
      {
        path: "/my-dashBoard/manageBike",
        element: <AdminRoute> <ManageBike></ManageBike> </AdminRoute>
      },
      {
        path: "/my-dashBoard/addBike",
        element: <AdminRoute><AddBike></AddBike> </AdminRoute>
      },
      {
        path: `/my-dashBoard/editBike/:id`,
        element: <AdminRoute> <EditBikeData></EditBikeData> </AdminRoute>
      },
      {
        path: `/my-dashBoard/manageProduct`,
        element: <AdminRoute> <ManageProduct></ManageProduct> </AdminRoute>
      },
      {
        path: `/my-dashBoard/manageProduct/editProduct/:id`,
        element: <AdminRoute> <EditProduct></EditProduct> </AdminRoute>
      },
      {
        path: `/my-dashBoard/addProduct`,
        element: <AdminRoute> <AddProduct></AddProduct> </AdminRoute>
      },
      {
        path: `/my-dashBoard/manageUser`,
        element: <AdminRoute> <ManageUser></ManageUser> </AdminRoute>
      },
      {
        path: `/my-dashBoard/userContact`,
        element: <AdminRoute> <UserContact></UserContact> </AdminRoute>
      },


    ]
  }


]);

export default router;