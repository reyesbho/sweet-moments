import './ModalConfirm.css'

export function ModalConfirm({openModal, setOpenModal, accept}){
    return (
        <>
            {openModal && 
            <div className='main-modal' onClick={(event) => {event.stopPropagation(); setOpenModal(false)}}>
                <div className='modal-container'>
                    <div className='modal-title'>
                        <p>¿Estas seguro de realizar esta acción? </p>
                    </div>
                    <hr></hr>
                    <div className='modal-actions'>
                        <button className='btn-cancel btn-md' onClick={(event) => {event.stopPropagation(); setOpenModal(false);}} >Cancelar</button>
                        <button className='btn-success btn-md' onClick={accept}>Confirmar</button>
                    </div>
                </div>
            </div>
            }
        </>
    )
}