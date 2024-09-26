import { createContext, useState, ReactNode } from "react";


interface User {
  id: string;
  name: string;
  email: string;
}


interface AuthContextType {
  user: User | null;  
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;  
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  
  const [user, setUser] = useState<User | null>(null);

  // The value passed down through the context
  const userInfo = {
    user, 
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
