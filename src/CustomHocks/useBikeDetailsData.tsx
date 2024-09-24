import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { BikeData } from "../Pages/OurBikes/BikeDataInterFace/bikeDataIterFace";

interface BikeResponse {
    data: BikeData
}

const useBikeDetailsData = (id?: string) => {
    const AxiosPublic = useAxiosPublic();

    // Use the useQuery hook here directly
    const { data, isLoading, error, refetch } = useQuery<BikeResponse, Error>({
        queryKey: ['bikeDetailsData', id], // Query key
        queryFn: async (): Promise<BikeResponse> => {
            if (!id) throw new Error("Bike ID is required"); // Handle missing ID
            const res = await AxiosPublic.get(`/bikeData/bike-details/${id}`);
            return res.data as BikeResponse;
        },
        enabled: !!id, // Only fetch if id is truthy (not undefined or null)
    });
    
    return { data, isLoading, error, refetch }; // Return relevant data
};

export default useBikeDetailsData;
