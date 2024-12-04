




import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { BikeData } from "../../../../../OurBikes/BikeDataInterFace/bikeDataIterFace";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import useAxiosSecure from "../../../../../../CustomHocks/useAxiosSecure";
import Swal from "sweetalert2";

interface PropsType {
    bikeData: BikeData | null;
}
interface ResType {
    success: boolean;
    message: string;
    
}

const EditForm = ({ bikeData }: PropsType) => {
    const [features, setFeatures] = useState<string[]>(bikeData?.additional_features || []);
    const [newFeature, setNewFeature] = useState<string>("");
    const axiosSecure= useAxiosSecure()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BikeData>({
        defaultValues: { ...bikeData, additional_features: features },
    });

    const addFeature = () => {
        if (newFeature.trim() && !features.includes(newFeature)) {
            setFeatures([...features, newFeature.trim()]);
            setNewFeature("");
        }
    };

    const removeFeature = (feature: string) => {
        setFeatures(features.filter((f) => f !== feature));
    };

    const onSubmit: SubmitHandler<BikeData> = async(data) => {
        data.additional_features = features;
        console.log("Updated Bike Data:", data);
       const  updateRes = await axiosSecure.patch <ResType>(`/bikeData/editBikeData/${bikeData?._id}`,data)
      
       Swal.fire({
        title: updateRes?.data?.message,
        toast: true,
        position: 'top-right',
        timer: 2000,  
        icon: updateRes?.data?.success ? 'success' : 'error',
        showConfirmButton:false
    });


      
    };

    return (
        <div className="p-6 rounded-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit Bike Information</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Brand</label>
                    <input
                        {...register("brand", { required: "Brand is required" })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Model</label>
                    <input
                        {...register("model", { required: "Model is required" })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.model && <p className="text-red-500">{errors.model.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Engine Capacity</label>
                    <input
                        {...register("engine_capacity", { required: "Engine capacity is required" })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.engine_capacity && <p className="text-red-500">{errors.engine_capacity.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Color</label>
                    <input
                        {...register("color", { required: "Color is required" })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.color && <p className="text-red-500">{errors.color.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Fuel Type</label>
                    <input
                        {...register("fuel_type", { required: "Fuel type is required" })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.fuel_type && <p className="text-red-500">{errors.fuel_type.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Mileage</label>
                    <input
                        {...register("mileage", { required: "Mileage is required" })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.mileage && <p className="text-red-500">{errors.mileage.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Rental Price per Day</label>
                    <input
                        type="number"
                        {...register("rental_price_per_day", { required: "Rental price is required" })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.rental_price_per_day && <p className="text-red-500">{errors.rental_price_per_day.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Location</label>
                    <input
                        {...register("location", { required: "Location is required" })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.location && <p className="text-red-500">{errors.location.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium">Year</label>
                    <input
                        type="number"
                        {...register("year", { required: "Year is required" })}
                        className="w-full p-2 border rounded"
                    />
                    {errors.year && <p className="text-red-500">{errors.year.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Additional Features</label>
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

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditForm;
