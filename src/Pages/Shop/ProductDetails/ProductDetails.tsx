import { useQuery } from "@tanstack/react-query";
import { Products } from "../Shop";
import useAxiosPublic from "../../../CustomHocks/useAxiosPublic";
import ReactStars from "react-rating-stars-component";


type DetailsProps = {
    id: string
}

const ProductDetails = ({ id }: DetailsProps) => {

    const AxiosPublic = useAxiosPublic()

    const { data } = useQuery({
        queryKey: ['product_details', id],
        queryFn: async (): Promise<Products> => {
            const res = await AxiosPublic.get<Products>(`/shopData/productDetails/${id}`);
            return res.data;
        }
    });

    console.log(data);
    return (
        <div className="max-w">
            <div className=" grid grid-cols-12  max-h-screen bg-color-p">
                <div className=" col-span-5 p-5">
                    <img src="https://m.media-amazon.com/images/I/61xv8k5p1gL._AC_SL1500_.jpg" alt={` ${data?.name || 'Product Photo'} Photo`} />
                </div>

                <div className="col-span-7 p-7 space-y-3 ">
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



                </div>


            </div>
        </div>
    );
};

export default ProductDetails;