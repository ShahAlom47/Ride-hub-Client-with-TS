import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface RentalsType {
    user_email: string;
    rent_start_date: string;
    rent_end_date: string;
    status: string;
}

interface PropsType {
    rentals?: RentalsType[];
    setDate: (date: Date | null) => void;
    date: Date | null;
    isEnd?:boolean;
}

const AvailableDate: React.FC<PropsType> = ({ rentals, setDate, date ,isEnd}) => {

    const getBookedDates = (): Date[] => {
        const bookedDates: Date[] = [];
        rentals?.forEach(rental => {
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

    // Helper to check if a date is booked
    const isBookedDate = (date: Date): boolean => {
        return bookedDates.some(
            bookedDate => bookedDate.toDateString() === date.toDateString()
        );
    };

    return (
        <div>
            <DatePicker
                selected={date}
                onChange={(date: Date | null) => setDate(date)} // Set the date on change
                inline
                dayClassName={date => (isBookedDate(date) && !isEnd? 'booked-date' : '')} // Apply CSS class to booked dates
                filterDate={date => isEnd || !isBookedDate(date)}
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
