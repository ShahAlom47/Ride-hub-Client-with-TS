import useAxiosPublic from "./useAxiosPublic";

interface Product {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}



const useProductManage  = () => {
    const AxiosPublic = useAxiosPublic();




    const updateProductStock= async (soldProductsData:Product[])=>{
         await AxiosPublic.patch('/shopData/updateStock',{soldProductsData})
         

    }

    return {
        updateProductStock,

    };
};

export default useProductManage ;