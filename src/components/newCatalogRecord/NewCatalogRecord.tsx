import { MdClose } from 'react-icons/md';
import './NewCatalogRecord.css';
import { CatalogTypeDto } from '../../general/Interfaces';
import { useForm } from 'react-hook-form';

export function NewCatalogRecord({handleClose,catalogType, addRecordCallback}:{handleClose: CallableFunction,catalogType:string, addRecordCallback:CallableFunction}){

    const { register, handleSubmit, reset, formState: { isSubmitSuccessful } } = useForm<CatalogTypeDto>({
        defaultValues: {
            clave: undefined,
            descripcion: undefined,
        }
    });

    const handleRegister = (catalog: CatalogTypeDto) => {
        addRecordCallback(catalogType, catalog);
        handleClose();
    }

    return(
        <div className="main-modal ">
            <div className='modal-container catalogRecord'>
            <span className="main-modal-close" onClick={() => handleClose()}><MdClose size={'2rem'}></MdClose></span>
            <h3>Agregar nuevo registro</h3>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className='form-input'>
                        <label >Descripcion</label>
                        <input type='text' {...register("descripcion",{
                            required:{
                                value: true,
                                message:"Valor requerido"
                            }
                        })}></input>
                    </div>
                    <div className='form-input'>
                        <label >Clave</label>
                        <input type='text' {...register("clave",{
                            required:{
                                value: true,
                                message:"Valor requerido"
                            },
                            pattern:{
                                value:new RegExp('^([a-z])+$'),
                                message:"Formato invalido"
                            }
                        })}></input>
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