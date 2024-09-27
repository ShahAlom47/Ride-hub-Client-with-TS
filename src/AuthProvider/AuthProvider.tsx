import { createContext, useState, ReactNode, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, User as FirebaseUser, UserCredential } from "firebase/auth";
import auth from '../../firebase.config'; // Ensure the path is correct
import useAxiosPublic from "../CustomHocks/useAxiosPublic";

interface AuthContextType {
  user: FirebaseUser | null;
  registerUser: (data: registerDataType) => Promise<UserCredential>;
  addUser: (userData: UserDataType) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;  
}

interface registerDataType {
  email: string;
  password: string;
}

interface UserDataType  {
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: string;
}
interface AddUserResponse {
  status: boolean;
  message?: string; 
  error?: string; 
}


const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  
  const [user, setUser] = useState<FirebaseUser | null>(null); 
  const [loading, setLoading] = useState(false);
  const axiosPublic= useAxiosPublic();

  const registerUser = async ({ email, password }: registerDataType): Promise<UserCredential> => {
    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    const user = userCredential.user;
    setUser(user);
    
    setLoading(false);
    return userCredential;
  }


  
const addUser = async (userData: UserDataType): Promise<void> => {
  try {
    const addUserRes = await axiosPublic.post<AddUserResponse>('/users/addUser', userData);
    console.log(addUserRes.data);
    if(addUserRes.data.status===false){
      setUser(null)
      localStorage.removeItem('token')
    }
    console.log(addUserRes.data);
  } catch (error) {
    console.error("Error adding user", error);
  }
};

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {

      const createToken = async (userInfo: string) => {
        try {
          const tokenRes = await axiosPublic.post <{token:string}>('/users/jwt', { userInfo });
     
          const token=tokenRes.data?.token
          if(token){
            localStorage.setItem('token', token)
          }
        
        } catch (error) {
          console.error("Error creating token", error);
        }
      };
  
      if(user && user.email){
        createToken(user.email)
        setUser(user)
     }

     else{
         localStorage.removeItem('token')
         setUser(null);
     }

      setLoading(false); 
    });

    return () => unSubscribe();
  }, [axiosPublic]);

  const userInfo = {
    user, 
    loading,
    registerUser,
    addUser,
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
