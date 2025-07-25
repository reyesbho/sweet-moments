import { useModalConfirm } from "../../hooks/useModalConfirm";
import { ModalConfirm } from "../modal/Modal";
import { CatalogTypeDto } from "../../general/Dtos";

export function CatalogTypeRecord({catalog,hasImage=false, handleReload}:{catalog: CatalogTypeDto,hasImage:boolean, handleReload:any}){
    const modalUpdate = useModalConfirm( );

    const handleUpdateModal = (event:any) => {
        if (typeof catalog.selfUpdateEstatus === "function") {
            catalog.selfUpdateEstatus(catalog.id).then(
                () => {
                    handleReload();
                    modalUpdate.handleClose(event);
                }
            );
        }
    }

    return (
            <tr key={catalog.id}>
                {hasImage && <td><img className="table-img" src={catalog.imagen ? catalog.imagen : undefined}></img></td>}
                <td>{catalog.descripcion}</td>
                <td>{catalog.tags?.join(',')}</td>
                <td>{catalog.estatus ? 'ACTIVO' : 'INACTIVO'}</td>
                <td className="table-actions">        
                    <div className="checkbox-apple">
                        <input className="check" id={`check-apple-${catalog.id}`} type="checkbox" checked={catalog.estatus} onChange={(event:any) => modalUpdate.handleShow(event)}/>
                        <label htmlFor={`check-apple-${catalog.id}`}></label>
                    </div>
                    <ModalConfirm show={modalUpdate.show} handleClose={(event:any) => modalUpdate.handleClose(event)} handleOk={handleUpdateModal} ></ModalConfirm>
                </td>
            </tr>
    )
}