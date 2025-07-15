import {useContext, useEffect, useState } from "react";


import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { registerInterceptor } from "./Interceptor";
import { TokenResponse, UserResponse } from "../general/Interfaces";

export const AuthContext = createContext<{
    token:TokenResponse | null,
    principal: string | null,
    login: any,
    logout:any,
    interceptor:any} | undefined>(undefined);


export function AuthProvider({children}:{children:any}){
    const [token, setToken] = useLocalStorage("token", null);
    const [principal, setPrincipal] =  useLocalStorage("principal", null);

    const navigate = useNavigate();
    const interceptor = () => {
      registerInterceptor(logout);
    }
  
    // call this function when you want to authenticate the user
    const login = ({data, email}:{data:TokenResponse, email:string}) => {
      setToken(data);
      setPrincipal(email);
      navigate("/",{replace:true});
    };
  
    // call this function to sign out logged in user
    const logout = () => {
      setToken(null);
      setPrincipal(null);
      navigate("/login",{replace:true});
    };
  
    return <AuthContext.Provider value={{
        token,
        principal,
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