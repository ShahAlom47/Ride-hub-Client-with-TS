
import Lottie from 'react-lottie';
import { useNavigate, useRouteError } from "react-router-dom";
import animationData from '../../assets/animation/7is0anCDSp.json'

import PropTypes from 'prop-types';
import { FaArrowLeft } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

interface ErrorPageProps {
  btn?: boolean;
}

interface RouteError {
  statusText?: string;
  message?: string;
}


    const ErrorPage  = ({ btn }:ErrorPageProps) => {
    const error = useRouteError() as RouteError; 
    const navigate = useNavigate();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    return (
        <div id="error-page" className="min-h-screen max-w">
            <div className="  flex flex-col justify-center items-center  min-h-screen">
                <Lottie options={defaultOptions} height={160} width={160} />
                <p className=" font-semibold">Sorry, an unexpected error has occurred.</p>

                <i className=" font-semibold text-xl">{error?.statusText || error?.message}</i>

                {
                    btn ? '' : (
                        <div className=" flex gap-5 items-center justify-center">
                            <button
                                onClick={() => navigate(-1)}
                                className="btn btn-sm my-3 rounded-sm bg-red-500 text-white hover:text-black"
                            >
                                <FaArrowLeft /> Back
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="btn btn-sm my-3 rounded-sm bg-red-500 text-white hover:text-black"
                            >
                                <IoHomeOutline /> Home
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

ErrorPage.propTypes = {
    btn: PropTypes.bool
};

export default ErrorPage;
