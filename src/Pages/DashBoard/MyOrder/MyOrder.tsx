import useAxiosSecure from "../../../CustomHocks/useAxiosSecure";


const MyOrder = () => {
    const axiosSecure = useAxiosSecure()

    const handelClick = async () => {

        const res = await axiosSecure.get('/bikeData/all-bikeData')
        // console.log(res)

    }
    return (
        <div>
            MyOrder
            <button onClick={handelClick}> Click  </button>
        </div>
    );
};

export default MyOrder;