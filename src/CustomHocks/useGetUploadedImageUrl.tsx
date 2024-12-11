import { useState } from 'react';
import useAxiosPublic from './useAxiosPublic';

const useGetUploadedImageUrl = () => {
    const BACKEND_UPLOAD_URL = `/upload`; // Replace with your backend upload endpoint if not `/upload`

    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    const AxiosPublic = useAxiosPublic();

    // File upload function
    const uploadImage = async (file: File | null, folderName: string): Promise<string | null> => {

        // folderName= ''Bike Photos''

        if (!file || null) {
            throw new Error('No file selected');
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file); // Attach the file in form-data
        formData.append('folderName', folderName); // Attach the folder name in form-data

        try {
            // Make a POST request to your backend
            const res = await AxiosPublic.post<{ url: string }>(BACKEND_UPLOAD_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return res.data.url; // Return the uploaded image URL
        } catch (err) {
            console.error('Image upload error:', err);
            setError('Failed to upload image');
            throw new Error('Failed to upload image'); // Rethrow the error for the caller
        } finally {
            setLoading(false);
        }
    };

    return { uploadImage, loading, error };
};

export default useGetUploadedImageUrl;
