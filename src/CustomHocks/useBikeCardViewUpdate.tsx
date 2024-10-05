import useAxiosPublic from "./useAxiosPublic";


const useBikeCardViewUpdate = () => {
    const AxiosPublic = useAxiosPublic();

    const handelBikeView = async (id: string) : Promise<void> => {
         await AxiosPublic.patch(`/bikeData/updateBikeView/${id}`)
    }

    return {handelBikeView}
};

export default useBikeCardViewUpdate;