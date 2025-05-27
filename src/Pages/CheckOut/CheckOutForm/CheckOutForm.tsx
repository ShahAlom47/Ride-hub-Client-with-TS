import  { forwardRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useUser from '../../../CustomHocks/useUser';

export interface OrderFormInputs {
    name: string;
    email: string;
    address: string;
    state: string;
}

interface CheckOutFormProps {
    onSubmit: (data: OrderFormInputs) => void;
}

const CheckOutForm = forwardRef<HTMLFormElement, CheckOutFormProps>((props, ref) => {
    const {user}=useUser()
    const { onSubmit } = props;
    const { register, handleSubmit, formState: { errors } } = useForm<OrderFormInputs>();

    const handleFormSubmit: SubmitHandler<OrderFormInputs> = (data) => {
        onSubmit(data);
    };

    return (
        <div className="mx-auto mt-10 p-6 bg-color-p shadow-lg rounded-sm text-white ">
            <h2 className="text-2xl font-semibold font-pFont mb-4">Billing details</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)} ref={ref} className="space-y-4">
                
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input 
                        {...register("name", { required: true })} 
                        type="text" 
                        className={`input rounded-sm bg-transparent border w-full ${errors.name ? 'border-red-500' : 'border-gray-500'}`} 
                        placeholder="Your Name" 
                    />
                    {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
                </div>
                
                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input 
                        {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/ })}
                        type="email" 
                        className={`input rounded-sm bg-transparent border w-full ${errors.email ? 'border-red-500' : 'border-gray-500'}`} 
                        placeholder="Your Email" 
                        defaultValue={user?.email||''}
                    />
                    {errors.email && <span className="text-red-500 text-sm">Valid email is required</span>}
                </div>
                
                {/* Address */}
                <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input 
                        {...register("address", { required: true })} 
                        type="text" 
                        className={`input rounded-sm bg-transparent border w-full ${errors.address ? 'border-red-500' : 'border-gray-500'}`} 
                        placeholder="Delivery Address" 
                    />
                    {errors.address && <span className="text-red-500 text-sm">Address is required</span>}
                </div>
                
                {/* State */}
                <div>
                    <label className="block text-sm font-medium mb-1">State </label>
                    <input 
                        {...register("state", { required: true })} 
                        type="text" 
                        className={`input rounded-sm bg-transparent border w-full ${errors.state ? 'border-red-500' : 'border-gray-500'}`} 
                        placeholder="Delivery Address" 
                    />
                    {errors.state && <span className="text-red-500 text-sm">Please select a state</span>}
                </div>
                
            
            </form>
        </div>
    );
});

export default CheckOutForm;
