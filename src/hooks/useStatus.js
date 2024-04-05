import { useEffect, useState } from "react";
import { STATUS, classStatusEnum } from "../general/Status";

export function useStatus (statusInit) {
    const [cssClassStatus, setCssClassStatus] = useState(classStatusEnum[statusInit]);
    const [status, setStatus] = useState(statusInit);

    useEffect(() => {
        setCssClassStatus(classStatusEnum[status]);
    },[status])

    const handleSetStatus = (status) => {
        setStatus(status)
    }

    return {cssClassStatus, handleSetStatus}
}