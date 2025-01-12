import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../CustomHocks/useAxiosSecure";
import DashPageHeading from "../../../../SharedComponent/DashPageHeading/DashPageHeading";

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

  return (
    <div>
      <DashPageHeading title="Manage User" path={path} pathName={pathName}></DashPageHeading>

      <div className="my-4">
        {/* Render combined data or any other content */}
        {combinedData.map((user, index) => (
          <div key={index}>
            <p>Email: {user.firebaseEmail}</p>
            <p>Name: {user.firebaseName}</p>
            <p>Role: {user.firebaseRole}</p>
            <p>Database User ID: {user.databaseUserId}</p>
            <img src={user.firebasePhotoUrl} alt="User Photo" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUser;
