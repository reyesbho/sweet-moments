import { useState } from "react";

export function useModalConfirm(){
    const [show, setShow] = useState(false);

    

    const handleShow = (event:any) => {
        event?.stopPropagation();
        setShow(true)
    };
    const handleClose = (event:any) => {
        event?.stopPropagation();
        setShow(false)
    };

    return {show, handleShow, handleClose};
}