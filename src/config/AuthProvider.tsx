import { PropsWithChildren, useState } from "react";


import { createContext } from "react";

export const AuthContext = createContext<{id:Number} | null>(null);

type AuthProviderProps = PropsWithChildren & {
    isSignedIn?: boolean;
}

export function AuthProvider({children, isSignedIn}:AuthProviderProps){
    const [user] = useState((isSignedIn?{id:1}:null))
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

