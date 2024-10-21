

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../CustomHocks/useAxiosPublic';


interface StripePaymentProps {
    totalFinalAmount: number; 
}

interface SecretResType {
    clientSecret:string;
}

const StripePayment = ({totalFinalAmount}: StripePaymentProps) => {
   
    const stripe = useStripe();
    const elements = useElements();
    const AxiosPublic = useAxiosPublic()
    const [errMsg, setErrMsg] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    // const [transactionId, setTransactionId] = useState('');
    // const [btnLoading, setBtnLoading] = useState(false);


    useEffect(() => {
        if (totalFinalAmount) {
            const createPaymentIntent = async () => {
                try {
                  
                    const amount = typeof totalFinalAmount === 'number' ? 
                        totalFinalAmount : 
                        parseFloat(totalFinalAmount);
    
                    const response = await AxiosPublic.post<SecretResType>("/payment/stripe-secretKey", { 
                        amount 
                    });
                    setClientSecret(response.data.clientSecret);
                    setErrMsg('');
                } catch (error) {
                    console.error(error);
                  
                    setErrMsg(error?.response?.data?.error || 'An error occurred');
                }
            };
    
            createPaymentIntent();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalFinalAmount]);
    


    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (cardElement) {
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                console.log('[error]', error);
            } else {
                console.log('[PaymentMethod]', paymentMethod);
               
            }
        }
    };
    return (
        <div className=' p-5'>
            <form className=' lg:w-8/12 md:w-8/12 w-11/12 mx-auto space-y-4' onSubmit={handleSubmit}>
                <div className='border border-white p-2 rounded-sm'>
                    <CardElement options={cardStyle} />
                </div>
                <button className='bg-blue-900 rounded-sm p-2 hover:bg-blue-800 w-full' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default StripePayment;
const cardStyle = {
    style: {
        base: {
            color: '#fff',
            fontFamily: 'Arial, sans-serif',
            border: '3px solid white ',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4',
            },
            padding: '10px',
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
};