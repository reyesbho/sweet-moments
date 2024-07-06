import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete } from "react-icons/md";
import { CatalogTypeDto } from "../../general/Interfaces";
import './EntityType.css';
import { FaPlusCircle } from "react-icons/fa";
import { ModalConfirm } from "../modal/Modal";
import { useState } from "react";
import { useModalConfirm } from "../../hooks/useModalConfirm";

export function EntityType({title, catalogType, handleReaload}:{title:String, catalogType: CatalogTypeDto[], handleReaload: CallableFunction}){
    const {show, handleClose, handleShow } = useModalConfirm();
    const [entity, setEntity] = useState<CatalogTypeDto | null>(null);
    const [action, setAction] = useState<CallableFunction>(() => {});
    
    const handleClickAction = (catalog: CatalogTypeDto, newAction:CallableFunction) => {
        handleShow();
        setEntity(catalog);
        setAction(newAction);
    }
  
    const handleUpdateModal = () => {
        entity?.selfUpdateEstatus(!entity.estatus).then(
            () => {
                handleReaload();
                handleClose();
            }
        );   
    }

    const handleDeleteModal = () => {
        entity?.selfDelete(entity.id).then(
            () => {
                handleReaload();
                handleClose();
            }
        );   
    }

    return (
        <>
    <div className="catalogType">
        <h3>{title}</h3>
        <button className='catalogType-add'>
            <FaPlusCircle size="2rem" className='color-success'></FaPlusCircle>
        </button>
        <table className="table">
            <thead>
                <tr>
                    <th>Descripcion</th>
                    <th>Clave</th>
                    <th>Estatus</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {catalogType && 
                    catalogType.map(catalog => (
                        <tr key={catalog.id}>
                            <td>{catalog.descripcion}</td>
                            <td>{catalog.clave}</td>
                            <td>{catalog.estatus ? 'ACTIVO' : 'INACTIVO'}</td>
                            <td className="table-actions">                                
                                <span onClick={() =>handleClickAction(catalog, handleUpdateModal)}><MdCheckBox size='1.2rem'></MdCheckBox></span>
                                <span onClick={() =>handleClickAction(catalog, handleDeleteModal)}><MdDelete size='1.2rem' color="#e04141"></MdDelete></span>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
       
    </div>
    <ModalConfirm show={show} handleClose={handleClose} handleOk={action} ></ModalConfirm>
    </>   
    )
}