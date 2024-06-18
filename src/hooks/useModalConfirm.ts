import { useState } from "react";
import { STATUS } from "../general/Status";

export function useModalConfirm(){
    const [openModal, setOpenModal] = useState(false);
    const [statusConfirm, setStatusConfirm] = useState<String>(STATUS.BACKLOG);

    const handleOpenModal = (event:any, open:boolean, action?:any) => {
        event?.preventDefault();
        event?.stopPropagation(); 
        setStatusConfirm(action);
        setOpenModal(open);
    }

    return {openModal, statusConfirm, handleOpenModal, setOpenModal};
}