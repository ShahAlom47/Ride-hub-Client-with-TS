import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageLoading = () => {
    const [pageLoading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 700); 

        return () => clearTimeout(timer); 
    }, [location]);

    return {pageLoading};
};

export default usePageLoading;