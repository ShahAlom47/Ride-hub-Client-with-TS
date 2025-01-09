import { Helmet } from "react-helmet-async";
import ErrorPage from "../../SharedComponent/ErrorPage/ErrorPage";
import Loading from "../../SharedComponent/Loading/Loading";
import PageHeading from "../../SharedComponent/PageHeading/PageHeading";

import headingImg from '../../assets/Banner-Img/bike-page-banner.jpg';
import WelComeSection from "./WelComeSection/WelComeSection";


const AboutUs = () => {
    const error: boolean = false;
    const isLoading: boolean = false;
    const path: string[] = ['/', '/about-us'];
    const pathName: string[] = ['Home', 'About'];

    if (isLoading) return <Loading></Loading>;

    return (
        <div className=" bg-color-p">
            <Helmet>
                <title> About || Ride Hub</title>
            </Helmet>

            <PageHeading img={headingImg} title="ABOUT US" path={path} pathName={pathName} />
            {
                error ? <ErrorPage></ErrorPage> :
                    <div >
                        <WelComeSection></WelComeSection>

                    </div>
            }
        </div>
    );
};

export default AboutUs;