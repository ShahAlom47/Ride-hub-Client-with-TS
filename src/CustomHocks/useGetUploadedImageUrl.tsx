import { useState } from 'react';
import useAxiosPublic from './useAxiosPublic';

interface UploadedImageResponse {
    url: string;
}

const useGetUploadedImageUrl = () => {
    const BACKEND_UPLOAD_URL = `/upload`; // Replace with your backend upload endpoint if not `/upload`

    const [imageUrl, setImageUrl] = useState<string | null>(null); // Uploaded image URL
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    const AxiosPublic = useAxiosPublic();

    // File upload function
    const uploadImage = async (file: File, folderName: string) => {
        if (!file) {
            setError('No file selected');
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file); // Attach the file in form-data
        formData.append('folderName', folderName); // Attach the folder name in form-data

        try {
            // Make a POST request to your backend
            const res = await AxiosPublic.post<UploadedImageResponse>(BACKEND_UPLOAD_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setImageUrl(res.data.url);
          

        } catch (err) {
            console.error('Image upload error:', err);
            setError('Failed to upload image');
        } finally {
            setLoading(false);
        }
    };

    return { uploadImage, imageUrl, loading, error };
};

export default useGetUploadedImageUrl;
