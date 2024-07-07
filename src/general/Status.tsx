
import { FaCheckSquare, FaHourglassStart, FaQuestion } from "react-icons/fa"
import { MdOutlineCancel } from "react-icons/md"

export const classStatusEnum = {
    DONE:'border-status-success',
    BACKLOG: 'border-status-backlog',
    CANCELED: 'border-status-wrong',
    INCOMPLETE:'border-status-incomplete',
    DELETE:'border-status-default',
    ALL:'border-status-default'
}

export const iconStatusEnum = (status: String, size:string) =>  {
    if(status === STATUS.INCOMPLETE){
        return <FaQuestion title="Incompleto" size={size} className='color-incomplete'></FaQuestion>;
    }
    if(status === STATUS.DONE){
        return <FaCheckSquare title="Listo" size={size} className='color-success'></FaCheckSquare>;
    }
    if(status === STATUS.BACKLOG){
        return <FaHourglassStart title="Por hacer" size={size} className='color-backlog'></FaHourglassStart>;
    }
    if(status === STATUS.CANCELED){
        return <MdOutlineCancel title="Cancelado" size={size} className='color-wrong'></MdOutlineCancel>;
    }
}

export enum STATUS {
    DONE = 'DONE',
    BACKLOG = 'BACKLOG',
    CANCELED = 'CANCELED',
    INCOMPLETE = 'INCOMPLETE',
    DELETE = 'DELETE'
}

enum OTHER_STATUS {
    ALL = 'ALL'
}

export const STATUS_FILTER = {...STATUS,...OTHER_STATUS }
