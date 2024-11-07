import { useNavigate } from "react-router-dom";
import useUser from "./useUser";


const useRentNowBtn = () => {

    const { user } = useUser();
    const navigate = useNavigate()

    const handelRentButton = async (id: string) => {
        if (!user) {
            navigate('/login')
            return
        }

        navigate(`/rentNow/${id}`)
       
    }

    return { handelRentButton };
};

export default useRentNowBtn;