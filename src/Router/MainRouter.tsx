

import {
  createBrowserRouter,
} from "react-router-dom";
import Root from "../LayOut/Root/Root";
import Home from "../Pages/Home/Home";
import OurService from "../Pages/OurService/OurService";
import OurBikes from "../Pages/OurBikes/OurBikes";
import BikeDetails from "../Pages/OurBikes/BikeDetails/BikeDetails";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
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
      path: "/bike-details/:model",
      element: <BikeDetails></BikeDetails>
     },
     {
      path: "/our-service",
      element: <OurService></OurService>
     },
    ]
  },
]);

export default router;