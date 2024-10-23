import React from "react";
import useUserData from "../CustomHocks/useUserData";
import Loading from "../SharedComponent/Loading/Loading";
import ErrorPage from "../SharedComponent/ErrorPage/ErrorPage";
import { Navigate, useLocation } from "react-router-dom";


type PropsType = {
    children: React.ReactNode
}

const PrivetRoute = ({ children }: PropsType) => {
    const { userData, isLoading, error } = useUserData()
    const location = useLocation()


    if (isLoading) return <Loading></Loading>
    if (error) return <ErrorPage />

    if (userData ) {
        return (
            <> {children} </>
        )
        
    }

   else{

    return(
        <>
        <Navigate state={location.pathname} to={'/login'}></Navigate>
        </>
    )

   }

};

export default PrivetRoute;