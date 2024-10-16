import { useQuery } from "@tanstack/react-query";
import { Products } from "../Shop";
import useAxiosPublic from "../../../CustomHocks/useAxiosPublic";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import Swal from "sweetalert2";
import useHandelAddToCart from "../../../CustomHocks/useHandelAddToCart";


type DetailsProps = {
    id: string
}

const ProductDetails = ({ id }: DetailsProps) => {

    const AxiosPublic = useAxiosPublic()
    const {addProduct}=useHandelAddToCart()

    const [productQ,setProductQ]=useState(1)

    const { data } = useQuery({
        queryKey: ['product_details', id],
        queryFn: async (): Promise<Products> => {
            const res = await AxiosPublic.get<Products>(`/shopData/productDetails/${id}`);
            return res.data;
        }
    });


    const handelProductQ = (value: string): void => { 
        if (value === 'decrease' && productQ > 1) {
            setProductQ(productQ - 1);
            return;
        } 
        else if ( value === 'increase' ) {
            if( data?.stock && data.stock > productQ){
            setProductQ(productQ + 1);
            return
            }
            Swal.fire({
                text:'Not Available More Product Quantity',
                toast:true
            })
        }
    }
    
  

    console.log(data);
    return (
        <div className="max-w">
            <div className=" grid lg:grid-cols-12 md:grid-cols-12 grid-cols-1  max-h-screen bg-color-p overflow-y-auto">
                <div className=" col-span-5 p-5">
                    <img src="https://m.media-amazon.com/images/I/61xv8k5p1gL._AC_SL1500_.jpg" alt={` ${data?.name || 'Product Photo'} Photo`} />
                </div>

                <div className="col-span-7 p-7 space-y-3 max-h-screen overflow-y-scroll ">
                    <div className=" flex gap-3 items-center">
                        <ReactStars
                            count={5}
                            value={data?.rating}
                            size={24}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <p className=" text-xl font-bold text-white">Review (0)</p>
                    </div>

                    <h1 className=" text-4xl font-bold font-pFont text-white">{data?.name}</h1>
                    <div className=" flex gap-3 items-center">
                        <p className="text-3xl font-bold font-pFont text-color-s">$ {data?.price}</p>
                        <p className="">{data?.stock==0? '(Out of Stock)':`(Available: ${data?.stock} Pcs)`}</p>

                    </div>
                    <p className="text-lg"> {data?.description}</p>

                    <div className="flex gap-4 items-center py-5 text-white">

                        <div className=" flex gap-2 items-center border p-2 py h-10">
                            <button onClick={()=>handelProductQ('decrease')} className=" bg-gray-700 rounded-full pb-1 h-8 w-8 items-center flex justify-center text-4xl ">-</button>
                            <p className="text-xl font-bold px-2">{productQ}</p>
                            <button onClick={()=>handelProductQ('increase')} className="bg-gray-700 rounded-full pb-1 h-8 w-8 items-center flex justify-center text-4xl">+</button>
                        </div>
                        <button onClick={() => data?._id && addProduct(data._id)}  className=" btn-p p-4 h-10">ADD TO CART</button>
                    </div>
                      <p className=" text-lg"> <span className="font-bold text-white">Brand:  </span>{data?.brand}</p>
                      <p className=" text-lg"> <span className="font-bold text-white">Category: </span>{data?.category}</p>
                      <p className=" text-lg"> <span className="font-bold text-white">Color: </span>{data?.color}</p>
                      <p className=" text-lg"> <span className="font-bold text-white">Material: </span>{data?.material}</p>


                      <p className=" text-lg"> <span className="font-bold text-white">Brand:  </span>{data?.brand}</p>
                      <p className=" text-lg"> <span className="font-bold text-white">Category: </span>{data?.category}</p>
                      <p className=" text-lg"> <span className="font-bold text-white">Color: </span>{data?.color}</p>
                      <p className=" text-lg"> <span className="font-bold text-white">Material: </span>{data?.material}</p>


                </div>


            </div>
        </div>
    );
};

export default ProductDetails;