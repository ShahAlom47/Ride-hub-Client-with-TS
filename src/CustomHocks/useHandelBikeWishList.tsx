

const useHandelBikeWishList = () => {

    const getBikeWishList = () => {
        const existingWishList = localStorage.getItem('bikeWishList');
        return existingWishList ? JSON.parse(existingWishList) : [];
    };

    const addBikeWishList = async (bikeId:string)=>{
        const currentWishList = getBikeWishList();

        if(currentWishList.includes(bikeId)){
            const updatedList= currentWishList.filter((i:string)=> i!= bikeId)
            localStorage.setItem('bikeWishList',JSON.stringify(updatedList))
        } else{
           currentWishList.push(bikeId)
            localStorage.setItem('bikeWishList',JSON.stringify(currentWishList))
        }

    }
    return {
        addBikeWishList,
        getBikeWishList
    }
};

export default useHandelBikeWishList;