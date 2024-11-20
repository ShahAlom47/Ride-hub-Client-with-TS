import { useLocation } from "react-router-dom";
import StripePayment from "../../../StripePayment/StripePayment";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const RentPayment = () => {
    const location = useLocation()
    const paymentData = location.state;
    console.log(paymentData);



    return (
        <div>
            {paymentData?.paymentMethod === 'mastercard' && (<div>
                <Elements stripe={stripePromise}>
                    <StripePayment category={'rentBike'} checkOutData={paymentData !== null ? paymentData : null} />
                </Elements>
            </div>)}
            {paymentData?.paymentMethod === 'visa' && (<div>    stripe visa card  </div>)}
            {paymentData?.paymentMethod === 'bkash' && (<div>    stripe  bkash  </div>)}
            {paymentData?.paymentMethod === 'nagad' && (<div>    stripe  nagad </div>)}

        </div>
    );
};

export default RentPayment;