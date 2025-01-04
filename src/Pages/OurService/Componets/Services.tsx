import { GoArrowUpRight } from "react-icons/go";
import { FaOilCan, FaSnowflake, FaTools, FaTruck, FaCar, FaDiagnoses } from 'react-icons/fa';

const servicesData = [
    {
        icon: <FaTools />,
        title: 'Annual Service',
        description:
            'Routine maintenance and yearly tune-ups are important to keep your bike running smoothly and to help avoid costly repairs.',
    },
    {
        icon: <FaSnowflake />,
        title: 'Winterization',
        description:
            'Avoid future issues by making sure your motorcycle is ready for the cold winter months, whether you plan on riding or storing your bike.',
    },
    {
        icon: <FaTruck />,
        title: 'Spring Maintenance',
        description:
            'The importance of properly preparing your motorcycle. Make sure your ride is running at optimal performance for that summer heat.',
    },
    {
        icon: <FaCar />,
        title: 'Tire Change Service',
        description:
            'Whether your tires need rotating, balancing, repair or even replacement, our tire services will get you back on the road fast.',
    },
    {
        icon: <FaOilCan />,
        title: 'Oil Changes',
        description:
            'A comprehensive preventive maintenance service to check, change, inspect and fill essential systems and components of your vehicle.',
    },
    {
        icon: <FaDiagnoses />,
        title: 'Brake Inspection',
        description:
            'From brake pads to brake fluid, we provide the services you need to help keep your stopping power responsive and reliable.',
    },
];

const Services = () => {
    return (
        <div className="max-w-7xl mx-auto py-11 px-5 pt-16">
            {/* Section Header */}
            <h1 className="bg-red-600 inline-block rounded-sm px-3 py-2 text-white uppercase font-semibold">
                OUR SERVICES
            </h1>
            <h2 className="my-4 text-white font-pFont mb-10 uppercase font-bold lg:text-4xl md:text-3xl text-2xl">
                the services we provide
            </h2>

            {/* Services Grid */}
            <div className="my-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-0 border-[0.1px] border-gray-700">
                {servicesData.map((service, index) => (
                    <div
                        key={index}
                        className="p-6 border-[0.1px] border-gray-700   transition-transform duration-300"
                    >
                        <div className="text-red-600 text-4xl mb-4">{service.icon}</div>
                        <h3 className="text-xl text-white font-semibold font-pFont mb-2">{service.title}</h3>
                        <p className="text-gray-300">{service.description}</p>
                        <button
                           
                            className=" flex items-center gap-2 border-color-s border-opacity-0 border-b hover:border-opacity-100 font-semibold mt-4 "
                        >
                            READ MORE <GoArrowUpRight />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
