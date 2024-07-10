import { CatalogTypeDto } from "../../general/Interfaces";
import './TableCatalogType.css';
import { FaPlusCircle } from "react-icons/fa";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import { NewCatalogRecord } from "../newCatalogRecord/NewCatalogRecord";
import { CatalogTypeRecord } from "./CatalogTypeRecord";
import { TableComponent } from "../tableComponent/tableComponent";

export function TableCatalogType({title, catalogArray,catalogType, handleReaload, addNewRecord, hasImage=false}:
    {title:String, catalogArray: CatalogTypeDto[],catalogType:string, handleReaload: CallableFunction, addNewRecord: CallableFunction, hasImage?:boolean}){
    const {show, handleClose, handleShow} = useModalConfirm();
    const configTable = {
        columns:['Imagen','Descripcion','Clave','Estatus','Actions']
    }


    return (
        <>
    <div className="catalogType">
        <div className="subtitle">
            <h3>{title}</h3>
            <button className='subtitle-add'>
                <FaPlusCircle size="2rem" className='color-success' onClick={(event) => handleShow(event)}></FaPlusCircle>
            </button>
        </div>
        <TableComponent configTable={configTable} hasImage={hasImage}>
             <tbody>
             {catalogArray && 
                 catalogArray.map(catalog => (
                     <CatalogTypeRecord key={catalog.id} catalog={catalog} handleReload={handleReaload}></CatalogTypeRecord>
                 ))
             }
             </tbody>
        </TableComponent>
       
    </div>
    {show && <NewCatalogRecord catalogType={catalogType} addRecordCallback={addNewRecord} handleClose={handleClose} hasImage={hasImage}></NewCatalogRecord>}
    </>   
    )
}