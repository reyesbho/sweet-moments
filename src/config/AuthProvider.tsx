import {useContext, useEffect, useState } from "react";


import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { registerInterceptor } from "./Interceptor";

export const AuthContext = createContext<{
    principal: string | null,
    login: any,
    logout:any,
    interceptor:any} | undefined>(undefined);

    function getCookie(nombre:string) {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [key, valor] = cookie.trim().split('=');
        if (key === nombre) return decodeURIComponent(valor);
      }
      return null;
    }

export function AuthProvider({children}:{children:any}){
    const [principal, setPrincipal] =  useLocalStorage("principal", null);

    const navigate = useNavigate();
    const interceptor = () => {
      registerInterceptor(logout);
    }
  
    // call this function when you want to authenticate the user
    const login = ({email}:{ email:string}) => {
      setPrincipal(email);
      navigate("/",{replace:true});
    };
  
    // call this function to sign out logged in user
    const logout = () => {
      setPrincipal(null);
      navigate("/login",{replace:true});
    };
  
    return <AuthContext.Provider value={{
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