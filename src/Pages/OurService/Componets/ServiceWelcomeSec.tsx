import { GiMechanicGarage } from 'react-icons/gi';
import img from '../../../assets/image/Service-Welcom-sec-1.jpg';
import { Ri24HoursFill } from 'react-icons/ri';

const ServiceWelcomeSec = () => {
    return (
        <div className="bg-color-p py-10">
            <div className="max-w  p-6">
                <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
                    {/* Content Section */}
                    <div className=" h-full">
                        <h1 className="bg-color-s inline-block rounded-sm px-3 py-2  text-white uppercase font-semibold">
                            Welcome to Autobike
                        </h1>
                        <h2 className="my-4 text-white font-pFont mb-10 uppercase font-bold lg:text-4xl md:text-3xl text-2xl">
                            MOTORBIKE SERVICE CENTER
                        </h2>
                        <p className="text-white">
                            The flyline is elongated and low. The double-cradle steel frame covers the powerful, sculpted engine that underlines the impressive presence of the bike. Riders also have a number of custom equipment options: the R 18 is scaled back to its core to allow for full customization.
                            <br />
                            <br />
                            Our Option 719 opens up a host of opportunities to lend the R 18 a personal touch. The Option 719 Bicolor Icon cast wheel completes the bike’s high-grade look. The Option 719 seat made of black artificial leather with diamond embossing and seams as well as embroidered BMW badge makes the ride even more stylish and comfortable.
                        </p>
                        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6 mt-16">
                            {/* Certified Mechanics */}
                            <div className="text-white space-y-4">
                                <GiMechanicGarage className="text-7xl text-color-s hover:scale-110 transition-transform duration-300" />
                                <h3 className="text-xl font-bold uppercase">Certified Mechanics</h3>
                                <p>
                                    From changing flat tires and replacing car batteries to providing towing services when you need it, help is just a phone call away. Our specialty technicians can help.
                                </p>
                            </div>
                            {/* 24 Hours Support */}
                            <div className="text-white space-y-4">
                                <Ri24HoursFill className="text-7xl text-color-s hover:scale-110 transition-transform duration-300" />
                                <h3 className="text-xl font-bold uppercase">24 Hours Support</h3>
                                <p>
                                    A light service consists of these few simple things, that are quick and easy to fix. Our drivers are standing by, ready to assist. We can tow you up to 320 kilometres.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="flex items-center justify-center lg:max-h-screen  group overflow-hidden">
                        <img
                            src={img}
                            alt="Service welcome bike"
                            className="h-auto max-h-full group-hover:scale-110 transition-all duration-300"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceWelcomeSec;
