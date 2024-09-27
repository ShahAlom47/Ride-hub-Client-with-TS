import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const useUser = () => {
const AuthData= useContext(AuthContext)
if (AuthData === undefined) {
    throw new Error("useUser must be used within an AuthProvider");
  }

    return AuthData;
};

export default useUser;

