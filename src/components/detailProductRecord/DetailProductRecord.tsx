import { MdCheckBox, MdDelete } from "react-icons/md";
import { DetailProductoDto } from "../../general/Interfaces";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import { ModalConfirm } from "../modal/Modal";
import { deleteDetalleProducto, updateStatusDetalleProducto } from "../../services/detalleProducto.services";
import { toast } from "react-toastify";


export function DetailProductRecord({catalog, handleReload}:{catalog: DetailProductoDto, handleReload:any}){
    const modalUpdate = useModalConfirm( );
    const modalDelete = useModalConfirm();

    const handleUpdateModal = (event:MouseEvent) => { 
        updateStatusDetalleProducto(catalog.id, !catalog.estatus).then(() => {
            modalUpdate.handleClose(event);
            handleReload();
            toast.success("Actualizado correctamente.")
        }).catch((error: Error) => toast.error(error.message));
    }

    const handleDeleteModal = (event:MouseEvent) => {
        deleteDetalleProducto(catalog.id).then(()=>{
            modalDelete.handleClose(event);
            handleReload();
            toast.success("Eliminado correctamente.")
        }).catch((error: Error) => toast.error(error.message));
    }

    return (
            <tr key={catalog.id}>
                <td><img className="table-img" src={catalog.imagen ? catalog.imagen : catalog.producto.thumbnail}></img></td>
                <td>{catalog.producto.nameProduct}</td>
                <td>{catalog.size.descripcion}</td>
                <td>{catalog.tipoCobro.descripcion}</td>
                <td>{catalog.descripcion}</td>
                <td>{catalog.precio}</td>
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