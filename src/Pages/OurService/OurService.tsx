import PageHeading from "../../SharedComponent/PageHeading/PageHeading"
import headingImg from '../../assets/Banner-Img/bike-page-banner.jpg';
import ServiceWelcomeSec from "./Componets/ServiceWelcomeSec";

const path: string[] = ['/', '/our-service'];
const pathName: string[] = ['Home', 'Services'];

const OurService = () => {
    return (
        <div className="px-4 py-8 bg-gray-100">
            {/* Page Title */}
            <PageHeading img={headingImg} title="OUR SERVICES" path={path} pathName={pathName} />


            <ServiceWelcomeSec></ServiceWelcomeSec>


        </div>
    );
};

export default OurService;
