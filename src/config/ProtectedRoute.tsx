import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export function ProtectedRoute({children}){
    const user = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(user === null){
            navigate("/login",{replace:true});
        }
    },[navigate, user])

    return children;
}