
import { FaCheckSquare, FaHourglassStart } from "react-icons/fa"
import { MdOutlineCancel } from "react-icons/md"

export const classStatusEnum = {
    DONE:'order-status-success',
    BACKLOG: 'order-status-backlog',
    CANCELED: 'order-status-wrong'
}

export const iconStatusEnum = {
    DONE: <FaCheckSquare size="2rem" className='color-success'></FaCheckSquare>,
    BACKLOG: <FaHourglassStart size="2rem" className='color-backlog'></FaHourglassStart> ,
    CANCELED: <MdOutlineCancel size="2rem" className='color-wrong'></MdOutlineCancel>
}

export const STATUS = {
    DONE:'DONE',
    BACKLOG: 'BACKLOG',
    CANCELED:'CANCELED'
}


export const getValueStatus = (status) => {
    return STATUS_VALUE[status];
}

const STATUS_VALUE = {
    BACKLOG: 3,
    DONE:2,
    CANCELED:1
}