import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { BikeData } from "../Pages/OurBikes/BikeDataInterFace/bikeDataIterFace";
import { Products } from "../Pages/Shop/Shop";

// Response Interface
interface WishListResponse {
    data: (BikeData | Products)[]; // Data can be either BikeData or Products array
}

const useWishListFetch = (category: string, wishItemIds: string[]) => {
    const AxiosPublic = useAxiosPublic();

    return useQuery<WishListResponse, Error>({
        queryKey: ['wishList', category, wishItemIds],
        queryFn: async (): Promise<WishListResponse> => {
            const res = await AxiosPublic.post(`/bikeData/getWishListData/${category}`, { ids: wishItemIds });
            return res.data as WishListResponse;
        },
        enabled: !!category && wishItemIds.length > 0,
    });
};

export default useWishListFetch;
