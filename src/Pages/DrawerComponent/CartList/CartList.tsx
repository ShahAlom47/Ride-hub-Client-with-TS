import { useQuery } from "@tanstack/react-query";
import useUser from "../../../CustomHocks/useUser";
import useAxiosPublic from "../../../CustomHocks/useAxiosPublic";


const CartList = () => {
    const {user}=useUser();
    const AxiosPublic=useAxiosPublic();

    const {data}=useQuery({
        queryKey:['cartListData',user],
        queryFn: async ()=>{

        }
    })
console.log(data)
    
    return (
        <div className="">
            <div className="  flex justify-end py-3 ">
                <h1> Your cart({0})</h1>
            </div>
            <div className="">

                
            </div>
              cartList
        </div>
    );
};

export default CartList;