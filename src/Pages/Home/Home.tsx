
import Banner from "./Banner/Banner";
import LatestBike from "./LatestBike/LatestBike";
import PremiumMemberSec from "./PremiumMemberSec/PremiumMemberSec";
import ShopOnline from "./ShopOnline/ShopOnline";


const Home = () => {
    return (
        <div className="bg-color-p m">
            <Banner></Banner>
            <LatestBike></LatestBike>
            <PremiumMemberSec></PremiumMemberSec>
            <ShopOnline></ShopOnline>
           
            
        </div>
    );
};

export default Home;