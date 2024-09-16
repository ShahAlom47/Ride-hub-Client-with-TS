
import bikeImg from '../../../assets/image/bikeCard.jpg'


interface bikeDataType {
    brand: string;
    model: string;
    engine_capacity: string;
    color: string;
    year: number;
    fuel_type: string;
    rental_price_per_day: number;
    availability: boolean;
    mileage: string;
    transmission: string;
    location: string;
    insurance_included: boolean;
    number_of_seats: number;
    license_requirement: string;
    additional_features: string[];
    bike_image: string;
}

interface BikeCardProps {
    bikeData: bikeDataType;
    cardView: string;
}

const BikeCard = ({ bikeData, cardView }: BikeCardProps) => {
console.log(cardView);

    return (
        <div className={` grid gap-3  ${cardView ==='grid'?' gird-col-1':' lg:grid-cols-2 md:grid-cols-2 grid-cols-1'}`}>
            <img src={bikeImg} alt={`${bikeData.brand} ${bikeData.model}`} />
            <div>
                <h2>{bikeData.brand} {bikeData.model}</h2>
                <p>Engine Capacity: {bikeData.engine_capacity}</p>
                <p>Color: {bikeData.color}</p>
                <p>Year: {bikeData.year}</p>
                <p>Rental Price Per Day: ${bikeData.rental_price_per_day}</p>
                <p>Mileage: {bikeData.mileage}</p>
                <p>Transmission: {bikeData.transmission}</p>
            </div>
        </div>
    );
};

export default BikeCard;