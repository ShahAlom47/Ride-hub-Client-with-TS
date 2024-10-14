import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { BikeData } from "../Pages/OurBikes/BikeDataInterFace/bikeDataIterFace";
import { Products } from "../Pages/Shop/Shop";


type BikeDataResponse = BikeData[];
type ProductDataResponse = Products[];


const useWishListFetch = (category: string, wishItemIds: string[]) => {
    const AxiosPublic = useAxiosPublic();

   
    const fetchBikeData = async (): Promise<BikeDataResponse> => {
        const res = await AxiosPublic.post(`/bikeData/getWishListData/bike`, { ids: wishItemIds });
        return res.data as BikeDataResponse;
    };

  
    const fetchProductData = async (): Promise<ProductDataResponse> => {
        const res = await AxiosPublic.post(`/bikeData/getWishListData/product`, { ids: wishItemIds });
        return res.data as ProductDataResponse;
    };

   // fetch BikeData based on category
    const bikeData = useQuery<BikeDataResponse, Error>({
        queryKey: ['bikeWishList', wishItemIds],
        queryFn: fetchBikeData,
        enabled: category === 'bike' && wishItemIds.length > 0,
    });

    // fetch Products based on category
    const productData = useQuery<ProductDataResponse, Error>({
        queryKey: ['productWishList', wishItemIds],
        queryFn: fetchProductData,
        enabled: category === 'product' && wishItemIds.length > 0,
    });

  
    return { bikeData, productData };
};

export default useWishListFetch;
