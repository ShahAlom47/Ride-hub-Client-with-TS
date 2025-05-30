import Logo from "../Navbar/Logo";
import { MdLocationPin } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import ReactModal from "../ReactModal/ReactModal";
import ContactForm from "../ContactForm/ContactForm";

const Footer = () => {

    const [modalIsOpen, setIsOpen] = useState(false)

    return (
        <div className="bg-black text-white">
            <div className=" max-w p-5 py-16  grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1  gap-4 items-start ">

                <div  >
                    <h1 className="lg:text-3xl md:text-2xl text-xl font-bold font-pFont mb-4 ">DO YOU HAVE QUESTIONS?<br />
                        <span className=" text-color-s"> LET'S TALK US !</span>
                    </h1>
                    < p className=" flex gap-2  items-center "><MdLocationPin />  5617 Glassford Street New York, NY 10000, USA</p>
                    < p className=" flex gap-2  items-center "><FaPhoneAlt />  (+012) 33 5566 8888</p>
                    < p className=" flex gap-2  items-center "><TfiEmail />  ridehub47@gmail.com</p>
                </div>
                <div className="">
                    <h1 className="uppercase lg:text-2xl md:text-xl text-lg font-bold font-pFont mb-4">Quick links</h1>
                    <div className="flex flex-col text-xl">
                        <NavLink
                            key="home" to="/"
                            className={({ isActive }) => ` hover:text-color-s rounded-sm ${isActive ? 'text-color-s font-bold ' : ''}`}
                        > Home </NavLink>
                        <NavLink key="our-bikes" to="/our-bikes"
                            className={({ isActive }) => `   hover:text-color-s rounded-sm ${isActive ? 'text-color-s font-bold' : ''}`}
                        >Our Bikes</NavLink>
                        <NavLink key="our-service" to="/our-service"
                            className={({ isActive }) => `  hover:text-color-s rounded-sm ${isActive ? 'text-color-s font-bold' : ''}`}
                        >Our Service</NavLink>

                        <NavLink key="our-service" to="/shop"
                            className={({ isActive }) => `  hover:text-color-s rounded-sm ${isActive ? 'text-color-s font-bold' : ''}`}
                        >Shop</NavLink>
                        <NavLink key="about-us" to="/about-us"
                            className={({ isActive }) => `  hover:text-color-s rounded-sm ${isActive ? 'text-color-s font-bold' : ''}`}
                        >About Us</NavLink>

                    </div>
                </div>
                <div>
                    <h1 className="uppercase lg:text-2xl md:text-xl text-lg font-bold font-pFont mb-4">Quick Contact</h1>
                    <p className="mb-3">Have any questions or need assistance? Click the 'Contact Us' button to reach out to us directly. Simply enter your name and email, and we'll get back to you as soon as possible. We're here to help make your bike rental experience smooth and enjoyable!</p>
                    <button onClick={() => setIsOpen(true)} className="btn-p  h-10 font-bold "> Send a Message</button>
                    <ReactModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} label="footer contact modal" >
                        <div className="bg-color-p  mx-auto">
                            <ContactForm></ContactForm>
                        </div>
                    </ReactModal>
                </div>
            </div>
            <div className=" border-t"></div>
            <footer className="footer  text-neutral-content items-center lg:justify-between md:justify-between justify-center  p-5 max-w ">
                <aside className="grid-flow-col items-center">
                    <p>Copyright © {new Date().getFullYear()}  AutoBike. Design by Shah Alom</p>
                </aside>

                <Logo></Logo>
                <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                        </svg>
                    </a>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                        </svg>
                    </a>
                    <a>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            className="fill-current">
                            <path
                                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                        </svg>
                    </a>
                </nav>

            </footer>




        </div>
    );
};

export default Footer;