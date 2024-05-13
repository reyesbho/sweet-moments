import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function useAuth () {
    const context = useContext(AuthContext);
    if (context === undefined){
        throw new Error("useAth must be used within an AuthProvider")
    }
    return context;
} 