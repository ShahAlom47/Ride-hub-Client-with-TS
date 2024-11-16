import { useLocation } from "react-router-dom";
import StripePayment from "../../../StripePayment/StripePayment";


const RentPayment = () => {
    const location = useLocation()
    const paymentData = location.state;
    console.log(paymentData);

    return (
        <div>
      
        </div>
    );
};

export default RentPayment;