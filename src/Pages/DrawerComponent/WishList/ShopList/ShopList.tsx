import useHandelWishList from "../../../../CustomHocks/useHandelWishList";
import useWishListFetch from "../../../../CustomHocks/useWishListFetch";


const ShopList = () => {
    const { getShopWishList } = useHandelWishList()
    const shopProductIds = getShopWishList();
    const { data } = useWishListFetch('shop', shopProductIds)

    console.log(data)
    return (

        <div>
            Shop List
        </div>
    );
};

export default ShopList;