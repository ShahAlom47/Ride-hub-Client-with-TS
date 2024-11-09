import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { BikeData } from "../Pages/OurBikes/BikeDataInterFace/bikeDataIterFace";


const useBikeDetailsData = (id?: string) => {
    const AxiosPublic = useAxiosPublic();

    
    const { data, isLoading, error, refetch } = useQuery<BikeData, Error>({
        queryKey: ['bikeDetailsData', id], 
        queryFn: async (): Promise<BikeData> => {
            if (!id) throw new Error("Bike ID is required"); // Handle missing ID
            const res = await AxiosPublic.get(`/bikeData/bike-details/${id}`);
            return res.data as BikeData;
        },
        enabled: !!id,
    });
    
    return { data, isLoading, error, refetch }; // Return relevant data
};

export default useBikeDetailsData;
