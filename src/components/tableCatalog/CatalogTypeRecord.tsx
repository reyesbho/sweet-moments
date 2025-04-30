import { MdCheckBox, MdDelete } from "react-icons/md";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import { ModalConfirm } from "../modal/Modal";
import { useState } from "react";
import { CatalogTypeDto } from "../../general/Dtos";

export function CatalogTypeRecord({catalog,hasImage, handleReload}:{catalog: CatalogTypeDto,hasImage:boolean, handleReload:any}){
    const modalUpdate = useModalConfirm( );
    const modalDelete = useModalConfirm();
    const [inputActive, setInputActive] = useState(catalog.estatus);

    const handleUpdateModal = (event:any) => {
        catalog?.selfUpdateEstatus(!catalog.estatus).then(
            () => {
                handleReload();
                setInputActive(!catalog.estatus);
                modalUpdate.handleClose(event);                    
            }
        );   
    }


    const handleDeleteModal = (event:any) => {
        catalog?.selfDelete(catalog.id).then(
            () => {
                handleReload();
                modalDelete.handleClose(event);
            }
        );   
    }

    return (
            <tr key={catalog.id}>
                {hasImage && <td><img className="table-img" src={catalog.image ? catalog.image : undefined}></img></td>}
                <td>{catalog.descripcion}</td>
                <td>{catalog.clave}</td>
                <td>{catalog.estatus ? 'ACTIVO' : 'INACTIVO'}</td>
                <td className="table-actions">        
                    <div className="checkbox-apple">
                        <input className="yep" id={`check-apple-${catalog.id}-${catalog.clave}`} type="checkbox" checked={inputActive} onChange={(event:any) => modalUpdate.handleShow(event)}/>
                        <label htmlFor={`check-apple-${catalog.id}-${catalog.clave}`}></label>
                    </div>
                    <span onClick={(event:any) => modalDelete.handleShow(event)}><MdDelete size='1.2rem' color="#e04141"></MdDelete></span>
                    <ModalConfirm show={modalUpdate.show} handleClose={(event:any) => modalUpdate.handleClose(event)} handleOk={handleUpdateModal} ></ModalConfirm>
                    <ModalConfirm show={modalDelete.show} handleClose={(event:any) => modalDelete.handleClose(event)} handleOk={handleDeleteModal} ></ModalConfirm>
                </td>
            </tr>
    )
}