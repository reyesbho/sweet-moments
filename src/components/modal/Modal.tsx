import { MdClose } from 'react-icons/md'
import './Modal.css'

export function ModalConfirm({show, handleClose, handleOk}:{show:boolean, handleClose:CallableFunction, handleOk:CallableFunction}){
    return (
        <>
            {show && 
            <div className='main-modal' >
                <div className='modal-container'>
                <span className="main-modal-close" onClick={(e) => handleClose(e)}><MdClose size={'2rem'}></MdClose></span>
                    <div className='modal-title'>
                        <p>¿Estas seguro de realizar esta acción? </p>
                    </div>
                    <div className='modal-actions'>
                        <button className='btn btn-cancel btn-md' onClick={(e) => handleClose(e)} >Cancelar</button>
                        <button className='btn btn-success btn-md' onClick={(e) => handleOk(e)}>Confirmar</button>
                    </div>
                </div>
            </div>
            }
        </>
    )
}