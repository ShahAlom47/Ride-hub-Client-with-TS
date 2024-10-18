import { useLocation } from "react-router-dom";


const CheckOut = () => {
    const location = useLocation();
    console.log(location.state)
    return (
        <div>
            checkout
        </div>
    );
};

export default CheckOut;