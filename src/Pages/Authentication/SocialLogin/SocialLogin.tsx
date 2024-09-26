import { FcGoogle } from "react-icons/fc";
import { BiLogoGithub } from "react-icons/bi";
import { TiSocialFacebook } from "react-icons/ti";

const SocialLogin = () => {
    return (
        <div className=" flex gap-3 justify-center items-center my-4  ">
            <button className="rounded-full p-1  text-3xl bg-gray-800 hover:bg-gray-700" ><FcGoogle /></button>
            <button className="rounded-full p-1  text-3xl bg-gray-800 text-white hover:bg-gray-700"><BiLogoGithub /></button>
            <button className="rounded-full p-1 text-3xl bg-gray-800 text-white hover:bg-gray-700"><TiSocialFacebook /></button>
            
        </div>
    );
};

export default SocialLogin;