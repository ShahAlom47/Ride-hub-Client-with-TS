import mastercardIcon from '../../../assets/icons/masterCard.jpg';
import visaIcon from '../../../assets/icons/visaCard.jpg';
import bkashIcon from '../../../assets/icons/bkash.jpg';
import nagadIcon from '../../../assets/icons/nagad.jpg';

const paymentMethodData: PaymentMethodType[] = [
    { methodName: 'Mastercard', img: mastercardIcon, value: 'mastercard' },
    { methodName: 'Visa', img: visaIcon, value: 'visa' },
    { methodName: 'BKash', img: bkashIcon, value: 'bkash' },
    { methodName: 'Nagad', img: nagadIcon, value: 'nagad' },
];

type PaymentMethodType = {

    methodName: string;
    img: string;
    value: string;
}
interface PropsType {
    children?:string;
    selectedMethod:string|boolean;
    methodMsg:string | boolean;
    handelMethod:(method:string)=>void
}



const PaymentMethodBtn = ({selectedMethod,methodMsg,handelMethod}:PropsType) => {



    return (
        <div className=" border border-gray-500 p-4 my-4 w-full">
            <h1 className="text-white font-semibold "> Accepted Payment Methods :</h1>
            <p className=" text-color-s my-2">{methodMsg}</p>
            <div className={`  flex gap-2 items-center justify-center py-3 `}>
                {
                    paymentMethodData.map((item) =>
                        <button
                            onClick={() => handelMethod(item.value)}
                            className={`${selectedMethod === item.value ? ' border-opacity-100 border-color-s' : 'border-opacity-0 '} p-1 w-20 h-10 my-auto items-center rounded-md group flex justify-center border-4 border-white  hover:border-opacity-100 `}
                        > <img className=" rounded-sm h-full w-full group-hover:w-[95%] group-hover:h-[95%] " src={item.img} alt="" />
                        </button>)
                }
            </div>

        </div>
    );
};

export default PaymentMethodBtn;