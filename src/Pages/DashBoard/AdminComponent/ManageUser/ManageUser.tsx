import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../CustomHocks/useAxiosSecure";
import DashPageHeading from "../../../../SharedComponent/DashPageHeading/DashPageHeading";
import { ResponsiveTable } from "responsive-table-react";
import { MdDeleteSweep } from "react-icons/md";

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
  firebaseRole: string;
  firebaseUserId: string;
  databaseUserId: string;
}

const path: string[] = ['/my-dashBoard', '/my-dashBoard/manageUser'];
const pathName: string[] = ['DashBoard', 'Manage User'];

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all users from the database
  const { data } = useQuery<UserResType>({
    queryKey: ['manage User'],
    queryFn: async () => {
      const res = await axiosSecure.get<UserResType>('/users/getAllUser');
      return res.data;
    },
  });

  // Fetch all Firebase users
  const { data: fireBaseUser } = useQuery<FirebaseUser[]>({
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
        firebaseRole: matchedUser.userRole, // Role from the database
        firebaseUserId: firebaseUser.uid, // Firebase User ID
        databaseUserId: matchedUser._id, // Database User ID
      };
    }

    return null;
  }).filter((item): item is CombinedData => item !== null); // Ensure correct type after filter

  console.log(combinedData);

  const handleDeleteUser = async(id:string)=>{
    console.log(id);

    
  }
  const handleRoleChange = async(roll:string,id:string)=>{
    console.log(roll,id);

    
  }


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
      "text": "Roll"
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
        value={user.firebaseRole} 
        onChange={(e) => handleRoleChange(user.databaseUserId, e.target.value as "Admin" | "User" | "Moderator")}
        className="border rounded px-2 py-1"
      >
        <option value="Admin">Admin</option>
        <option value="User">User</option>
        <option value="Moderator">Moderator</option>
      </select>
    ),
    delete: (
      <button
        type="button"
        onClick={() => handleDeleteUser(user?.databaseUserId)}
        className="text-3xl text-color-s hover:text-4xl transition-all duration-300"
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
          data={tableData }

        />
      </div>
    </div>
  );
};

export default ManageUser;
