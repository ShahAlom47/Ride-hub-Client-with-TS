import img from '../../../assets/image/premiumMemberBannerImg.jpg'

const PremiumMemberSec = () => {
    return (
        <div className="relative flex  min-h-[500px] bg-center bg-cover" style={{ backgroundImage: `url(${img})` }}>

<div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>

            {/* Content */}
            <div className="max-w">
                <div className="relative z-10 space-y-5   p-5 text-white my-auto flex justify-center items-start flex-col  lg:w-1/2 md:w-1/2 w-full">

                    <h1 className="font-bold text-4xl font-pFont uppercase ">Free service for premium members</h1>
                    <p className="">If someone’s not there to take your call, you can wait and the automated voice will prompt you to leave a message. We will get back to you as soon as possible.</p>
                    <div className=' flex gap-4 '>
                        <button className='btn-p font-bold '>CONTACT US</button>
                        <div>
                            <p className=" font-semibold">Call Us:</p>
                            <p className=' text-color-s font-semibold'>(+012) 33 5566 8888</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PremiumMemberSec;
