
import useHandelWishList from "../../../../CustomHocks/useHandelWishList";
import useWishListFetch from "../../../../CustomHocks/useWishListFetch";




const BikeList = () => {

    const { getBikeWishList } = useHandelWishList();
    const bikeIds = getBikeWishList();
    const { data } = useWishListFetch('bike', bikeIds)
    console.log(data);


    return (
        <div>
            bikeList
        </div>
    );
};

export default BikeList;