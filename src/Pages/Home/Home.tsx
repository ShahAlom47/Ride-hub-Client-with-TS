
import Banner from "./Banner/Banner";
import LatestBike from "./LatestBike/LatestBike";
import PremiumMemberSec from "./PremiumMemberSec/PremiumMemberSec";


const Home = () => {
    return (
        <div className="bg-color-p m">
            <Banner></Banner>
            <LatestBike></LatestBike>
            <PremiumMemberSec></PremiumMemberSec>
           
            
        </div>
    );
};

export default Home;