import { CatalogTypeDto } from "../../general/Interfaces";
import './TableCatalogType.css';
import { FaPlusCircle } from "react-icons/fa";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import { NewCatalogRecord } from "../newCatalogRecord/NewCatalogRecord";
import { CatalogTypeRecord } from "./CatalogTypeRecord";

export function TableCatalogType({title, catalogArray,catalogType, handleReaload, addNewRecord}:{title:String, catalogArray: CatalogTypeDto[],catalogType:string, handleReaload: CallableFunction, addNewRecord: CallableFunction}){
    const {show, handleClose, handleShow} = useModalConfirm();
    return (
        <>
    <div className="catalogType">
        <div className="catalogType-title">
            <h3>{title}</h3>
            <button className='catalogType-add'>
                <FaPlusCircle size="2rem" className='color-success' onClick={(event) => handleShow(event)}></FaPlusCircle>
            </button>
        </div>
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
                    catalogArray.map(catalog => (
                        <CatalogTypeRecord key={catalog.id} catalog={catalog} handleReload={handleReaload}></CatalogTypeRecord>
                    ))
                }
            </tbody>
        </table>
       
    </div>
    
    {show && <NewCatalogRecord catalogType={catalogType} addRecordCallback={addNewRecord} handleClose={handleClose}></NewCatalogRecord>}
    </>   
    )
}