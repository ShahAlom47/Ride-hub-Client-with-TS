import PageHeading from "../../SharedComponent/PageHeading/PageHeading";
import headingImg from "../../assets/Banner-Img/bike-page-banner.jpg"


const OurBikes = () => {
    const path:string[]=['/','/our-bikes']
    const pathNmae:string[]=['Home','Our Bike']
    return (
        <div>
            <PageHeading img={headingImg} title="OUR BIKE" path={path} pathName={pathNmae}></PageHeading>
            our bikes
        </div>
    );
};

export default OurBikes;