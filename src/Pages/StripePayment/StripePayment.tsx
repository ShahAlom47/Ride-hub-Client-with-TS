

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../CustomHocks/useAxiosPublic';
import { FinalDataType } from '../CheckOut/CheckOut';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


interface StripePaymentProps {
    checkOutData: FinalDataType |null

}

interface SecretResType {
    clientSecret: string;
}

type PaymentResType ={
    status:boolean;
    message:string;
}

const StripePayment = ({ checkOutData }: StripePaymentProps) => {
    const navigate= useNavigate()
    const stripe = useStripe();
    const elements = useElements();
    const AxiosPublic = useAxiosPublic()
    const [errMsg, setErrMsg] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [transactionId, setTransactionId] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);

   

    const isAxiosError = (error: unknown): error is { response: { data: { error: string } } } => {
        return typeof error === 'object' && error !== null && 'response' in error;
    };

    useEffect(() => {
        if (checkOutData?.finalAmount) {
            const createPaymentIntent = async () => {
                try {
                    const amount = typeof checkOutData?.finalAmount === 'number'
                        ? checkOutData?.finalAmount
                        : parseFloat(checkOutData?.finalAmount);

                    const response = await AxiosPublic.post<SecretResType>("/payment/stripe-secretKey", {
                        amount
                    });

                    setClientSecret(response.data.clientSecret);
                    setErrMsg('');
                } catch (error: unknown) {
                    console.error(error);


                    if (isAxiosError(error)) {
                        setErrMsg(error.response.data.error || 'An error occurred');
                    } else {
                        setErrMsg('An error occurred');
                    }
                }
            };

            createPaymentIntent();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkOutData?.finalAmount]);


    const handleSubmit = async (event: React.FormEvent) => {
        setErrMsg('')
        setBtnLoading(true)
        event.preventDefault();
        if (!stripe || !elements) {
            setBtnLoading(false)
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (cardElement) {
            const { error } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (error) {
                setErrMsg(error?.message || 'Something is Wrong')
                setBtnLoading(false)
            } else {
                
                const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
                    {
                        payment_method: {
                            card: cardElement,
                            billing_details: {
                                name: checkOutData?.name,
                                email: checkOutData?.email,
                                // parent theke full data niye aste hobe 
                            }
                        }
                    }
                )

                if (confirmError) {
                    setErrMsg(confirmError?.message || 'Something is Wrong')
                    setBtnLoading(false)
                    return
                } else {
                   
                    if (paymentIntent.status === 'succeeded') {

                        setTransactionId(paymentIntent.id)
                        setBtnLoading(false)
                        const paymentData={
                            transactionId:paymentIntent.id,
                            type: "product_purchase",
                            
                            ...checkOutData
                        }

                        const paymentRes = await AxiosPublic.post <PaymentResType> ('/payment/addPaymentData',{paymentData})
                        console.log(paymentRes);

                        if (paymentRes.data?.status) {
                            const transactionId = paymentIntent.id; // Assuming you receive transaction ID in the response
                        
                            Swal.fire({
                                title: 'Payment Successful!',
                                html: `
                                    <p>${paymentRes.data.message}</p>
                                    <p><strong>Transaction ID:</strong> ${transactionId}</p>
                                    <p>Your order will be updated and can be viewed on your order dashboard.</p>
                                `,
                                icon: 'success',
                                confirmButtonText: 'OK',
                                customClass: {
                                    popup: 'swal-payment-popup',
                                    confirmButton: 'swal-confirm-button'
                                },
                                allowOutsideClick: false,
                                allowEscapeKey: false
                            }).then(() => {
                                navigate('/shop')
                            });
                        } else {
                            Swal.fire({
                                title: 'Payment Failed',
                                text: 'There was an issue processing your payment. Please try again.',
                                icon: 'error',
                                confirmButtonText: 'OK'
                            });
                        }
                 
                       
                    }
                }

            }
        }
    };


    return (
        <div className=' p-5'>
            <form className=' lg:w-8/12 md:w-8/12 w-11/12 mx-auto space-y-4' onSubmit={handleSubmit}>
                <p className=' text-color-s '>{errMsg}</p>
                <div className='border border-white p-2 rounded-sm'>
                    <CardElement options={cardStyle} />
                </div>

                <button className={`bg-blue-900 rounded-sm p-2 hover:bg-blue-800 w-full ${!stripe || !clientSecret?'cursor-not-allowed':''} `} type="submit" disabled={!stripe || !clientSecret}>
                    {btnLoading ? 'Loading...' : 'Pay'}
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