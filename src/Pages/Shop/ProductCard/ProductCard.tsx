import { Products } from "../Shop";
import ReactStars from "react-rating-stars-component";


interface ProductCardProps {

    data: Products;
}


const ProductCard = ({ data }: ProductCardProps) => {

    console.log(data);

    return (
        <div>
            <div className=" flex flex-col justify-center items-center">
                
                <img src="https://m.media-amazon.com/images/I/61xv8k5p1gL._AC_SL1500_.jpg" alt="" />
                <p>{data?.category}</p>
                <h1>{data?.name}</h1>
                <ReactStars
                    count={5}
                    value={4}
                    size={24}
                    activeColor="#ffd700"
                />,
            </div>
        </div>
    );
};

export default ProductCard;