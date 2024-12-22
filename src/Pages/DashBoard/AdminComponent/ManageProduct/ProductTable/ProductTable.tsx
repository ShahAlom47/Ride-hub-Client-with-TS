import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../../CustomHocks/useAxiosSecure";
import { Products } from "../../../../Shop/Shop";
import { ResponsiveTable } from "responsive-table-react";
import { MdDeleteSweep } from "react-icons/md";

interface PropsType {
    tableData: Products[];
    refetch: () => void;
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
        action: (<Link to={`/my-dashBoard/editBike/${product?._id}`}><button className=" btn-s">View $ Edit</button></Link>),
        delete: (<button type="button" onClick={() => handleDeleteProduct(product?._id)} className=" text-3xl  text-color-s hover:text-4xl transition-all duration-300"><MdDeleteSweep /></button>)
    }))


const handleDeleteProduct = async(id:string)=>{

console.log(id);
}

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