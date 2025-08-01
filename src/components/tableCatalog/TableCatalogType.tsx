import './TableCatalogType.css';
import { FaPlusCircle } from "react-icons/fa";
import { useModalConfirm } from "../../hooks/useModalConfirm";
import { NewCatalogRecord } from "../newCatalogRecord/NewCatalogRecord";
import { CatalogTypeRecord } from "./CatalogTypeRecord";
import { TableComponent } from "../tableComponent/tableComponent";
import { useState } from "react";
import { CatalogTypeDto } from '../../general/Dtos';
import Loading from './Loading';

export function TableCatalogType({title, catalogArray,catalogType, handleReload, addNewRecord, hasImage=false, loading}:
    {title:string, catalogArray: CatalogTypeDto[],catalogType:string, handleReload: CallableFunction, addNewRecord: CallableFunction, hasImage?:boolean, loading?:boolean}){
    const sortedCatalogArray = [...catalogArray].sort();
    const {show, handleClose, handleShow} = useModalConfirm();
    const configTable = {
        columns:['Imagen','Descripcion','Tags','Estatus','Actions']
    }
    const [action, setAction] = useState(true);
    const handleTableShow = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setAction(!action);
    }

    return (
        <>
    <div className="catalogType">
        <div className="subtitle" onClick={handleTableShow}>
            <h3>{title}</h3>
            <button className='subtitle-add' onClick={(event) => handleShow(event)}>
                <FaPlusCircle size="2rem" className='color-success' ></FaPlusCircle>
            </button>
        </div>
        {loading && <Loading />}
        <div className={`table-wrapper ${action ? 'show' : ''}`}>
            <TableComponent configTable={configTable} hasImage={hasImage}>
                <tbody>
                {sortedCatalogArray && 
                    sortedCatalogArray.map(catalog => (
                        <CatalogTypeRecord key={catalog.id} catalog={catalog} handleReload={handleReload} hasImage={hasImage}></CatalogTypeRecord>
                    ))
                }
                </tbody>
            </TableComponent>
        </div>
    </div>
    {show && <NewCatalogRecord catalogType={catalogType} handleRealod={handleReload} addRecordCallback={addNewRecord} handleClose={handleClose} hasImage={hasImage}></NewCatalogRecord>}
    </>   
    )
}