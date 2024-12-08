import { useState } from "react";
import { useForm, SubmitHandler, } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

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

const AddBikeForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [features, setFeatures] = useState<string[]>([]);
    const [newFeature, setNewFeature] = useState<string>("");

    const addFeature = () => {
        if (newFeature.trim() && !features.includes(newFeature)) {
            setFeatures([...features, newFeature.trim()]);
            setNewFeature("");
        }
    };
    const removeFeature = (feature: string) => {
        setFeatures(features.filter((f) => f !== feature));
    };



    const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
        console.log(data);  // ফর্ম ডেটা প্রসেস করবেন
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4  text-white  rounded-md">
            <h2 className="text-xl font-bold mb-4">Add Bike Form</h2>

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

            <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Add Bike
            </button>
        </form>
    );
};

export default AddBikeForm;
