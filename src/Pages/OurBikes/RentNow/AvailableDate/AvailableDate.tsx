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
    isEnd?: boolean;
    firstDate?: Date | null;
}

const AvailableDate: React.FC<PropsType> = ({ rentals, setDate, date, isEnd, firstDate }) => {


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

    const isBookedDate = (date: Date): boolean => {
        return bookedDates.some(
            bookedDate => bookedDate.toDateString() === date.toDateString()
        );
    };

    const isTodayOrAfter = (date: Date): boolean => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    };

    const isOnOrAfterFirstDate = (date: Date): boolean => {
        if (firstDate) {
            return date >= firstDate;
        }
        return true;
    };

    return (
        <div>
            <DatePicker
                selected={date}
                onChange={(date: Date | null) => setDate(date)}
                inline
                dayClassName={date => (isBookedDate(date) && !isEnd ? 'booked-date' : '')}
                filterDate={date => (
                    (isEnd 
                        ? (!isBookedDate(date) && isTodayOrAfter(date) && isOnOrAfterFirstDate(date)) // End date should be on or after today and firstDate
                        : (!isBookedDate(date) && isTodayOrAfter(date)))                             // Start date should be today or after
                )}
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
