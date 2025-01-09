import { Helmet } from "react-helmet-async";
import PageHeading from "../../SharedComponent/PageHeading/PageHeading"
import headingImg from '../../assets/Banner-Img/bike-page-banner.jpg';
import PremiumMemberSec from "../Home/PremiumMemberSec/PremiumMemberSec";
import ServiceWelcomeSec from "./Componets/ServiceWelcomeSec";
import Services from "./Componets/Services";

const path: string[] = ['/', '/our-service'];
const pathName: string[] = ['Home', 'Services'];

const OurService = () => {
    return (
        <div className=" bg-color-p">
            <Helmet>
                <title>Our Services || Ride Hub</title>
            </Helmet>
            {/* Page Title */}
            <PageHeading img={headingImg} title="OUR SERVICES" path={path} pathName={pathName} />


            <ServiceWelcomeSec></ServiceWelcomeSec>
            <PremiumMemberSec></PremiumMemberSec>
            <Services></Services>


        </div>
    );
};

export default OurService;
