import React, { useState } from 'react';
import PageHeading from '../../SharedComponent/PageHeading/PageHeading';
import headingImg from '../../assets/Banner-Img/bike-page-banner.jpg';
import BikeFinder from './BikeFinder/BikeFinder';
import ViewOptions from './ViewOptions/ViewOptions';
import BikeCard from './BikeCard/BikeCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../CustomHocks/useAxiosPublic';
import { BikeData } from './BikeDataInterFace/bikeDataIterFace';
import Loading from '../../SharedComponent/Loading/Loading';
import ErrorPage from '../../SharedComponent/ErrorPage/ErrorPage';
import PaginationButtons from '../../SharedComponent/PaginationButtons/PaginationButtons';
import { Helmet } from 'react-helmet-async';

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
    const [searchValue, setSearchValue] = useState<string>('')

    const [cardView, setCardView] = useState<string>('grid');
    const [sortValue, setSortValue] = useState<string>('titleAse');

    const AxiosPublic = useAxiosPublic();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const item: number = 6;

    const { data: bikesData, isLoading, error, refetch } = useQuery<BikeResponse, Error>({
        queryKey: ['allBikeData', currentPage, sortValue, searchValue],
        queryFn: async (): Promise<BikeResponse> => {
            const res = await AxiosPublic.get(`/bikeData/all-bikeData?item=${item}&page=${currentPage}&brand=${brand}&model=${model}&engine=${engine}&sortValue=${sortValue}&searchValue=${searchValue}`);
            return res.data as BikeResponse;
        }
    });

    const totalPages = bikesData?.totalPage || 1

    const handleFine = () => {
        setCurrentPage(1)
        refetch()
    }
    const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const value: string = e.currentTarget.search.value;
        const trimmedValue: string = value.trim();
        setSearchValue(trimmedValue);
    };



    if (isLoading) return <div className="min-h-screen flex justify-center items-center w-full"><Loading></Loading></div>;

    return (
        <div className=" ">
            <Helmet>
                <title>Our Bike || Ride Hub</title>
            </Helmet>
            
            <PageHeading img={headingImg} title="OUR BIKE" path={path} pathName={pathName} />
            {
                error ? <ErrorPage></ErrorPage> :
                    <div className="bg-color-p">

                        <div className="py-5 ">
                            <BikeFinder
                                brand={brand}
                                setBrand={setBrand}
                                model={model}
                                setModel={setModel}
                                engine={engine}
                                setEngine={setEngine}
                                handleSearch={handleSearch}
                                handleFine={handleFine}
                            />
                        </div>

                        <div className="sortSection  w-full">
                            <ViewOptions
                                cardView={cardView}
                                setCardView={setCardView}
                                sortValue={sortValue}
                                setSortValue={setSortValue}
                                totalAvailableBike={bikesData?.totalAvailableBike || 0}

                            />
                        </div>

                        <div className='max-w mx-auto py-10'>
                            <div className={` mb-9 w-11/12 mx-auto grid gap-4 ${cardView === 'grid' ? 'lg:grid-cols-3 md:grid-cols-2 grid-cols-1' : 'grid-cols-1'}`}>
                                {
                                    bikesData?.data?.map((bike, index) => (
                                            <BikeCard key={index} bikeData={bike} cardView={cardView} />
                                    ))
                                }
                            </div>
                           
                            <PaginationButtons setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages || 1}></PaginationButtons>
                        </div>
                    </div>
            }
        </div>
    );
};

export default OurBikes;
