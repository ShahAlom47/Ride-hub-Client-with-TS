import { useEffect, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import useGetUploadedImageUrl from "../../CustomHocks/useGetUploadedImageUrl";
import { TailSpin } from "react-loader-spinner";
import { CiCircleCheck } from "react-icons/ci";

interface PropsType {
    setImgUrl: (url: string) => void
    previousImg?:string;
    photoFolder?: string;
}

const UploadPhoto = ({ setImgUrl, previousImg , photoFolder }: PropsType) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const { uploadImage, loading } = useGetUploadedImageUrl()


    useEffect(()=>{
        setImagePreview(previousImg||null)
        if(previousImg){
            setImgUrl(previousImg)
        }
    },[previousImg])


    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*' as unknown as Accept,  // Type casting to Accept type
        onDrop: async (acceptedFiles: File[]) => {

            // Convert the selected file to a URL for preview


            const file = acceptedFiles[0];
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);

            const url = await uploadImage(file, photoFolder ||'Product Photos');
            console.log(url);
            if (url && loading === false) {
                setImgUrl(url)
                return
            }
            setImagePreview(null)
        },
    });


    return (
        <div className=" relative border border-white  rounded-md p-3 flex justify-center items-center  ">
            {imagePreview ?
                <div className="   w-full h-60 overflow-hidden" style={{ marginTop: '10px' }}>
                    <h3 className=" mb-2 flex justify-between border-b-2 pb-2">Image Preview:

                        <div className="">
                            {
                                loading ? <TailSpin
                                    visible={true}
                                    height="20"
                                    width="20"
                                    color="#fff"
                                    ariaLabel="tail-spin-loading"
                                    radius="3"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                /> :
                                    (imagePreview != null && <CiCircleCheck className=" text-4xl text-white" />)

                            }

                        </div>
                    </h3>
                    <img src={imagePreview} alt="Preview" />
                </div> :
                <div className="  w-full h-60 overflow-hidden" style={{ marginTop: '10px' }}>
                    <h3 className=" text-xl border-b-2 pb-2"> Select Photo</h3>
                </div>

            }


            <div className="  cursor-pointer  border border-white absolute top-1/2  bg-gray-500 bg-opacity-50  rounded-full  m-2 p-3 text-white text-center " {...getRootProps()} >
                <input {...getInputProps()} />
                <p>Drag & Drop an image here, or click to select a file</p>
            </div>

        </div>
    );
};

export default UploadPhoto;