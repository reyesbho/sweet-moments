import { toast } from "react-toastify";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import { deleteProducto, updateProducto } from "../../services/producto.service";
import { ModalConfirm } from "../modal/Modal";
import './Product.css';
import { CatalogTypeDto } from "../../general/Dtos";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NewCatalogRecord } from "../newCatalogRecord/NewCatalogRecord";
import { CATALOGS } from "../../general/Constants";

export function Product({product, handleClickSelect, showActions=false, cssClassBorder='',handleReload, isSelected=false}:
    {product:CatalogTypeDto,handleClickSelect?:CallableFunction,showActions?:boolean,handleReload?:CallableFunction, cssClassBorder?:string, handleUpdate?: CallableFunction, isSelected?:boolean}) {

    const modalUpdate = useModalConfirm( );
    const modalDelete = useModalConfirm();

    const handleUpdateModal = (product:CatalogTypeDto) => {
        updateProducto(product).then(() => {
            modalUpdate.handleClose(event);
            if(handleReload)
                handleReload();
            toast.success("Actualizado correctamente.")
        }).catch((error: Error) => toast.error(error.message));
    }



    const handleDeleteModal = (event:MouseEvent) => {
        deleteProducto(product.id).then((response) => {
            if(response.status !== 200){
                toast.error("No se puede eliminar el producto.");
                modalDelete.handleClose(event);
                return;
            }
            modalDelete.handleClose(event);
            if(handleReload)
                handleReload();
            toast.success("Eliminado correctamente.")
        }).catch((error: Error) => toast.error(error.message));
    }
    return (
        <>
            <div key={product.id} className={`container-product-catalog ${cssClassBorder} ${isSelected ? 'product-selected' : ''}`}>
                <div className="producto" key={product.id} onClick={() => (handleClickSelect ?handleClickSelect(product) : null)}>
                    <span className="producto-title">{product.descripcion}</span>
                    <img className="producto-img" src={product.imagen}></img>
                    {showActions && 
                        <div className="container-product-catalog-actions">
                            <button className="btn btn-sm btn-delete" onClick={modalDelete.handleShow} title="Eliminar"><MdDelete size='1.2rem' color="#e04141"></MdDelete></button>
                            <button className="btn btn-sm btn-next" onClick={modalUpdate.handleShow} title="Modificar"><FaEdit  size='1.2rem' ></FaEdit></button>
                        </div>
                    }
                </div>
            </div>
         {modalUpdate.show && 
            <NewCatalogRecord catalogType={CATALOGS.products} handleRealod={handleReload} updateRecordCallback={handleUpdateModal}  handleClose={modalUpdate.handleClose} hasImage={true} record={product}></NewCatalogRecord>
        }
        <ModalConfirm show={modalDelete.show} handleClose={(event:MouseEvent) => modalDelete.handleClose(event)} handleOk={handleDeleteModal} ></ModalConfirm>
        </>
    )
}