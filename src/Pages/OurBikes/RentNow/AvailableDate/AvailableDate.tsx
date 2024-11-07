import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface RentalsType {
    user_email: string;
    rent_start_date: string;
    rent_end_date: string;
    status: string;
}

interface PropsType {
    rentals: RentalsType[];
}

const AvailableDate = ({ rentals }: PropsType) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const getBookedDates = () => {
        const bookedDates: Date[] = [];
        rentals.forEach(rental => {
            const currentDate = new Date(rental.rent_start_date);
            const endDate = new Date(rental.rent_end_date);

            while (currentDate <= endDate) {
                bookedDates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });
        return bookedDates;
    };

    const bookedDates = getBookedDates();

    const isBookedDate = (date: Date): string => {
        return bookedDates.some(
            bookedDate => bookedDate.toDateString() === date.toDateString()
        ) ? 'booked-date' : '';  
    };

    return (
        <div>
            <h2>Rent Your Bike</h2>
            <DatePicker
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)} 
                inline
                dayClassName={date => isBookedDate(date)} 
                filterDate={date => !isBookedDate(date)}
            />
            <style>
                {`
                    .booked-date {
                        color: red;
                        pointer-events: none;
                    }
                `}
            </style>
        </div>
    );
};


export default AvailableDate;
