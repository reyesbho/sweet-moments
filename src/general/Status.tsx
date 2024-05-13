
import { FaCheckSquare, FaHourglassStart, FaQuestion } from "react-icons/fa"
import { MdOutlineCancel } from "react-icons/md"

export const classStatusEnum = {
    DONE:'border-status-success',
    BACKLOG: 'border-status-backlog',
    CANCELED: 'border-status-wrong',
    INCOMPLETE:'border-status-incomplete',
    ALL:'border-status-default'
}

export const iconStatusEnum = {
    INCOMPLETE: <FaQuestion size="2rem" className='color-incomplete'></FaQuestion>,
    DONE: <FaCheckSquare size="2rem" className='color-success'></FaCheckSquare>,
    BACKLOG: <FaHourglassStart size="2rem" className='color-backlog'></FaHourglassStart> ,
    CANCELED: <MdOutlineCancel size="2rem" className='color-wrong'></MdOutlineCancel>
}

export const STATUS = {
    DONE:'DONE',
    BACKLOG: 'BACKLOG',
    CANCELED:'CANCELED',
    INCOMPLETE:'INCOMPLETE'
}
