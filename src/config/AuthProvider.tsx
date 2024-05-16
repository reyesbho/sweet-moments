import {useContext, useEffect, useState } from "react";


import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { User } from "./User";
import { getUser } from "../services/AuthService";
import { registerInterceptor } from "./Interceptor";

export const AuthContext = createContext<{
    user:User | null,
    login: any,
    logout:any,
    interceptor:any} | undefined>(undefined);


export function AuthProvider({children}:{children:any}){
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();
    const interceptor = () => {
      registerInterceptor();
    }
  
    // call this function when you want to authenticate the user
    const login = (data:User) => {
       setUser(data);
       getUser(data.token).then((response:{email:string, user:string}) => {
        const newUser = {...data, user: response.user, email: response.email};
        setUser(newUser);
      }).then(() => {
        //window.document.location.href = "/";
        navigate("/",{replace:true});
      });
    };
  
    // call this function to sign out logged in user
    const logout = () => {
      setUser(null);
      window.document.location.href = "/";
    };
  
    return <AuthContext.Provider value={{
        user,
        login,
        logout,
        interceptor
      }}>{children}</AuthContext.Provider>;
  };


  export function useAuth () {
    const context = useContext(AuthContext);
    if (context === undefined){
        throw new Error("useAth must be used within an AuthProvider")
    }
    context.interceptor();
    return context;
} 