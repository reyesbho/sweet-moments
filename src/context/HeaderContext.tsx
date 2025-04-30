import { createContext, useContext, useState } from "react";

export const HeaderContext = createContext<{isOpen:boolean, handleIsOpen:CallableFunction, handleClose:CallableFunction} | undefined>(undefined);


export function HeaderProvider({children}:{children: any}){
    const [isOpen, setIsOpen] = useState(false);
    
    const handleIsOpen = () => {
        setIsOpen(!isOpen);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    return <HeaderContext.Provider
        value={{isOpen, handleIsOpen, handleClose}}>
            {children}
        </HeaderContext.Provider>;
}


export function useHeader () {
    const context = useContext(HeaderContext);
    if (context === undefined){
        throw new Error("useHeader must be used within an HeaderProvider")
    }
    return context;
} 