import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "../../CustomHocks/useAxiosPublic";
import PageHeading from "../../SharedComponent/PageHeading/PageHeading";
import ErrorPage from "../../SharedComponent/ErrorPage/ErrorPage";
import Loading from "../../SharedComponent/Loading/Loading";
import headingImg from '../../assets/Banner-Img/bike-page-banner.jpg';
import ProductCard from "./ProductCard/ProductCard";
import PaginationButtons from "../../SharedComponent/PaginationButtons/PaginationButtons";

export interface Products {
    _id: string;
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

    // const [page, setPage] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const item: number = 6;

    const { data: products, isLoading, error } = useQuery<ProductResponse, Error>({
        queryKey: ['shopProductData', currentPage],
        queryFn: async (): Promise<ProductResponse> => {
            const res = await AxiosPublic.get(`/shopData/all-products?item=${item}&page=${currentPage}`);
            return res.data as ProductResponse;
        }
    });


const totalPages = products?.totalPage || 1

    if (isLoading) return <div className="min-h-screen flex justify-center items-center w-full"><Loading></Loading></div>;

    return (
        <div className="">
            <PageHeading img={headingImg} title="PRODUCT" path={path} pathName={pathName} />
            {
                error ? <ErrorPage></ErrorPage> :
                    <div className="bg-color-p">

                        <div className='max-w mx-auto py-10'>
                            <div className={`w-11/12 mb-9 mx-auto grid gap-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1' : 'grid-cols-1`}>
                                {
                                    products?.data.map((item, index) => (
                                            <ProductCard key={index} data={item}></ProductCard>
                                        
                                    ))
                                }
                            </div>
                            <PaginationButtons setCurrentPage={setCurrentPage} currentPage={currentPage}  totalPages={totalPages|| 1}></PaginationButtons>

                          
                        </div>

                    </div>
            }
        </div>
    );
};

export default Shop;