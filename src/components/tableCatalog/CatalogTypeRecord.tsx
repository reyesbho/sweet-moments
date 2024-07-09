import { MdCheckBox, MdDelete } from "react-icons/md";
import { CatalogTypeDto } from "../../general/Interfaces";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import { ModalConfirm } from "../modal/Modal";

export function CatalogTypeRecord({catalog, handleReload}:{catalog: CatalogTypeDto, handleReload:any}){
    const modalUpdate = useModalConfirm( );
    const modalDelete = useModalConfirm();

    const handleUpdateModal = (event:any) => {
        catalog?.selfUpdateEstatus(!catalog.estatus).then(
            () => {
                handleReload();
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
                {catalog.image && <td><img className="table-img" src={catalog.image}></img></td>}
                <td>{catalog.descripcion}</td>
                <td>{catalog.clave}</td>
                <td>{catalog.estatus ? 'ACTIVO' : 'INACTIVO'}</td>
                <td className="table-actions">                                
                    <span onClick={(event:any) => modalUpdate.handleShow(event)}><MdCheckBox size='1.2rem'></MdCheckBox></span>
                    <span onClick={(event:any) => modalDelete.handleShow(event)}><MdDelete size='1.2rem' color="#e04141"></MdDelete></span>
                    <ModalConfirm show={modalUpdate.show} handleClose={(event:any) => modalUpdate.handleClose(event)} handleOk={handleUpdateModal} ></ModalConfirm>
                    <ModalConfirm show={modalDelete.show} handleClose={(event:any) => modalDelete.handleClose(event)} handleOk={handleDeleteModal} ></ModalConfirm>
                </td>
            </tr>
    )
}