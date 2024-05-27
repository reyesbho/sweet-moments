import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export const ProtectedRoute = ({children}:{children:any})=>{

    const {principal} = useAuth();
    if(!principal || principal === null){
      return <Navigate to="/login" />;
    }
    
    return children;
}