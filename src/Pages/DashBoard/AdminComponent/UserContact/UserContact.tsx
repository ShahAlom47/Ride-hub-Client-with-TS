import { useState } from "react";
import DashPageHeading from "../../../../SharedComponent/DashPageHeading/DashPageHeading";
import PaginationButtons from "../../../../SharedComponent/PaginationButtons/PaginationButtons";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../CustomHocks/useAxiosSecure";
import { ResponsiveTable } from "responsive-table-react";
import { MdDeleteSweep } from "react-icons/md";
import Loading from "../../../../SharedComponent/Loading/Loading";
import ReactModal from "../../../../SharedComponent/ReactModal/ReactModal";
import Swal from "sweetalert2";

interface MessageType {
    _id: string;
    from: string;
    to: string;
    subject: string;
    html: string;
}

interface DeleteRes {
    status:boolean;
    message:string;
}

const path: string[] = ["/my-dashBoard", "/my-userContact/"];
const pathName: string[] = ["DashBoard", "User Contact"];

const UserContact = () => {
    
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState<string>("");
    const pageItem = 5;

    const axiosSecure = useAxiosSecure();

    const [currentData, setCurrentData] = useState<MessageType>({
        _id: "",
        from: "",
        to: "",
        subject: "",
        html: "",
    });
    
const [modalIsOpen,setIsOpen]=useState(false)

   
    const { data: messagesData, isLoading,refetch } = useQuery<{
        messages: MessageType[];
        total: number;
    }>({
        queryKey: ["userMessages", currentPage, search],
        queryFn: async () => {
            const res = await axiosSecure.get<{
                messages: MessageType[];
                total: number;
            }>
                (
                    `/userContact/getUserMessage?page=${currentPage}&limit=${pageItem}&search=${search}`
                );
            return res.data;
        },
    });

 
    const messages = messagesData?.messages || [];
    const totalPages = Math.ceil((messagesData?.total || 0) / pageItem);

 

    const handleDeleteMsg = async (id: string) => {
        const confirmResult = await Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this message? This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });
    
        if (confirmResult.isConfirmed) {
            try {
                const res = await axiosSecure.delete<DeleteRes>(`/userContact/deleteUserMessage/${id}`);
               
               
                if (res.status === 200) {
                    Swal.fire("Deleted!", res.data.message, "success");
                    refetch()
                } else {
                    Swal.fire("Error!", "Failed to delete the message. Please try again.", "error");
                }
            } catch (error) {
                Swal.fire("Error!", "Something went wrong while deleting the message.", "error");
                console.error("Error:", error);
            }
        } else {
            console.log("Delete action was canceled.");
        }
    };
    

    const handelView =(data:MessageType)=>{
        setCurrentData(data)
        setIsOpen(true)
    }

    // Define table columns
    const columns = [
        { id: "no", text: "No" },
        { id: "email", text: "Email" },
        { id: "subject", text: "Subject" },
        { id: "view", text: "Message" },
        { id: "action", text: "Action" },
    ];

    const tableData = messages?.map((user, idx) => ({

        no: idx + 1 + (currentPage - 1) * pageItem,
        email: user?.to,
        subject: user?.subject,
        view: (
            <button
                type="button"
                onClick={() =>handelView (user)}
                className="text-xl bg-gray-600 rounded-sm p-1 px-2 transition-all duration-300 text-opacity-45 font-bold"
            >
                View
            </button>
        ),
        action: (
            <button
                type="button"
                onClick={() => handleDeleteMsg(user?._id)}
                className="text-3xl transition-all duration-300 text-color-s text-opacity-45"
            >
                <MdDeleteSweep />
            </button>
        ),
    }));

    return (
        <div>
            <DashPageHeading title="User Contact" path={path} pathName={pathName} />

            <div className="my-4 space-y-4">
                {/* Search Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-2 input input-bordered rounded-sm rounded-lg"
                    />
                </div>

                {isLoading ? (
                    <Loading />
                ) : (
                    <>
                        <ResponsiveTable columns={columns} data={tableData} />
                        <PaginationButtons
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            totalPages={totalPages}
                        />
                    </>
                )}
            </div>
            <ReactModal modalIsOpen={modalIsOpen}  setIsOpen={setIsOpen} label={'user message view'}>
                <div className="p-3 py-12 text-white space-y-3 ">
                    <h1 className=" text-xl font-semibold">User Email: {currentData?.to}</h1>
                    <h1 className=" text-xl font-semibold">Subject: {currentData?.subject}</h1>
                    <p className="">{currentData?.html}</p>

                </div>
            </ReactModal>
        </div>
    );
};

export default UserContact;
