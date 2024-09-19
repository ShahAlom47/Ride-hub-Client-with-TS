import React, { useState } from 'react';
import PageHeading from '../../SharedComponent/PageHeading/PageHeading';
import headingImg from '../../assets/Banner-Img/bike-page-banner.jpg';
import BikeFinder from './BikeFinder/BikeFinder';
import ViewOptions from './ViewOptions/ViewOptions';
import BikeCard from './BikeCard/BikeCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../CustomHocks/useAxiosPublic';
import { BikeData } from './BikeDataInterFace/bikeDataIterFace';
import { GrNext } from "react-icons/gr";

interface BikeResponse {
    data: BikeData[];
    totalPage: number;
    totalAvailableBike: number;
    currentPage: number;
}

const OurBikes: React.FC = () => {
    const path: string[] = ['/', '/our-bikes'];
    const pathName: string[] = ['Home', 'Our Bike'];

    const [brand, setBrand] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [engine, setEngine] = useState<string>('');

    const [cardView, setCardView] = useState<string>('grid');
    const [sortValue, setSortValue] = useState<string>('titleAse');

    const AxiosPublic = useAxiosPublic();

    const [page, setPage] = useState<number>(2);
    const item: number = 6;

    const { data: bikesData, isLoading, error } = useQuery<BikeResponse, Error>({
        queryKey: ['allBikeData', page],
        queryFn: async (): Promise<BikeResponse> => {
            const res = await AxiosPublic.get(`/bikeData/all-bikeData?item=${item}&page=${page}`);
            return res.data as BikeResponse;
        }
    });

    console.log(bikesData);

    const handleSearch = () => {
        console.log(cardView, sortValue, brand, model, engine);
    }

    console.log(page);


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching bike data</div>;

    return (
        <div className="bg-color-p">
            <PageHeading img={headingImg} title="OUR BIKE" path={path} pathName={pathName} />

            <div className="my-5">
                <BikeFinder
                    brand={brand}
                    setBrand={setBrand}
                    model={model}
                    setModel={setModel}
                    engine={engine}
                    setEngine={setEngine}
                    handleSearch={handleSearch}
                />
            </div>

            <div className="sortSection max-w">
                <ViewOptions
                    cardView={cardView}
                    setCardView={setCardView}
                    sortValue={sortValue}
                    setSortValue={setSortValue}
                />
            </div>

            <div className='max-w mx-auto'>
                <div className={`w-11/12 mx-auto grid gap-4 ${cardView === 'grid' ? 'lg:grid-cols-3 md:grid-cols-2 grid-cols-1' : 'grid-cols-1'}`}>
                    {
                        bikesData?.data?.map((bike, index) => (
                            <div className='mx-auto' key={index}>
                                <BikeCard bikeData={bike} cardView={cardView} />
                            </div>
                        ))
                    }
                </div>
                <div className="pagination   flex justify-center items-center gap-3 py-6 ">
                    {Array.from({ length: bikesData?.totalPage || 0 }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => setPage(index + 1)}
                            className={`page-button p-2 px-3 font-bold bg-gray-600  text-white ${bikesData?.currentPage === index + 1 ? 'btn-p' : 'hover:bg-gray-700'}`}
                        >
                            {index + 1}
                        </button>

                    ))}
                    <button
                   
                        key={'next button'}
                        onClick={() => {
                            if ((bikesData?.currentPage || 0) < (bikesData?.totalPage || 0)) {
                                setPage((prevPage) => prevPage + 1);
                            }
                        }}
                        className={`flex items-center page-button p-3 font-bold bg-gray-600 hover:bg-gray-700 text-white ${(bikesData?.currentPage || 0) >= (bikesData?.totalPage || 0) ?'hidden ':''}`}
                    >
                        <GrNext /> <GrNext />
                    </button>


                </div>
            </div>
        </div>
    );
};

export default OurBikes;
