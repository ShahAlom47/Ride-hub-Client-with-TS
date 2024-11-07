import { useParams } from "react-router-dom";
import AvailableDate from "./AvailableDate/AvailableDate";






const RentNow = () => {
    const {id}=useParams()

    const rentals = [
        {
            user_email: "user1@example.com",
            rent_start_date: "2024-11-05",
            rent_end_date: "2024-11-08",
            status: "Booked"
        },
        {
            user_email: "user2@example.com",
            rent_start_date: "2024-11-12",
            rent_end_date: "2024-11-15",
            status: "Booked"
        }
    ];


    return (

        <div>
            <AvailableDate rentals={rentals} ></AvailableDate>


        </div>
    )
    
};

export default RentNow;


