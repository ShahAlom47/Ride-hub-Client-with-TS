import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "../../CustomHocks/useAxiosPublic";
import PageHeading from "../../SharedComponent/PageHeading/PageHeading";
import ErrorPage from "../../SharedComponent/ErrorPage/ErrorPage";
import Loading from "../../SharedComponent/Loading/Loading";
import headingImg from '../../assets/Banner-Img/bike-page-banner.jpg';
import { GrNext } from "react-icons/gr";
import ProductCard from "./ProductCard/ProductCard";

 export interface Products {
    name: string;
    category: string;
    brand: string;
    price: number;
    stock: number;
    rating: number;
    reviews: number;
    description: string;
    img: string;
    color: string;
    size: string[] | string;
    material: string;
  }
  

interface ProductResponse {
    data: Products[];
    totalPage: number;
    currentPage: number;
}
const Shop = () => {

    const path: string[] = ['/', '/shop'];
    const pathName: string[] = ['Home', 'Shop'];



    const AxiosPublic = useAxiosPublic();

    const [page, setPage] = useState<number>(1);
    const item: number = 6;

    const { data:products, isLoading, error } = useQuery<ProductResponse, Error>({
        queryKey: ['shopProductData', page],
        queryFn: async (): Promise<ProductResponse> => {
            const res = await AxiosPublic.get(`/shopData/all-products?item=${item}&page=${page}`);
            return res.data as ProductResponse;
        }
    });
    
    console.log(products);


    if (isLoading) return <Loading></Loading>;
    if (error) return <ErrorPage></ErrorPage>;

    return (
        <div className="bg-color-p">
            <PageHeading img={headingImg} title="PRODUCT" path={path} pathName={pathName} />
            <div className='max-w mx-auto'>
                <div className={`w-11/12 mx-auto grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1' : 'grid-cols-1`}>
                    {
                        products?.data.map((item, index) => (
                            <div className='mx-auto mt-5' key={index}>
                                 <ProductCard data={item}></ProductCard>
                            </div>
                        ))
                    }
                </div>
                <div className="pagination   flex justify-center items-center gap-3 py-6 ">
                    {Array.from({ length: products?.totalPage || 0 }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setPage(index + 1)}
                            className={`page-button p-2 px-3 font-bold bg-gray-600  text-white ${products?.currentPage === index + 1 ? 'btn-p' : 'hover:bg-gray-700'}`}
                        >
                            {index + 1}
                        </button>

                    ))}
                    <button
                   
                        key={'next button'}
                        onClick={() => {
                            if ((products?.currentPage || 0) < (products?.totalPage || 0)) {
                                setPage((prevPage) => prevPage + 1);
                            }
                        }}
                        className={`flex items-center page-button p-3 font-bold bg-gray-600 hover:bg-gray-700 text-white ${(products?.currentPage || 0) >= (products?.totalPage || 0) ?'hidden ':''}`}
                    >
                        <GrNext /> <GrNext />
                    </button>


                </div>
            </div>
            
        </div>
    );
};

export default Shop;