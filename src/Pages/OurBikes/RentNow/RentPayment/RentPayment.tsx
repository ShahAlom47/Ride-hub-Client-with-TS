import { useLocation } from "react-router-dom";


const RentPayment = () => {
    const location = useLocation()
    const paymentData = location.state;
    console.log(paymentData);
    return (
        <div>
            rent Pages
        </div>
    );
};

export default RentPayment;