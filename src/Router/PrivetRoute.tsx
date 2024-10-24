import React from "react";
import Loading from "../SharedComponent/Loading/Loading";
import { Navigate, useLocation } from "react-router-dom";
import useUser from "../CustomHocks/useUser";
import Swal from "sweetalert2";



type PropsType = {
    children: React.ReactNode
}

const PrivetRoute = ({ children }: PropsType) => {
    const { user, loading } = useUser()
    const location = useLocation()

   
    if (loading) {
        return <Loading></Loading>
    }

    if (user) {
        

        return (
            <> {children} </>
        )
    }

    if (!user) {
        Swal.fire({
            title: 'Please Login First ',
            position: "top-end",
            icon: "info",
            showConfirmButton: false,
            timer: 1000,
            toast: true
        })
        return (
            <>
                <Navigate state={location.pathname} to={'/login'}></Navigate>
            </>
        )

    }

};

export default PrivetRoute;