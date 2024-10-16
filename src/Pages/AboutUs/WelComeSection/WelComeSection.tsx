import { BsArrowBarUp } from "react-icons/bs";
import img from '../../../assets/image/aboutBike.jpg'

const WelComeSection = () => {
    const sinceYear: number = 2008
    const date = new Date().getFullYear()

    return (
        <div className="bg max-w px-4 py-10 my-8">
            <div className=" grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4 ">
                <div className=" col-span-6   mb-28 py-5 ">
                    <div className=" w-4/5   relative group ">
                        <img className=" group-hover:border-opacity-100 border border-opacity-0 border-color-s relative  top-0 right-0  transition-all duration-300 ease-in-out  " src={img} alt="Welcome Section Bike Photo" />

                        <div className=" hover:-bottom-10 transition-all duration-300 ease-in-out absolute -bottom-12 -right-1/4 w-[50%] h-[60%] bg-gray-950 p-3">
                            <div className=" border border-white h-full w-full p-3 flex flex-col justify-between">

                                <h1 className=" lg:text-xl md:text-lg text-sm  font-pFont font-extrabold text-white uppercase text-end">Since
                                    <br />
                                    {sinceYear}</h1>
                                <div>
                                    <h1 className=" lg:text-5xl md:text-4xl text-3xl   font-extrabold font-pFont text-color-s">{date - sinceYear}</h1>
                                    <p className=" lg:text-xl md:text-lg text-sm lg:font-extrabold text-white font-pFont uppercase">Years <br />
                                        Experience</p>
                                </div>

                            </div>


                        </div>


                    </div>

                </div>
                <div className=" col-span-6 space-y-3 flex flex-col justify-center items-start  my-5 ">
                    <p className=" text-white bg-color-s px-3 py-2 uppercase font-semibold font-pFont inline mr-auto">WelCome To RideHub</p>
                    <h1 className=" uppercase font-extrabold font-pFont text-white text-xl md:text-2xl lg:text-4xl">Helps you to find your next motorbike easily</h1>
                    <p className="text-white py-10 text-lg">The glamour of ten decades can be this timeless and modern. This motorcycle was, is and remains a design icon. A statement. This limited edition is an icon thanks to its attention to historic details. And its willingness to be glamorous. A fair bit from being modest. The generous use of chrome lends it its radiance. A true masterpiece.
                        <br />
                        <br />
                        Customized motorcycle. Not for sale. The vehicles shown are modified and equipped with third-party accessories and/or proprietary parts that are neither manufactured, distributed nor tested by BMW. BMW assumes no liability for the modifications (including the installation, characteristics and use of the accessories shown).
                    </p>
                    <button
                        className=" border-color-s border-b-2 border-opacity-0 hover:border-opacity-100 group  gap-2 py-1 flex items-center text-white font-semibold text-lg transition-all ease-in-out duration-300">
                        MORE ABOUT US <span className="text-lg font-bold group-hover:text-color-s  "><BsArrowBarUp /></span></button>
                </div>

            </div>


        </div>
    );
};

export default WelComeSection;