import { useState } from "react";

export function useModalConfirm(){
    const [openModal, setOpenModal] = useState(false);
    const [statusConfirm, setStatusConfirm] = useState();

    const handleOpenModal = (event, open, action) => {
        event?.preventDefault();
        event?.stopPropagation(); 
        setStatusConfirm(action);
        setOpenModal(open);
    }

    return {openModal, statusConfirm, handleOpenModal, setOpenModal};
}