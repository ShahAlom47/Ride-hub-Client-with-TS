import { CiSettings } from "react-icons/ci";
import useUser from "../../CustomHocks/useUser";
import UploadPhoto from "../../SharedComponent/UploadPhoto/UploadPhoto";
import { useState, FormEvent } from "react";
import Swal from "sweetalert2";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import auth from "../../../firebase.config";

const Settings: React.FC = () => {
    const { user, updatePhoto, updateName } = useUser();

    const [imgUrl, setImgUrl] = useState<string>('');
    const [loadingPhoto, setLoadingPhoto] = useState<boolean>(false);
    const [loadingName, setLoadingName] = useState<boolean>(false);
    const [loadingPassword, setLoadingPassword] = useState<boolean>(false);
    const [openNewPass, setOpenNewPass] = useState<boolean>(false);

    const handlePhoto = async (): Promise<void> => {
        setLoadingPhoto(true);
        try {
            const updateRes = await updatePhoto(imgUrl);

            Swal.fire({
                title: updateRes ? 'Success!' : 'Error!',
                text: updateRes ? 'Your photo has been updated.' : 'Failed to update photo.',
                icon: updateRes ? 'success' : 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });

            if (updateRes) setImgUrl('');
        } catch (error) {
            console.error("Error saving photo:", error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue updating your photo.',
                icon: 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
        } finally {
            setLoadingPhoto(false);
        }
    };

    const removePhoto = async (): Promise<void> => {
        setLoadingPhoto(true);
        try {
            const updateRes = await updatePhoto('');

            Swal.fire({
                title: updateRes ? 'Success!' : 'Error!',
                text: updateRes ? 'Your photo has been removed.' : 'Failed to update photo.',
                icon: updateRes ? 'success' : 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });

            if (updateRes) setImgUrl('');
        } catch (error) {
            console.error("Error removing photo:", error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue removing your photo.',
                icon: 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
        } finally {
            setLoadingPhoto(false);
        }
    };

    const handleName = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const newName = (form.elements.namedItem("name") as HTMLInputElement)?.value;
        setLoadingName(true);
        try {
            const updateRes = await updateName(newName);

            Swal.fire({
                title: updateRes ? 'Success!' : 'Error!',
                text: updateRes ? 'Your name has been updated.' : 'Failed to update name.',
                icon: updateRes ? 'success' : 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
        } catch (error) {
            console.error("Error updating name:", error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue updating your name.',
                icon: 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
        } finally {
            setLoadingName(false);
        }
    };

    const handleOldPassword = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const oldPassword = (form.elements.namedItem("password") as HTMLInputElement)?.value;
        setLoadingPassword(true);
        try {
            const user = auth?.currentUser;
            if (!user) throw new Error("User not logged in");

            const credential = EmailAuthProvider.credential(user?.email || '', oldPassword);
            const checkRes = await reauthenticateWithCredential(user, credential);

            if (checkRes) {
                setOpenNewPass(true);
                form.reset()
            }
        } catch (error) {
            console.error("Error verifying old password:", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to verify your password.',
                icon: 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
            setOpenNewPass(false);
        } finally {
            setLoadingPassword(false);
        }
    };

    const handleNewPassword = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const newPassword = (form.elements.namedItem("newPassword") as HTMLInputElement)?.value;
        const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement)?.value;

        if (newPassword !== confirmPassword) {
            Swal.fire({
                title: 'Error!',
                text: 'Passwords do not match.',
                icon: 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
            return;
        }

        setLoadingPassword(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("User not logged in");

            await updatePassword(user, newPassword);

            setOpenNewPass(false);
            form.reset()
            Swal.fire({
                title: 'Success!',
                text: 'Password updated successfully!',
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
        } catch (error) {
            console.error("Error updating password:", error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an issue updating your password.',
                icon: 'error',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
        } finally {
            setLoadingPassword(false);
        }
    };

    interface LoadingButtonProps {
        isLoading: boolean;
        onClick?: () => void;
        children: React.ReactNode;
        className?: string;
        isdisabled?: boolean;
        type?: "submit" | "reset" | "button" | undefined;
    }

    const LoadingButton: React.FC<LoadingButtonProps> = ({
        isLoading,
        onClick,
        children,
        className,
        isdisabled,
        type,
    }) => (
        <button
            onClick={onClick}
            className={`${className} px-4 py-2 rounded-sm font-semibold flex items-center justify-center gap-2`}
            disabled={isLoading || isdisabled}
            type={type || 'submit'}
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
                                    onClick={removePhoto}
                                    className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                    Remove
                                </LoadingButton>
                                <LoadingButton
                                    isLoading={loadingPhoto}
                                    isdisabled={imgUrl === ''}
                                    onClick={handlePhoto}
                                    className={`bg-green-600 hover:bg-green-700 text-white ${imgUrl === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Save
                                </LoadingButton>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2 p-3 border rounded-md">
                        <h1 className="text-2xl font-pFont text-white border-b-2 py-3">User Info</h1>
                        <form className="mt-6 gap-3" onSubmit={handleName}>
                            <label htmlFor="name">Edit Name</label>
                            <div className="flex items-center gap-3">
                                <input
                                    defaultValue={user?.displayName || ''}
                                    className="input input-bordered rounded-sm my-2 outline-none w-full"
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

                        <div className="mt-6">
                            <p className="text-white">
                                Email <span className="text-gray-400">(You can't edit email)</span>
                            </p>
                            <div className="flex gap-4 items-center">
                                <p className="input input-bordered rounded-sm flex items-center w-full my-auto">
                                    {user?.email}
                                </p>
                                <LoadingButton
                                    isLoading={loadingPassword}
                                    className="bg-blue-600 hover:bg-blue-700 text-white opacity-50 cursor-not-allowed"
                                >
                                    Save
                                </LoadingButton>
                            </div>
                        </div>

                        <form className={`mt-6 ${openNewPass ? 'hidden' : ''}`} onSubmit={handleOldPassword}>
                            <label className="text-white">Old Password</label>
                            <div className="flex items-center gap-4">
                                <input
                                    className="input input-bordered rounded-sm my-2 outline-none w-full"
                                    type="password"
                                    name="password"
                                    required
                                />
                                <LoadingButton
                                    isLoading={loadingPassword}
                                    className="bg-blue-600 hover:bg-blue-700 text-white btn rounded-sm"
                                    type="submit"
                                >
                                    {loadingPassword ? "Checking..." : "Next"}
                                </LoadingButton>
                            </div>
                        </form>

                        {openNewPass && (
                            <form onSubmit={handleNewPassword} className="">
                                <div className="mt-6 flex items-end gap-4">
                                    <label className="text-white w-full">
                                        New Password
                                        <input
                                            className="input input-bordered rounded-sm my-2 outline-none w-full"
                                            type="password"
                                            name="newPassword"
                                            required
                                        />
                                    </label>

                                    <label className="text-white w-full">
                                        Confirm New Password
                                        <input
                                            className="input input-bordered rounded-sm my-2 outline-none w-full"
                                            type="password"
                                            name="confirmPassword"
                                            required
                                        />
                                    </label>

                                    <LoadingButton
                                        isLoading={loadingPassword}
                                        className="btn mb-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                                        type="submit"
                                    >
                                        {loadingPassword ? "Updating..." : "Confirm"}
                                    </LoadingButton>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
