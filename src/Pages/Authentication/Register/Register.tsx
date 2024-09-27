import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import useUser from "../../../CustomHocks/useUser";
import { updateProfile } from "firebase/auth";
import  auth  from "../../../../firebase.config.ts";


// Define the form field types
interface IFormInput {
    name: string;
    email: string;
    password: string;
    rememberMe: boolean;
}

const Register: React.FC = () => {
    const {
        register, 
        handleSubmit,
        formState: { errors }  
    } = useForm<IFormInput>();

    const {user,registerUser}= useUser();
    
 console.log(user);

 const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const registerRes = await registerUser({ email: data.email, password: data.password });

    if (registerRes.user) {
        await updateProfile(registerRes.user, { displayName: data.name });
    } else {
        console.error("User registration failed, user is null.");
    }
    
    console.log(registerRes.user);
};

    return (
        <div className="min-h-screen bg-gradient-to-bl from-black via-slate-900 to-black flex items-center justify-center mt-5 py-16 ">
            <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md ">
                <h2 className="text-center text-white text-3xl mb-6 font-bold">User Register</h2>


                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* name Field */}
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register("name", { required: "name is required" })}
                            className="w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>


                    {/* email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", { required: "email is required" })}
                            className="w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className=" relative">
                        <input
                            type="password"
                            id="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters long"
                                }
                            })}
                            className="w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      <button></button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Remember Me and Forgot Password */}
                    <div className="flex flex-col items-center justify-between mb-4">
                        <p>Already have an Account ? <Link className={'btn btn-link'} to={'/login'}> Login</Link></p>

                       
                    </div>

                    {/* Sign In Button */}
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full py-2 btn-p transition"
                        >
                            Register
                        </button>
                    </div>

                    {/* OR Separator */}
                    <div className="flex items-center justify-center text-gray-400 mb-6">
                        <span className="mr-2">OR</span>
                    </div>

                    {/* Register Button */}
                    <div>
                        <SocialLogin></SocialLogin>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
