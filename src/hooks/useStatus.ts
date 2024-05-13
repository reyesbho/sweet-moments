import { useEffect, useState } from "react";
import { classStatusEnum } from "../general/Status";
import { PathString } from "react-hook-form";

export function useStatus (statusInit: PathString) {
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