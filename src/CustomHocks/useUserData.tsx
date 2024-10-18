import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useUser from "./useUser";

interface UserDataType {
    userName: string;
    userEmail: string;
    userRole: string;
    cartProductIds?: string[];
}
interface UserDataResponse {
    status: boolean;
    message?: string;
    data?: UserDataType;
}

const useUserData = () => {
    const { user } = useUser();
    const AxiosPublic = useAxiosPublic();

    const { data: userDataResponse, isLoading, error,refetch } = useQuery<UserDataResponse>({
        queryKey: ['userData', user?.email],
        queryFn: async () => {
            const res = await AxiosPublic.get(`/users/getUserData/${user?.email}`);
            return res.data as UserDataResponse;
        },
        enabled: !!user?.email,
    });

    const userData = userDataResponse?.data;
    const message = userDataResponse?.message;
    return { userData, isLoading, error, message ,refetch};
};


export default useUserData;
