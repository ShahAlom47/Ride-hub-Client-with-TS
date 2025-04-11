import { useState } from "react";
import { useForm, SubmitHandler, } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import { useDropzone, Accept } from 'react-dropzone';
import useGetUploadedImageUrl from "../../../../../../CustomHocks/useGetUploadedImageUrl";
import useAxiosSecure from "../../../../../../CustomHocks/useAxiosSecure";
import { TailSpin } from 'react-loader-spinner'
import Swal from "sweetalert2";



interface FormData {
    brand: string;
    model: string;
    engine_capacity: string;
    color: string;
    year: number;
    fuel_type: string;
    rental_price_per_day: number;
    availability: boolean;
    mileage: string;
    transmission: string;
    location: string;
    insurance_included: boolean;
    number_of_seats: number;
    front_brake_type: string;
    front_brake_diameter: number;
    rear_brake_type: string;
    rear_brake_diameter: number;
}

interface PropsType {

    success: boolean;
    message: string
}

const AddBikeForm = () => {
    const { register, handleSubmit,reset, formState: { errors } } = useForm<FormData>();

    const [features, setFeatures] = useState<string[]>([]);
    const [newFeature, setNewFeature] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imgFile, setImgFile] = useState<File | null>(null);
    const axiosSecure = useAxiosSecure();

    const { uploadImage, loading } = useGetUploadedImageUrl();

    const addFeature = () => {
        if (newFeature.trim() && !features.includes(newFeature)) {
            setFeatures([...features, newFeature.trim()]);
            setNewFeature("");
        }
    };

    const removeFeature = (feature: string) => {
        setFeatures(features.filter((f) => f !== feature));
    };



    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        console.log(data);
        const imageUpRes = await uploadImage(imgFile, 'Bike Photos')

        if (imageUpRes) {

            const bikeData = { ...data, bike_image: imageUpRes }
            const addRes = await axiosSecure.post<PropsType>('/bikeData/addBike', bikeData)
            Swal.fire({
                toast: true,
                icon: addRes?.data.success ? 'success' : 'error',
                title: addRes?.data.message,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            if(addRes?.data.success){
                reset()
                setImagePreview(null)
                setFeatures([])

            }


        }


    };




    // TypeScript types for useDropzone
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*' as unknown as Accept,  // Type casting to Accept type
        onDrop: (acceptedFiles: File[]) => {

            // Convert the selected file to a URL for preview

            console.log(acceptedFiles);
            const file = acceptedFiles[0];
            setImgFile(file)
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        },
    });


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4   text-white  rounded-md">
            <h2 className="text-xl font-bold mb-4">Add Bike Form</h2>

            <div className="image-upload-container  grid grid-cols-2  items-center justify-center  gap-0  p-3 pl-0" style={{ textAlign: 'center' }}>

                <div className=" relative bb rounded-md p-3 flex justify-center items-center lg:col-span-1 md:col-span-1 col-span-2 ">
                    {imagePreview ?
                        <div className="   w-full h-60 overflow-hidden" style={{ marginTop: '20px' }}>
                            <h3 className=" mb-2">Image Preview:</h3>
                            <img src={imagePreview} alt="Preview" />
                        </div> :
                        <div className="  w-full h-60 overflow-hidden" style={{ marginTop: '20px' }}>
                            <h3 className=" text-xl"> Select Photo</h3>
                        </div>

                    }

                    <div className=" cursor-pointer    absolute top-1/2 inset-x-0 mx-3 bg-gray-500 bg-opacity-50  rounded-lg p-2 text-black " {...getRootProps()} >
                        <input {...getInputProps()} />
                        <p>Drag & Drop an image here, or click to select a file</p>
                    </div>

                </div>


            </div>




            <div className=" flex gap-3 ">
                <div className="mb-4 w-full">
                    <label className="block font-medium mb-1">Brand</label>
                    <input
                        type="text"
                        {...register("brand", { required: "Brand is required" })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
                </div>

                <div className="mb-4 w-full">
                    <label className="block font-medium mb-1">Model</label>
                    <input
                        type="text"
                        {...register("model", { required: "Model is required" })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.model && <p className="text-red-500 text-sm">{errors.model.message}</p>}
                </div>
            </div>

            <div className="flex gap-3">
                <div className="mb-4 w-full">
                    <label className="block font-medium mb-1">Engine Capacity</label>
                    <input
                        type="text"
                        {...register("engine_capacity", { required: "Engine Capacity is required" })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.engine_capacity && <p className="text-red-500 text-sm">{errors.engine_capacity.message}</p>}
                </div>

                <div className="mb-4 w-full">
                    <label className="block font-medium mb-1">Color</label>
                    <input
                        type="text"
                        {...register("color", { required: "Color is required" })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.color && <p className="text-red-500 text-sm">{errors.color.message}</p>}
                </div>
            </div>

            <div className="flex gap-3">
                <div className="mb-4 w-full">
                    <label className="block font-medium mb-1">Year</label>
                    <input
                        type="number"
                        {...register("year", { required: "Year is required" })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
                </div>

                <div className="mb-4 w-full">
                    <label className="block font-medium mb-1">Fuel Type</label>
                    <input
                        type="text"
                        {...register("fuel_type", { required: "Fuel Type is required" })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.fuel_type && <p className="text-red-500 text-sm">{errors.fuel_type.message}</p>}
                </div>
            </div>

            <div className="flex gap-3">
                <div className="mb-4 w-full">
                    <label className="block font-medium mb-1">Rental Price Per Day</label>
                    <input
                        type="number"
                        {...register("rental_price_per_day", { required: "Rental Price is required" })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.rental_price_per_day && <p className="text-red-500 text-sm">{errors.rental_price_per_day.message}</p>}
                </div>

                <div className="mb-4 w-full">
                    <label className="block font-medium mb-1">Availability</label>
                    <select
                        {...register("availability", { required: "Availability is required" })}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value={"true"}>Available</option>
                        <option value={"false"}>Not Available</option>
                    </select>
                    {errors.availability && <p className="text-red-500 text-sm">{errors.availability.message}</p>}
                </div>
            </div>

            <div className="flex gap-3">
                <div className="mb-4 w-full">
                    <label className="block font-medium mb-1">Mileage</label>
                    <input
                        type="text"
                        {...register("mileage", { required: "Mileage is required" })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.mileage && <p className="text-red-500 text-sm">{errors.mileage.message}</p>}
                </div>

                <div className="mb-4 w-full">
                    <label className="block font-medium mb-1">Transmission</label>
                    <input
                        type="text"
                        {...register("transmission", { required: "Transmission is required" })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.transmission && <p className="text-red-500 text-sm">{errors.transmission.message}</p>}
                </div>
            </div>

            <div className="flex gap-3">
                <div className="mb-4 w-full">
                    <label className="block font-medium mb-1">Location</label>
                    <input
                        type="text"
                        {...register("location", { required: "Location is required" })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                </div>

                <div className="mb-4 w-full">
                    <label className="block font-medium mb-1">Insurance Included</label>
                    <select
                        {...register("insurance_included", { required: "Insurance is required" })}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value={"true"}>Yes</option>
                        <option value={"false"}>No</option>
                    </select>
                    {errors.insurance_included && <p className="text-red-500 text-sm">{errors.insurance_included.message}</p>}
                </div>
            </div>

            <div className=" flex gap-3 ">
                <div className="mb-4 w-full">
                    <label className="block font-medium mb-1">Number of Seats</label>
                    <input
                        type="number"
                        {...register("number_of_seats", { required: "Number of Seats is required" })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.number_of_seats && <p className="text-red-500 text-sm">{errors.number_of_seats.message}</p>}
                </div>

                <div className="mb-4 w-full">
                    <label className="block font-medium mb-1">Front Brake Type</label>
                    <input
                        type="text"
                        {...register("front_brake_type", { required: "Front Brake Type is required" })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.front_brake_type && <p className="text-red-500 text-sm">{errors.front_brake_type.message}</p>}
                </div>

            </div>

            <div className="flex gap-3">
                <div className="mb-4 w-full">
                    <label className="block font-medium mb-1">Front Brake Diameter (in)</label>
                    <input
                        type="number"
                        {...register("front_brake_diameter", { required: "Brake Diameter is required" })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.front_brake_diameter && <p className="text-red-500 text-sm">{errors.front_brake_diameter.message}</p>}
                </div>

                <div className="mb-4 w-full">
                    <label className="block font-medium mb-1">Rear Brake Type</label>
                    <input
                        type="text"
                        {...register("rear_brake_type", { required: "Rear Brake Type is required" })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.rear_brake_type && <p className="text-red-500 text-sm">{errors.rear_brake_type.message}</p>}
                </div>
            </div>

            <div className="flex gap-3">
                <div className="mb-4 w-full">
                    <label className="block font-medium mb-1">Rear Brake Diameter (in)</label>
                    <input
                        type="number"
                        {...register("rear_brake_diameter", { required: "Rear Brake Diameter is required" })}
                        className="w-full px-3 py-2 border rounded"
                    />
                    {errors.rear_brake_diameter && <p className="text-red-500 text-sm">{errors.rear_brake_diameter.message}</p>}
                </div>

                <div className=" mb-4 w-full ">
                    <label className="block font-medium mb-1">Additional Features</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                            placeholder="Add a feature"
                            className="p-2 border rounded w-full"
                        />
                        <button
                            type="button"
                            onClick={addFeature}
                            className="bg-green-600 text-white px-2 py-1 text-2xl font-bold rounded hover:bg-green-700"
                        ><IoAddCircleOutline /> </button>
                    </div>

                    <ul className="mt-2 space-y-1 flex  flex-wrap gap-2">
                        {features.map((feature, index) => (
                            <li
                                key={index}
                                className="flex gap-2 justify-between items-center border p-1 rounded "
                            >
                                {feature}
                                <button
                                    type="button"
                                    onClick={() => removeFeature(feature)}
                                    className="text-red-500 hover:text-red-700"
                                ><MdOutlineCancel />  </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {
                loading ?
                    <button type="button"  className="  btn-sm bg-color-s w-full flex justify-center">
                        <TailSpin
                            visible={true}
                            height="20"
                            width="20"
                            color="#fff"
                            ariaLabel="tail-spin-loading"
                            radius="3"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </button> :
                    <button type="submit" className="  btn-sm bg-color-s w-full hover:bg-red-800">Add Bike</button>
            }
        </form>
    );
};

export default AddBikeForm;
