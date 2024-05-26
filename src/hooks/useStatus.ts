import { useEffect, useState } from "react";
import { classStatusEnum } from "../general/Status";

export function useStatus (statusInit: String) {
    const [cssClassStatus, setCssClassStatus] = useState(classStatusEnum[statusInit as keyof typeof classStatusEnum]);
    const [status, setStatus] = useState<String>(statusInit);

    useEffect(() => {
        setCssClassStatus(classStatusEnum[status as keyof typeof classStatusEnum]);
    },[status])

    const handleSetStatus = (status: String) => {
        setStatus(status)
    }

    return {cssClassStatus, handleSetStatus}
}