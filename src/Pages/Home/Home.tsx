import ErrorPage from "../../SharedComponent/ErrorPage/ErrorPage";
import Banner from "./Banner/Banner";


const Home = () => {
    return (
        <div className="bg-color-p mt-16">
            <Banner></Banner>
            <ErrorPage></ErrorPage>
           
            
        </div>
    );
};

export default Home;