import { CatalogTypeDto } from "../../general/Interfaces";
import './TableCatalogType.css';
import { FaPlusCircle } from "react-icons/fa";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import { NewCatalogRecord } from "../newCatalogRecord/NewCatalogRecord";
import { CatalogTypeRecord } from "./CatalogTypeRecord";

export function TableCatalogType({title, catalogArray,catalogType, handleReaload, addNewRecord, hasImage=false}:
    {title:String, catalogArray: CatalogTypeDto[],catalogType:string, handleReaload: CallableFunction, addNewRecord: CallableFunction, hasImage?:boolean}){
    const {show, handleClose, handleShow} = useModalConfirm();
    return (
        <>
    <div className="catalogType">
        <div className="subtitle">
            <h3>{title}</h3>
            <button className='subtitle-add'>
                <FaPlusCircle size="2rem" className='color-success' onClick={(event) => handleShow(event)}></FaPlusCircle>
            </button>
        </div>
        <table className="table">
            <thead>
                <tr>
                    {hasImage && <th>Imagen</th>}
                    <th>Descripcion</th>
                    <th>Clave</th>
                    <th>Estatus</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {catalogArray && 
                    catalogArray.map(catalog => (
                        <CatalogTypeRecord key={catalog.id} catalog={catalog} handleReload={handleReaload}></CatalogTypeRecord>
                    ))
                }
            </tbody>
        </table>
       
    </div>
    
    {show && <NewCatalogRecord catalogType={catalogType} addRecordCallback={addNewRecord} handleClose={handleClose} hasImage={hasImage}></NewCatalogRecord>}
    </>   
    )
}