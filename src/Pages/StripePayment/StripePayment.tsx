

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../CustomHocks/useAxiosPublic';
import { FinalDataType, Product } from '../CheckOut/CheckOut';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useSendEmail from '../../CustomHocks/useSendEmail';
import useProductManage from '../../CustomHocks/useProductManage ';
import useHandelCoupon from '../../CustomHocks/useHandelCoupon';
import useUser from '../../CustomHocks/useUser';
import useAxiosSecure from '../../CustomHocks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';


interface RenterData {
    email: string | undefined;
    name: string | undefined;
    startDate: string;
    endDate: string;
    paymentMethod: string;
    bikeId: string | undefined;
    totalRentalDays: number;
    finalAmount: number;
    products?: Product[]; 
    couponValue?: number; 
    discountAmount?: number; 
}

type StripeDataType = FinalDataType | RenterData & {
    products?: Product[]; 
    couponValue?: number; 
    discountAmount?: number; 
};

interface StripePaymentProps {
    checkOutData: StripeDataType | null;
    category: string

}

interface SecretResType {
    clientSecret: string;
}

type PaymentResType = {
    status: boolean;
    message: string;
    orderId?: string
}


const StripePayment = ({ checkOutData, category }: StripePaymentProps) => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useUser();
    const AxiosPublic = useAxiosPublic();
    const axiosSecure= useAxiosSecure();
    const { sendEmail } = useSendEmail();
    const { updateProductStock } = useProductManage();
    const { addCouponUser } = useHandelCoupon();
    const [errMsg, setErrMsg] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);



    const isAxiosError = (error: unknown): error is { response: { data: { error: string } } } => {
        return typeof error === 'object' && error !== null && 'response' in error;
    };
    
    const isRenterData = (data: StripeDataType): data is RenterData => {
        return (data as RenterData).startDate !== undefined && (data as RenterData).endDate !== undefined;
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

                        // setTransactionId(paymentIntent.id)
                        setBtnLoading(false)
                        const paymentData = {
                            transactionId: paymentIntent.id,
                            type: "product_purchase",

                            ...checkOutData
                        }

                        const paymentRes = await AxiosPublic.post<PaymentResType>('/payment/addPaymentData', { paymentData })


                        if (paymentRes.data?.status) {
                            const transactionId = paymentIntent.id;

                            // email data Start
                            const mailData = {
                                from: 'ridehub47@gmail.com',
                                to: checkOutData?.email,
                                subject: 'Payment Successfully Completed',
                                html: `
                                    <div style="font-family: Arial, sans-serif; color: #333;">
                                        <h2 style="color: #4CAF50;">Payment Confirmation</h2>
                                        <p>Dear ${checkOutData?.name},</p>
                                        <p>We are pleased to inform you that your payment has been successfully completed.</p>
                                        <p><strong>Transaction ID:</strong> ${transactionId}</p>
                                        <p><strong>Amount Paid:</strong> ${checkOutData?.finalAmount} USD</p>
                                        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                                        <p>Thank you for choosing our service. If you have any questions or need further assistance, please feel free to contact us.</p>
                                        <p style="margin-top: 20px;">Best regards,<br>RideHub Team</p>
                                    </div>
                                `,
                            };
                            // email data End

                            //  send payment data to user 
                            sendEmail(mailData);

                            if (category === 'shopProduct' && checkOutData?.products) {
                                updateProductStock(checkOutData?.products || []);
                                if (checkOutData?.couponValue != null) {
                                    addCouponUser({
                                        couponValue: checkOutData?.couponValue ?? null, // Use null if undefined
                                        userEmail: user?.email || '',
                                        userName: user?.displayName || '',
                                        orderId: paymentRes.data?.orderId || '',
                                        discountAmount: checkOutData?.discountAmount || 0,
                                        finalAmount: checkOutData?.finalAmount || 0
                                    });
                                }
                                 await AxiosPublic.delete(`/users/clearCartProduct/${user?.email}`)
                               
                            }

                            if (checkOutData && isRenterData(checkOutData) && category === 'rentBike') {
                            

                                const rentDate={
                                    rent_start_date:checkOutData?.startDate,
                                    rent_end_date:checkOutData?.endDate,
                                    renterUser:checkOutData?.email,
                                }
                                console.log(rentDate);
                                const res = await axiosSecure.patch(`/bikeData/updateRentStatus/${checkOutData?.bikeId}`,rentDate)

                                 console.log(res.data);

                            }


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
                               
                               
                                navigate(category != 'shopProduct'? '/our-bikes':'/shop')
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
            <Helmet>
                <title>Payment || Ride Hub</title>
            </Helmet>
            <form className=' lg:w-8/12 md:w-8/12 w-11/12 mx-auto space-y-4' onSubmit={handleSubmit}>
                <p className=' text-color-s '>{errMsg}</p>
                <div className='border border-white p-2 rounded-sm'>
                    <CardElement options={cardStyle} />
                </div>

                <button className={`bg-blue-900 rounded-sm p-2 hover:bg-blue-800 w-full ${!stripe || !clientSecret ? 'cursor-not-allowed' : ''} `} type="submit" disabled={!stripe || !clientSecret}>
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