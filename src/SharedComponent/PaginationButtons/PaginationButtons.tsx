
import { GrNext, GrPrevious } from 'react-icons/gr';
import 'react-responsive-pagination/themes/classic.css';
import './paginationBtn.css';

interface PropsType {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

const PaginationButtons = ({ setCurrentPage, currentPage, totalPages }:PropsType) => {
    return (
        <div className=" flex justify-center w-full  items-center gap-3 ">
            {/* Prev Button */}
            {currentPage > 1 && (
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="flex items-center rounded-sm page-button p-3 font-bold bg-gray-600 hover:bg-gray-700 text-white"
                >
                    <GrPrevious />
                </button>
            )}

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={` p-2 px-3 font-bold rounded-sm text-white ${
                        currentPage === index + 1 ? 'bg-color-s ' :  'bg-gray-600 hover:bg-gray-700'
                    }`}
                >
                    {index + 1}
                </button>
            ))}

            {/* Next Button */}
            {currentPage < totalPages && (
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="flex items-center rounded-sm page-button p-3 font-bold bg-gray-600 hover:bg-gray-700 text-white"
                >
                    <GrNext />
                </button>
            )}
        </div>
    );
};

export default PaginationButtons;
