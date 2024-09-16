import React, { useState } from 'react';
import PageHeading from '../../SharedComponent/PageHeading/PageHeading';
import headingImg from '../../assets/Banner-Img/bike-page-banner.jpg';
import BikeFinder from './BikeFinder/BikeFinder';
import ViewOptions from './ViewOptions/ViewOptions';

const OurBikes: React.FC = () => {
    const path: string[] = ['/', '/our-bikes'];
    const pathName: string[] = ['Home', 'Our Bike'];

    const [brand, setBrand] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [engine, setEngine] = useState<string>('');

    const [cardView, setCardView] = useState<string>('grid');
    const [sortValue, setSortValue] = useState<string>('titleAse');

    console.log(cardView, sortValue);

    return (
        <div className="bg-color-p">
            <PageHeading img={headingImg} title="OUR BIKE" path={path} pathName={pathName} />
            <div className="my-5">
                <BikeFinder 
                brand={brand} setBrand={setBrand} model={model} setModel={setModel} engine={engine} setEngine={setEngine}
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
            our bikes
        </div>
    );
};

export default OurBikes;
