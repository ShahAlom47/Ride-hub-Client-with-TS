import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { MdOutlineCancel } from "react-icons/md";
import { Products } from "../../../../Shop/Shop";

export type ProductFormValues = {
    name: string;
    brand: string;
    category: string;
    color: string;
    description: string;
    img: string;
    material: string;
    price: number;
    rating: number;
    reviews: number;
    size: string[];
    stock: number;
};

interface PropsType {
    formHandel: (data: ProductFormValues) => void;
    productData: Products | null;
}

const ProductForm = ({ formHandel, productData }: PropsType) => {
    const [size, setSize] = useState<string[]>([]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProductFormValues>();

console.log(productData);

    // Set initial form values based on `productData`
    useEffect(() => {
        if (productData) {
            reset({
                name: productData.name || "",
                brand: productData.brand || "",
                category: productData.category || "",
                color: productData.color || "",
                description: productData.description || "",
                img: productData.img || "",
                material: productData.material || "",
                price: productData.price || 0,
                rating: productData.rating || 0,
                reviews: productData.reviews || 0,
                size: (productData.size as string[]) || [],
                stock: productData.stock || 0,
            });
            setSize([ ...productData.size]);
        } 
        else{
            reset(); // Reset the form for adding a new product
            setSize([]);
        }
       
    }, [productData, reset]);

    // Add size to the list
    const addFeature = (sizeValue: string) => {
        if (size.includes(sizeValue)) return; // Prevent duplicate size
        setSize([...size, sizeValue]);
    };

    // Remove size from the list
    const removeFeature = (feature: string) => {
        setSize(size.filter((f) => f !== feature));
    };

    // Submit the form data
    const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
        formHandel({ ...data, size });
      
       
    };
    return (
        <div className="p-3">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name */}
                <div className="mb-4">
                    <label className="block font-medium mb-1">Name</label>
                    <input
                        type="text"
                        {...register("name", { required: "Product name is required" })}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                {/* Brand */}
                <div className="mb-4">
                    <label className="block font-medium mb-1">Brand</label>
                    <input
                        type="text"
                        {...register("brand", { required: "Brand is required" })}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label className="block font-medium mb-1">Category</label>
                    <input
                        type="text"
                        {...register("category", { required: "Category is required" })}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                </div>

                {/* Color */}
                <div className="mb-4">
                    <label className="block font-medium mb-1">Color</label>
                    <input
                        type="text"
                        {...register("color", { required: "Color is required" })}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.color && <p className="text-red-500">{errors.color.message}</p>}
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block font-medium mb-1">Description</label>
                    <textarea
                        {...register("description", { required: "Description is required" })}
                        className="w-full border px-3 py-2 rounded"
                    ></textarea>
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>


                {/* Material */}
                <div className="mb-4">
                    <label className="block font-medium mb-1">Material</label>
                    <input
                        type="text"
                        {...register("material", { required: "Material is required" })}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.material && <p className="text-red-500">{errors.material.message}</p>}
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label className="block font-medium mb-1">Price</label>
                    <input
                        type="number"
                        {...register("price", { required: "Price is required", valueAsNumber: true })}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                </div>


                {/* Stock */}
                <div className="mb-4">
                    <label className="block font-medium mb-1">Stock</label>
                    <input
                        type="number"
                        {...register("stock", { required: "Stock is required", valueAsNumber: true })}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
                </div>

                {/* Size  */}
                <div>
                    <label className="block text-sm font-medium">Size</label>
                    <div className="flex gap-2 p-1 border rounded w-full items-center">


                        <button
                            type="button"
                            onClick={() => addFeature('XS')}
                            className="bg-green-600 text-white px-2 py-1 text-2xl font-bold rounded hover:bg-green-700"
                        > XS </button>
                        <button
                            type="button"
                            onClick={() => addFeature('S')}
                            className="bg-green-600 text-white px-2 py-1 text-2xl font-bold rounded hover:bg-green-700"
                        >S </button>
                        <button
                            type="button"
                            onClick={() => addFeature('M')}
                            className="bg-green-600 text-white px-2 py-1 text-2xl font-bold rounded hover:bg-green-700"
                        >M </button>
                        <button
                            type="button"
                            onClick={() => addFeature('L')}
                            className="bg-green-600 text-white px-2 py-1 text-2xl font-bold rounded hover:bg-green-700"
                        > L</button>
                        <button
                            type="button"
                            onClick={() => addFeature('XL')}
                            className="bg-green-600 text-white px-2 py-1 text-2xl font-bold rounded hover:bg-green-700"
                        >XL </button>

                        <ul className="  flex  flex-wrap gap-2 ">
                            {size.map((size, index) => (
                                <li
                                    key={index}
                                    className="flex gap-2 justify-between items-center border p-1 rounded "
                                >
                                    {size}
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(size)}
                                        className="text-red-500 hover:text-red-700"
                                    ><MdOutlineCancel />  </button>
                                </li>
                            ))}
                        </ul>

                    </div>


                </div>

                {/* Submit Button */}
                <div className="text-center my-6">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
