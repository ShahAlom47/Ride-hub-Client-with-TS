import React, { useState } from 'react';
import PageHeading from '../../SharedComponent/PageHeading/PageHeading';
import headingImg from '../../assets/Banner-Img/bike-page-banner.jpg';
import BikeFinder from './BikeFinder/BikeFinder';
import ViewOptions from './ViewOptions/ViewOptions';
// import { bikes } from './bikeData'
import BikeCard from './BikeCard/BikeCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../CustomHocks/useAxiosPublic';

const OurBikes: React.FC = () => {
    const path: string[] = ['/', '/our-bikes'];
    const pathName: string[] = ['Home', 'Our Bike'];

    const [brand, setBrand] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [engine, setEngine] = useState<string>('');

    const [cardView, setCardView] = useState<string>('grid');
    const [sortValue, setSortValue] = useState<string>('titleAse');

    const  AxiosPublic=useAxiosPublic()


    const {data: bikes, error, isLoading }=useQuery({
        queryKey:['allBikeData'],
        queryFn:async()=>{
            const res= await AxiosPublic.get('/bikeData/all-bikeData')
            return res.data
        }
    })

    console.log(bikes);

    const handleSearch = () => {

        console.log(cardView, sortValue, brand, model, engine);
    }


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

            <div className=' max-w mx-auto '>
                <div className={` w-11/12 mx-auto grid gap-4 ${cardView === 'grid' ? ' lg:grid-cols-3 md:grid-cols-2 grid-cols-1  ' : ' grid-cols-1'}`}>
                    {
                        bikes?.map((bike, index) => <div className=' mx-auto' key={index}>

                            <BikeCard bikeData={bike} cardView={cardView} ></BikeCard>
                        </div>)
                    }
                </div>
            </div>

        </div>
    );
};

export default OurBikes;
