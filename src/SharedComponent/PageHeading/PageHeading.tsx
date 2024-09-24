import { Link } from "react-router-dom";
import banner from '../../assets/Banner-Img/bike-page-banner.jpg'
interface PropsType {
    img?:string ;
    subTitle?:string;
    title:string;
    titleColor?:string;
    path?:string[];
    pathName?:string[];
}


const PageHeading = ({ img , subTitle, title, titleColor,path,pathName }:PropsType) => {
    
    return (
        <div>
            <div className="relative lg:min-h-[260px] md:min-h-[150px] min-h-100 bg-cover bg-center flex flex-col justify-center items-start" style={{ backgroundImage: `url(${img ||banner})` }}>
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className=' relative z-10  mt-16 space-y-6 pb-5  h-full ml-[10%]  text-white'>
                <div>
                        {path?.map((item, i) => (
                            <Link className="hover:text-color-s" key={i} to={item}>
                                {i === 0 ? '' : '  /'} {pathName?.[i] ?? 'Unknown'}
                            </Link>
                        ))}
                    </div>
                    <h2 className="text-color-p  font-semibold">{subTitle}</h2>
                    <h1 className={`${titleColor} lg:text-4xl  text-3xl font-bold font-pFont`}>{title}</h1>

                </div>
            </div>


        </div>
    );
};

export default PageHeading;

