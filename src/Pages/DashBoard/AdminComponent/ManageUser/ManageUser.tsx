import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../CustomHocks/useAxiosSecure";
import DashPageHeading from "../../../../SharedComponent/DashPageHeading/DashPageHeading";
import { ResponsiveTable } from "responsive-table-react";
import { MdDeleteSweep } from "react-icons/md";
import Swal from "sweetalert2";
import useUserData from "../../../../CustomHocks/useUserData";
import { useState } from "react";

// User interface from database
interface User {
  userEmail: string;
  userName: string;
  userPassword: string;
  userRole: string;
  _id: string;
}

// User response type
interface UserResType {
  status: boolean;
  message: string;
  data: User[];
}

// Firebase user interface
interface FirebaseUser {
  disabled: boolean;
  displayName?: string;
  email: string;
  emailVerified: boolean;
  metadata: {
    lastSignInTime: string;
    creationTime: string;
    lastRefreshTime: string;
  };
  passwordHash?: string;
  passwordSalt?: string;
  photoURL?: string;
  providerData?: Array<{
    uid: string;
    displayName?: string;
    email: string;
    photoURL?: string;
    providerId: string;
  }>;
  tokensValidAfterTime: string;
  uid: string;
}

// Combined data type after merging Firebase and database user data
interface CombinedData {
  firebaseEmail: string;
  firebaseName: string | undefined;
  firebasePhotoUrl: string | undefined;
  userRole: string;
  firebaseUserId: string;
  databaseUserId: string;
}
interface DeleteResType {
  status: boolean;
  message: string;
}

const path: string[] = ['/my-dashBoard', '/my-dashBoard/manageUser'];
const pathName: string[] = ['DashBoard', 'Manage User'];

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const { userData } = useUserData();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentRole, setCurrentRoll]= useState('')

  // Fetch all users from the database
  const { data ,refetch:dataRefetch} = useQuery<UserResType>({
    queryKey: ['manage User'],
    queryFn: async () => {
      const res = await axiosSecure.get<UserResType>('/users/getAllUser');
      return res.data;
    },
  });

  // Fetch all Firebase users
  const { data: fireBaseUser, refetch } = useQuery<FirebaseUser[]>({
    queryKey: ['manage firebase User'],
    queryFn: async () => {
      const res = await axiosSecure.get<FirebaseUser[]>('/users/getAllFireBaseUser');
      return res.data;
    },
  });

  // Combine data from Firebase and the database
  const combinedData: CombinedData[] = (fireBaseUser ?? []).map((firebaseUser) => {
    const matchedUser = (data?.data ?? []).find((user) => user.userEmail === firebaseUser.email);


    if (matchedUser) {
      return {
        firebaseEmail: firebaseUser.email,
        firebaseName: firebaseUser.displayName,
        firebasePhotoUrl: firebaseUser.photoURL,
        userRole: matchedUser.userRole,
        firebaseUserId: firebaseUser.uid,
        databaseUserId: matchedUser._id,
      };
    }

    return null;
  }).filter((item): item is CombinedData => item !== null); // Ensure correct type after filter

  console.log(combinedData);

  const handleDeleteUser = async (dataBaseId: string, firebaseId: string) => {
    try {


      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this user? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (!confirmResult.isConfirmed) {
        return;
      }


      const deleteRes = await axiosSecure.delete<DeleteResType>(
        `/users/delete-user?firebaseId=${firebaseId}&databaseId=${dataBaseId}`
      );


      if (deleteRes?.data?.status) {
        refetch()
        // Success: Show success message
        await Swal.fire({
          title: "Deleted!",
          text: deleteRes?.data?.message || "The user has been successfully deleted.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      } else {
        // Failure: Show error message
        await Swal.fire({
          title: "Failed!",
          text: deleteRes?.data?.message || "Failed to delete the user. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);

      // Step 4: Handle unexpected errors
      await Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred while deleting the user.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };



  const handleRoleChange = async (id: string, roll: string) => {
    setCurrentRoll(roll)
    // কনফার্মেশন ডায়ালগ
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the role to ${roll}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, change it to ${roll}!`,
      cancelButtonText: "Cancel",
    });


    if (confirmResult.isConfirmed) {
      try {
        const response = await axiosSecure.patch<DeleteResType>(`/users/change-user-roll/${id}`, { role: roll });

        if (response.data.status) {
          dataRefetch()
          refetch()
          Swal.fire({
            title: "Success!",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "Ok",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: response.data.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      } catch (error) {
        console.error("Failed to change role:", error);
        Swal.fire({
          title: "Error",
          text: "Something went wrong while changing the role.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    }
  };


  const columns = [
    {
      "id": "img",
      "text": "Photo"
    },
    {
      "id": "name",
      "text": "Name"
    },
    {
      "id": "email",
      "text": "Email"
    },

    {
      "id": "roll",
      "text": "Role"
    },


    {
      "id": "delete",
      "text": "Delete"
    },
  ]

  const tableData = combinedData?.map((user) => ({
    img: (
      <img
        className="w-14 h-14"
        src={user?.firebasePhotoUrl}
        alt="user photo"
      />
    ),
    name: user?.firebaseName,
    email: user?.firebaseEmail,
    roll: (
      <select
        disabled={userData?.userEmail === user?.firebaseEmail}
        value={user.userRole}
        onChange={(e) => handleRoleChange(user.databaseUserId, e.target.value as "admin" | "user" | "moderator")}
        className="border rounded px-2 py-1"
      >
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="moderator">Moderator</option>
      </select>
    ),
    delete: (
      <button
        disabled={userData?.userEmail === user?.firebaseEmail}
        type="button"
        onClick={() => handleDeleteUser(user.databaseUserId, user.firebaseUserId)}
        className={`text-3xl  transition-all duration-300 ${userData?.userEmail === user?.firebaseEmail?'text-color-s text-opacity-45':'text-color-s hover:text-4xl'}`}
      >
        <MdDeleteSweep />
      </button>
    ),
  }));

  return (
    <div>
      <DashPageHeading title="Manage User" path={path} pathName={pathName}></DashPageHeading>

      <div className="my-4">
        <ResponsiveTable
          columns={columns}
          data={tableData}

        />
      </div>
    </div>
  );
};

export default ManageUser;
