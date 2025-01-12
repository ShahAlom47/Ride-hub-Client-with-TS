import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import useUser from "../../../CustomHocks/useUser";
import { updateProfile } from "firebase/auth";
import Swal from 'sweetalert2'
import useAxiosPublic from "../../../CustomHocks/useAxiosPublic";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FiEyeOff } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

// Define the form field types
interface IFormInput {
    name: string;
    email: string;
    password: string;
    rememberMe: boolean;
}

interface AddUserResponse {
    status: boolean;
    message: string;
}

interface UserDataType {
    userName: string;
    userEmail: string;
    userPassword: string;
    userRole: string;
    userPhoto?: string;
}

const Register: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const { registerUser } = useUser();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const [showPass, setShowPass] = useState<boolean>();

    const addUser = async (userData: UserDataType): Promise<AddUserResponse | null> => {
        try {
            const addUserRes = await axiosPublic.post<AddUserResponse>('/users/addUser', userData);

            if (addUserRes.data.status === false) {
                localStorage.removeItem('token');
            }
            return addUserRes.data;
        } catch (error) {
            console.error("Error adding user", error);
            return null;
        }
    };

    // Form submit handler
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const registerRes = await registerUser({ email: data.email, password: data.password });

            if (registerRes.user) {
                await updateProfile(registerRes.user, { displayName: data.name });

                const userData = {
                    userName: data.name,
                    userEmail: data.email,
                    userPassword: '',
                    userRole: 'user',
                    userPhoto:'',
                };

                // Add user to database
                const addRes = await addUser(userData);
                if (addRes?.status === true) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: addRes.message,
                        showConfirmButton: false,
                        timer: 1500,
                        toast: true
                    });

                    navigate('/');
                } else {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: addRes ? addRes.message : "User registration failed!",
                        showConfirmButton: false,
                        timer: 1500,
                        toast: true
                    });
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {

            if (error.code === 'auth/email-already-in-use') {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Account already exists with this email!',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Registration failed! Please try again.',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-bl from-black via-slate-900 to-black flex items-center justify-center mt-5 py-16 ">
            <Helmet>
                <title> Register || Ride Hub</title>
            </Helmet>
            <div className="bg-black p-8 rounded-lg shadow-lg w-full max-w-md ">
                <h2 className="text-center text-white text-3xl mb-6 font-bold">User Register</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm mb-2" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            {...register("name", { required: "name is required" })}
                            className="w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", { required: "email is required" })}
                            className="w-full px-3 py-2 bg-gray-800 text-gray-200 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm mb-2" htmlFor="password">Password</label>
                        <div className=" relative  ">
                            <input
                                type={showPass ? 'text' : "password"}
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
                            <button className="absolute top-1/3 right-6" type="button" onClick={() => setShowPass(!showPass)}>{showPass ? <MdOutlineRemoveRedEye /> : <FiEyeOff />}</button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Already have an account */}
                    <div className="flex flex-col items-center justify-between mb-4">
                        <p>Already have an Account? <Link className="btn btn-link" to="/login">Login</Link></p>
                    </div>

                    {/* Register Button */}
                    <div className="mb-6">
                        <button type="submit" className="w-full py-2 btn-p transition">Register</button>
                    </div>

                    {/* OR Separator */}
                    <div className="flex items-center justify-center text-gray-400 mb-6">
                        <span className="mr-2">OR</span>
                    </div>

                    {/* Social Login */}
                    <div>
                        <SocialLogin />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
