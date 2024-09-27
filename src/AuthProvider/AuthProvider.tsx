import { createContext, useState, ReactNode, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, User as FirebaseUser, UserCredential } from "firebase/auth";
import auth from '../../firebase.config'; // Ensure the path is correct

interface AuthContextType {
  user: FirebaseUser | null;  
  registerUser: (data: userDataType) => Promise<UserCredential>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;  
}

interface userDataType {
  email: string;
  password: string;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  
  const [user, setUser] = useState<FirebaseUser | null>(null); 
  const [loading, setLoading] = useState(false);

  const registerUser = async ({ email, password }: userDataType): Promise<UserCredential> => {
    setLoading(true);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    const firebaseUser = userCredential.user;
    setUser(firebaseUser);
    
    setLoading(false);
    return userCredential;
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false); 
    });

    return () => unSubscribe();
  }, []);

  const userInfo = {
    user, 
    registerUser
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
