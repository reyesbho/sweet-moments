
import { FaCheckSquare, FaHourglassStart } from "react-icons/fa"
import { MdOutlineCancel } from "react-icons/md"

export const classStatusEnum = {
    DONE:'order-status-success',
    BACKLOG: 'order-status-backlog',
    CANCELED: 'order-status-wrong'
}

export const iconStatusEnum = {
    DONE: <FaCheckSquare size="2.5rem" className='color-success'></FaCheckSquare>,
    BACKLOG: <FaHourglassStart size="2.5rem" className='color-backlog'></FaHourglassStart> ,
    CANCELED: <MdOutlineCancel size="2.5rem" className='color-wrong'></MdOutlineCancel>
}

export const STATUS = {
    DONE:'DONE',
    BACKLOG: 'BACKLOG',
    CANCELED:'CANCELED'
}