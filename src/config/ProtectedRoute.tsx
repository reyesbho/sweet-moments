import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const ProtectedRoute = ({children}:{children:any})=>{
    const {user} = useAuth();
    if(!user || user === null){
      return <Navigate to="/login" />;
    }
    return children;
}