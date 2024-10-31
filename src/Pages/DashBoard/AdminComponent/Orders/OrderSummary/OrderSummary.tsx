

const OrderSummary = () => {



    return (
        <div className=" grid grid-cols-12 gap-4">
            <div className=" flex flex-col justify-between  lg:col-span-3 md:col-span-3 col-span-6 text-black bg-gray-200 rounded-md p-4 w-full">
                <h1 className="lg:text-lg md:text-base text-xs font-semibold ">Total Revenue</h1>
                <h1 className="  text-3xl font-bold ">$13224</h1>
            </div>
            <div className=" flex flex-col justify-between  lg:col-span-3 md:col-span-3 col-span-6 text-black bg-gray-200 rounded-md p-4 w-full">
                <h1 className="lg:text-lg md:text-base text-xs font-semibold ">Total Transactions</h1>
                <h1 className="  text-3xl font-bold ">324</h1>
            </div>
            <div className=" flex flex-col justify-between  lg:col-span-3 md:col-span-3 col-span-6 text-black bg-gray-200 rounded-md p-4 w-full">
                <h1 className="lg:text-lg md:text-base text-xs font-semibold ">Total Customers</h1>
                <h1 className="  text-3xl font-bold ">3224</h1>
            </div>
            <div className=" flex flex-col justify-between  lg:col-span-3 md:col-span-3 col-span-6 text-black bg-gray-200 rounded-md p-4 w-full">
                <h1 className="lg:text-lg md:text-base text-xs font-semibold ">Total Products</h1>
                <h1 className="  text-3xl font-bold ">3424</h1>
            </div>
        </div>
    );


};

export default OrderSummary;