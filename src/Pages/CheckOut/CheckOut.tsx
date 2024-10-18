import { useLocation } from "react-router-dom";
import PageHeading from "../../SharedComponent/PageHeading/PageHeading";
import headingImg from '../../assets/Banner-Img/bike-page-banner.jpg';


const path: string[] = ['/', '/checkout'];
const pathName: string[] = ['Home', 'CheckOut'];

const CheckOut = () => {
    const location = useLocation();
    console.log(location.state)
    return (
        <div className="bg-color-p">
            <PageHeading img={headingImg} title="CHECK OUT" path={path} pathName={pathName} />
            <div className="grid  gap-4 lg;grid-cols-12 md:grid-cols-12 grid-cols-1 max-w min-h-10 p-6">
                <div className=" lg:col-span-8 md:col-span-7  ">

                </div>
                <div className=" lg:col-span-4 md:col-span-5 ">

                </div>

            </div>
        </div>
    );
};

export default CheckOut;