import Swal from "sweetalert2";


const useHandelWishList = () => {
    

    // alert
    const alert =(value:string):void =>{
        Swal.fire({
            toast: true,
            icon:value=='add'?'success': 'info',
            title: value === 'add' ? 'Successfully Added to WishList' : 'Removed from WishList',
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
    }

    const getBikeWishList = () :string[]  => {
        const existingWishList = localStorage.getItem('bikeWishList');
        return existingWishList ? JSON.parse(existingWishList) : [];
    };

    const getShopWishList = ():string[] => {
        const existingWishList = localStorage.getItem('shopWishList');
        return existingWishList ? JSON.parse(existingWishList) : [];
    };

    const addBikeWishList = async (bikeId:string)=>{
        const currentWishList = getBikeWishList();

        if(currentWishList.includes(bikeId)){
            const updatedList= currentWishList.filter((i:string)=> i!= bikeId)
            localStorage.setItem('bikeWishList',JSON.stringify(updatedList))
            alert('remove')
        } else{
           currentWishList.push(bikeId)
            localStorage.setItem('bikeWishList',JSON.stringify(currentWishList))
            alert('add')
        }

    }

const removeItemFromWishList = async ( listName:string,id:string)=>{
    const currentWishList = getBikeWishList();

        const updatedList= currentWishList.filter((i:string)=> i!= id)
        localStorage.setItem(listName,JSON.stringify(updatedList))
        alert('remove')
   

}

    const addShopWishList = async (productId:string)=>{
        const currentWishList = getShopWishList();

        if(currentWishList.includes(productId)){
            console.log('ID ACE ',productId)
            const updatedList= currentWishList.filter((i:string)=> i!= productId)
            localStorage.setItem('shopWishList',JSON.stringify(updatedList))
            alert('remove')
        } else{
            console.log('ID nai ',productId)
           currentWishList.push(productId)
            localStorage.setItem('shopWishList',JSON.stringify(currentWishList))
            alert('add')
        }

    }
    return {
        addBikeWishList,
        getBikeWishList,
        addShopWishList,
        getShopWishList,
        removeItemFromWishList,
    }
};

export default useHandelWishList;