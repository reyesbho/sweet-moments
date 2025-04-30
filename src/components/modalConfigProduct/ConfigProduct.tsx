import { MdClose } from 'react-icons/md';
import './ConfigProduct.css';
import { useCatalogs } from '../../hooks/useCatalogs';
import { CatalogTypeDto, DetailProductoDto } from '../../general/Dtos';
import { useEffect, useState } from 'react';

export function ModalConfigProduct({handleClose,detailProducts}:
    {handleClose: CallableFunction, detailProducts: DetailProductoDto[]}){
        const {flavors, typeProducts, sizes, handleTogleReload, addNewRecord} = useCatalogs();
        const optionsSelection = [
            {clave:"sabor", descripcion: 'Sabor', options: flavors},
            {clave:"size", descripcion: 'Tamaño', options: sizes},
            {clave:"tipoProducto", descripcion: 'Tipo Producto', options: typeProducts}
        ]
        const [optionsSelected, setOptionsSelected] = useState<CatalogTypeDto[]>([]);
        useEffect(() => {
            setOptionsSelected(flavors);
        }
        , []);

        const handleSelectOption = (event: any, options: CatalogTypeDto[]) => {
            event.preventDefault();
            event.stopPropagation();
            setOptionsSelected(options);
        }

        const checkFlavors = () => {
            detailProducts.forEach((detailProduct) => {
                
            });
        }

    return(
        <div className="main-modal ">
            <div className='modal-container catalogRecord '>
                <span className="main-modal-close" onClick={() => handleClose()}><MdClose size={'2rem'}></MdClose></span>
                <h3>Configurar producto</h3>
                <form >
                    <div className='container-configProduct'>
                        <div className='container-configProduct-selection'>
                            <div className='container-configProduct-selection-title'>
                                <span className='container-configProduct-selection-title'>Atributos</span>
                            </div>
                            {optionsSelection.map((option) => (
                                <div className='container-configProduct-selection-option' key={option.clave} onClick={(event) => handleSelectOption(event, option.options)}>
                                    <span >{option.descripcion}</span>
                                </div>
                            ))}
                        </div>
                        <div className='container-configProduct-selection'>
                            <div className='container-configProduct-selection-title'>
                                <span className='container-configProduct-selection-title'>Opciones</span>
                            </div>
                            { optionsSelected && optionsSelected.map((option) => (
                                <div className='container-configProduct-selection-option' key={option.id}>
                                    <div className="checkbox-apple">
                                        <input className="yep" id={`check-apple-${option.id}-${option.clave}`} type="checkbox"  />
                                        <label htmlFor={`check-apple-${option.id}-${option.clave}`}></label>
                                    </div>
                                    <span>{option.descripcion}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='buttons'>
                        <button className='btn btn-cancel btn-md' onClick={() => handleClose()}>Cancelar</button>
                        <button type='submit' className='btn btn-add btn-md'>Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}