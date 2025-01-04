import { CiSettings } from "react-icons/ci";
import useUser from "../../CustomHocks/useUser";
import UploadPhoto from "../../SharedComponent/UploadPhoto/UploadPhoto";
import { useState, FormEvent } from "react";



// Define Props for UploadPhoto component
// interface UploadPhotoProps {
//     setImgUrl: (url: string) => void;
//     previousImg: string;
//     photoFolder: string;
// }

const Settings: React.FC = () => {
    const { user } = useUser();

    const [imgUrl, setImgUrl] = useState<string>('');
    const [loadingPhoto, setLoadingPhoto] = useState<boolean>(false);
    const [loadingName, setLoadingName] = useState<boolean>(false);
    const [loadingPassword, setLoadingPassword] = useState<boolean>(false);

    // Handle photo upload
    const handelPhoto = async (): Promise<void> => {
        setLoadingPhoto(true);
        try {
            console.log("Saving photo...", imgUrl);
            // Add logic to save photo
        } catch (error) {
            console.error("Error saving photo:", error);
        } finally {
            setLoadingPhoto(false);
        }
    };

    // Handle name change
    const handleName = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const newName = (form.elements.namedItem("name") as HTMLInputElement)?.value;
        setLoadingName(true);
        try {
            console.log("Updating name to:", newName);
            // Add logic to update the name
        } catch (error) {
            console.error("Error updating name:", error);
        } finally {
            setLoadingName(false);
        }
    };

    // Handle password change
    const handlePassword = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const newPassword = (form.elements.namedItem("password") as HTMLInputElement)?.value;
        console.log(newPassword);
        setLoadingPassword(true);
        try {
            console.log("Updating password...");
            // Add logic to update the password
        } catch (error) {
            console.error("Error updating password:", error);
        } finally {
            setLoadingPassword(false);
        }
    };

    // Inline Loading Button Component
    interface LoadingButtonProps {
        isLoading: boolean;
        onClick?: () => void;
        children: React.ReactNode;
        className?: string;
    }

    const LoadingButton: React.FC<LoadingButtonProps> = ({
        isLoading,
        onClick,
        children,
        className,
    }) => (
        <button
            onClick={onClick}
            className={`${className} px-4 py-2 rounded-sm font-semibold flex items-center justify-center gap-2`}
            disabled={isLoading}
        >
            {isLoading ? (
                <span className="loader w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
            ) : (
                children
            )}
        </button>
    );

    return (
        <div className="bg-color-p p-5">
            <div className="max-w p-6">
                <h1 className="text-2xl px-3 font-semibold text-white flex items-center gap-4">
                    Setting <CiSettings />
                </h1>
                <div className="my-8 w-full h-auto grid gap-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-1 p-3">
                    {/* Photo Section */}
                    <div className="col-span-1 ">
                        <div className="p-3 rounded-md border">
                            <UploadPhoto
                                setImgUrl={setImgUrl}
                                previousImg={user?.photoURL || ''}
                                photoFolder="User Photo"
                            />
                            <div className="flex items-center justify-between p-3">
                                <LoadingButton
                                    isLoading={loadingPhoto}
                                    onClick={() => setImgUrl('')}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                    Remove
                                </LoadingButton>
                                <LoadingButton
                                    isLoading={loadingPhoto}
                                    onClick={handelPhoto}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    Save
                                </LoadingButton>
                            </div>
                        </div>
                    </div>

                    {/* User Info Section */}
                    <div className="col-span-2 p-3 border rounded-md">
                        <h1 className="text-2xl font-pFont text-white border-b-2 py-3">User Info</h1>
                        {/* Edit Name */}
                        <form className="mt-6   gap-3" onSubmit={handleName}>
                            <label htmlFor="name">Edit Name</label>
                            <div className="flex  items-center gap-3">

                                <input
                                    defaultValue={user?.displayName || ''}
                                    className="input input-bordered rounded-sm my-2 outline-none w-full "
                                    type="text"
                                    name="name"
                                    id="name"
                                />
                                <LoadingButton
                                    isLoading={loadingName}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Save
                                </LoadingButton>
                            </div>

                        </form>

                        {/* Email Display */}
                        <div className="mt-6">
                            <p className="text-white">
                                Email <span className="text-gray-400">(You can't edit email)</span>
                            </p>
                            <div className=" flex gap-4 items-center">
                                <p className="input input-bordered rounded-sm  flex items-center w-full my-auto">{user?.email}</p>
                                <LoadingButton
                                    isLoading={loadingPassword}
                                    className="bg-blue-600 hover:bg-blue-700 text-white opacity-50 cursor-not-allowed"
                                >
                                    Save
                                </LoadingButton>
                            </div>
                        </div>

                        {/* Edit Password */}
                        <form className="mt-6 flex flex-col gap-3" onSubmit={handlePassword}>
                            <label htmlFor="password">Edit Password</label>
                            <div className="flex items-center gap-4 ">
                                <input
                                    placeholder="****"
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="input input-bordered rounded-sm w-full"
                                />
                                <LoadingButton
                                    isLoading={loadingPassword}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Save
                                </LoadingButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
