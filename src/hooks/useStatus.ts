import { useEffect, useState } from "react";
import { classBorderStatusEnum, classColorStatusEnum, STATUS } from "../general/Status";

export function useStatus (estatusInit: STATUS) {
    const [cssClassStatusBorder, setCssClassStatusBorder] = useState('');
    const [cssClassStatusColor, setCssClassStatusColor] = useState('');
    const [estatus, setEstatus] = useState<STATUS>(estatusInit);

    useEffect(() => {
        setCssClassStatusBorder(classBorderStatusEnum[estatus]);
        setCssClassStatusColor(classColorStatusEnum[estatus]);
    },[estatus])

    const handleChangeEstatus = (estatus: STATUS) => {
        setEstatus(estatus);
    }

    return {cssClassStatusBorder, cssClassStatusColor, handleChangeEstatus}
}