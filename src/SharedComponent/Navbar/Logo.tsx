import { Link } from "react-router-dom";
import logo from '../../assets/png/RideHub_logo (2).png'


const Logo = () => {
    return (
        
        <Link to={'/'}> <img className="  lg:w-24 lg:h-12 md:w-20 md:h-12  w-16 h-10" src={logo} alt="rideHub logo" /></Link>
    );
};

export default Logo;