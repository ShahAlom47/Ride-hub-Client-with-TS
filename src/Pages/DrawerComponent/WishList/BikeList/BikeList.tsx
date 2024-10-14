
import { useState } from "react";
import useHandelWishList from "../../../../CustomHocks/useHandelWishList";
import useWishListFetch from "../../../../CustomHocks/useWishListFetch";
import ErrorPage from "../../../../SharedComponent/ErrorPage/ErrorPage";
import Loading from "../../../../SharedComponent/Loading/Loading";
import img from '../../../../assets/image/bikeCard.jpg'
import DataNotAvailable from "../../../../SharedComponent/DataNotAvailable/DataNotAvailable";




const BikeList = () => {

    const { getBikeWishList,removeItemFromWishList } = useHandelWishList();
    const bikeIds = getBikeWishList();
    const { bikeData } = useWishListFetch('bike', bikeIds);
    const [reload,setReload]=useState(false)

   


    const handelRemove =( id:string)=>{
        removeItemFromWishList('bikeWishList',id)
        bikeData.refetch()
        setReload(!reload)

    }

    if(bikeIds.length===0) return <DataNotAvailable/>
    if (bikeData.isLoading) return <Loading />;
    if (bikeData.error) return <ErrorPage />;

    return (
        <div className=" my-5">


            {
                bikeData?.data?.map((bike) => <div
                    className=" grid gap-4 grid-cols-12 mb-3 shadow-sm shadow-white p-3 group hover:bg-stone-950 "
                    key={bike?._id}>
                    <div className="col-span-3  flex justify-center items-center">
                        <img className=" w-full group-hover:w-[95%] transition-all ease-in-out duration-300" src={img} alt="bike Photo " />
                    </div>
                    <div className=" col-span-6">
                        <h1 className=" text-xl font-semibold text-white">{bike?.brand} {bike?.model}</h1>

                        <div className=" flex justify-between pr-2">
                            <p className="text-green-600 ">  {bike?.availability ? 'Available' : 'Not Available'}</p>
                            <p className="text-xl font-bold font-pFont  text-color-s"> $ {bike?.rental_price_per_day}</p>
                        </div>

                    </div>
                  
                    <div className=" col-span-3 space-y-2 items-end flex flex-col  justify-end">
                        <button className=" text-xs btn-p p-2 w-full"> Rent Now</button>
                        <button  onClick={()=>handelRemove(bike?._id)} className=" text-xs btn-s w-full text-black"> Remove</button>
                    </div>


                </div>)
            }
        </div>
    );
};

export default BikeList;

// const bikes = [
//     {
//         _id: "66eaf17f07c0b8e4344b98f1",
//         brand: "Honda",
//         model: "CBR300R",
//         year: 2022,
//         color: "White",
//         engine_capacity: "300cc",
//         mileage: "38 kmpl",
//         fuel_type: "Petrol",
//         transmission: "Manual",
//         additional_features: ["ABS", "Sporty Design"],
//         description: "The Honda CBR300R combines sporty design with a powerful engine, perfect for enthusiasts and daily riders.",
//         rental_price_per_day: 65,
//         availability: true,
//         location: "Abu Dhabi, UAE",
//         front_brake_type: "Disc",
//         rear_brake_type: "Disc",
//         front_brake_diameter_in_mm: "Ø296 mm",
//         number_of_seats: 2,
//         insurance_included: true,
//         license_requirement: "Motorcycle License",
//         total_view: 1106,
//         review: [
//             {
//                 name: 'Sophia Brown',
//                 email: 'sophia@example.com',
//                 userPhotoUrl: 'https://example.com/images/users/sophia.jpg',
//                 comment: 'Great power and handling. Ideal for both city and highway riding.',
//                 rating: 5
//             }
//         ],
//         bike_image: ""
//     },
//     {
//         _id: "66eaf17f07c0b8e4344b98f2", // Different ID for uniqueness
//         brand: "Honda",
//         model: "CBR300R",
//         year: 2022,
//         color: "Black",
//         engine_capacity: "300cc",
//         mileage: "38 kmpl",
//         fuel_type: "Petrol",
//         transmission: "Manual",
//         additional_features: ["ABS", "Sporty Design"],
//         description: "The Honda CBR300R is known for its agility and sleek design, perfect for any rider.",
//         rental_price_per_day: 70,
//         availability: true,
//         location: "Abu Dhabi, UAE",
//         front_brake_type: "Disc",
//         rear_brake_type: "Disc",
//         front_brake_diameter_in_mm: "Ø296 mm",
//         number_of_seats: 2,
//         insurance_included: true,
//         license_requirement: "Motorcycle License",
//         total_view: 1500,
//         review: [
//             {
//                 name: 'John Doe',
//                 email: 'john@example.com',
//                 userPhotoUrl: 'https://example.com/images/users/john.jpg',
//                 comment: 'Amazing bike, very smooth ride.',
//                 rating: 4
//             }
//         ],
//         bike_image: ""
//     },
//     {
//         _id: "66eaf17f07c0b8e4344b98f3", // Another unique ID
//         brand: "Honda",
//         model: "CBR300R",
//         year: 2022,
//         color: "Red",
//         engine_capacity: "300cc",
//         mileage: "38 kmpl",
//         fuel_type: "Petrol",
//         transmission: "Manual",
//         additional_features: ["ABS", "Sporty Design"],
//         description: "Experience the thrill of riding with the Honda CBR300R, designed for performance.",
//         rental_price_per_day: 75,
//         availability: true,
//         location: "Abu Dhabi, UAE",
//         front_brake_type: "Disc",
//         rear_brake_type: "Disc",
//         front_brake_diameter_in_mm: "Ø296 mm",
//         number_of_seats: 2,
//         insurance_included: true,
//         license_requirement: "Motorcycle License",
//         total_view: 900,
//         review: [
//             {
//                 name: 'Alice Smith',
//                 email: 'alice@example.com',
//                 userPhotoUrl: 'https://example.com/images/users/alice.jpg',
//                 comment: 'This bike is fantastic for both city commutes and weekend rides!',
//                 rating: 5
//             }
//         ],
//         bike_image: ""
//     }
// ];
