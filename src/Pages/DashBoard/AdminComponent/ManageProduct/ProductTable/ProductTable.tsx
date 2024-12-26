import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../../CustomHocks/useAxiosSecure";
import { Products } from "../../../../Shop/Shop";
import { ResponsiveTable } from "responsive-table-react";
import { MdDeleteSweep } from "react-icons/md";
import Swal from "sweetalert2";

interface PropsType {
    tableData: Products[];
    refetch: () => void;
}
interface ResType {
   message: string;
   success:boolean;
}

const ProductTable =({ tableData, refetch }: PropsType) => {
    const axiosSecure = useAxiosSecure();

    const columns = [
        {
            "id": "img",
            "text": "Photo"
        },
        {
            "id": "name",
            "text": "Name"
        },
        {
            "id": "brand",
            "text": "Brand"
        },
       
        {
            "id": "price",
            "text": "Price"
        },
        {
            "id": "stock",
            "text": "Stock"
        },
        {
            "id": "action",
            "text": "Action"
        },
        {
            "id": "delete",
            "text": "Delete"
        },
    ]

    const data = tableData?.map((product) => ({
        img: (<img className="w-14 h-14" src={product?.img} alt="product photo" />),
        brand: product.brand,
        name: product?.name,
        price: (<p>$ {product.price}</p>),
        stock: (<p> {product.stock}</p>),
        action: (<Link to={`/my-dashBoard/manageProduct/editProduct/${product?._id}`}><button className=" btn-s">View $ Edit</button></Link>),
        delete: (<button type="button" onClick={() => handleDeleteProduct(product?._id)} className=" text-3xl  text-color-s hover:text-4xl transition-all duration-300"><MdDeleteSweep /></button>)
    }))


    const handleDeleteProduct = async (id: string) => {
        try {
            // Show confirmation dialog
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: 'Do you really want to delete this product? This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'Cancel',
            });
    
            if (result.isConfirmed) {
                // If the user confirms, proceed with the deletion
                const deleteRes = await axiosSecure.delete<ResType>(`/shopData/deleteProduct/${id}`);
    
                if (deleteRes.data.success) {
                    refetch()
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: 'Product deleted successfully!',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                } else {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'warning',
                        title: 'Failed to delete the product!',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                }
            } else {
                // If the user cancels, show a cancellation message (optional)
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'info',
                    title: 'Deletion canceled!',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Something went wrong!',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    };
    

    return (
        <div className=" mb-5">
            <ResponsiveTable
                columns={columns}
                data={data}

            />

        </div>
    );
};

export default ProductTable;