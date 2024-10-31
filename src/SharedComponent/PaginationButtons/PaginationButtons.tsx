

import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import './paginationBtn.css';

interface PropsType {
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}


const PaginationButtons = ({ setCurrentPage, currentPage, totalPages } : PropsType) => {


   



    return (
        <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
        
        />
    );
};

export default PaginationButtons;