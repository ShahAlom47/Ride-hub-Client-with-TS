import { Link } from "react-router-dom";
import ProductCard from "../../Shop/ProductCard/ProductCard";
import { TbArrowUpRight } from "react-icons/tb";
import ErrorPage from "../../../SharedComponent/ErrorPage/ErrorPage";
import Loading from "../../../SharedComponent/Loading/Loading";
import { Products } from "../../Shop/Shop";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../CustomHocks/useAxiosPublic";


interface  ProductRes {

    data:Products[]
}

const ShopOnline = () => {
    const AxiosPublic = useAxiosPublic();

    const { data, isLoading, error } = useQuery<ProductRes, Error>({
        queryKey: ['onlineProduct'],
        queryFn: async (): Promise<ProductRes> => {
            const res = await AxiosPublic.get(`/shopData/onlineProduct`);
            return res as ProductRes;
        }
    });

console.log(data);

    if (isLoading) return <Loading></Loading>;
    if (error) return <ErrorPage></ErrorPage>;
    return (
        <div className=" max-w p-4 py-10 ">
            <div className="header flex justify-between items-end my-4 p-2">
                <div className=" text-white space-y-3 uppercase">
                    <p className=" bg-color-s px-3 py-1 inline  ">Shop Online</p>
                    <h1 className="text-4xl font-bold font-pFont "> Our Products</h1>
                </div>
                <Link to={'/shop'}>
                    <button className=" flex items-center gap-1 transition-all duration-300 border-opacity-0 hover:border-opacity-100 ease-in-out   border-b-2 border-color-s group font-semibold">
                        VIEW OUR PRODUCT 
                        <span className=" group-hover:text-color-s" >
                            <TbArrowUpRight />
                        </span>
                    </button>
                </Link>

            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2  grid-cols-1 gap-4 p-2">
             
                    {
                        data?.data?.map((product) => (
                            <ProductCard data={product}></ProductCard>
                        ))
                    }
              
            </div>
        </div>
    );
};

export default ShopOnline;