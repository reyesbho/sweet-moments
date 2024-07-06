import './ModalConfirm.css'

export function ModalConfirm({show, handleClose, handleOk}:{show:boolean, handleClose:CallableFunction, handleOk:CallableFunction}){
    return (
        <>
            {show && 
            <div className='main-modal' >
                <div className='modal-container'>
                    <div className='modal-title'>
                        <p>¿Estas seguro de realizar esta acción? </p>
                    </div>
                    <div className='modal-actions'>
                        <button className='btn btn-cancel btn-md' onClick={() => handleClose()} >Cancelar</button>
                        <button className='btn btn-success btn-md' onClick={() => handleOk()}>Confirmar</button>
                    </div>
                </div>
            </div>
            }
        </>
    )
}