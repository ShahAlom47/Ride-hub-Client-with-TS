import { useQuery } from "@tanstack/react-query";
import { Products } from "../Shop";
import useAxiosPublic from "../../../CustomHocks/useAxiosPublic";


type DetailsProps = {
    id: string
}

const ProductDetails = ({ id }: DetailsProps) => {

    const AxiosPublic = useAxiosPublic()

    const { data } = useQuery({
        queryKey: ['product_details', id],
        queryFn: async (): Promise<Products> => {
            const res = await AxiosPublic.get<Products>(`/shopData/productDetails/${id}`); 
            return res.data;
        }
    });

    console.log(data);
    return (
        <div>

        </div>
    );
};

export default ProductDetails;