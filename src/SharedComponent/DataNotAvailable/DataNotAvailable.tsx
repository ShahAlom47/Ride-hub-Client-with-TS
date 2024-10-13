
import { AiOutlineWarning } from 'react-icons/ai';

const DataNotAvailable = () => {
    return (
        <div>
             <h1 className='text-xl font-bold text-center py-6 flex flex-col items-center justify-center gap-4'> <AiOutlineWarning className='text-5xl text-color-p' /><span> Data Not Available</span> </h1>
        </div>
    );
};

export default DataNotAvailable;