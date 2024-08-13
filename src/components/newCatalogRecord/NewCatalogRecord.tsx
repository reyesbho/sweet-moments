import { MdClose } from 'react-icons/md';
import './NewCatalogRecord.css';
import { CatalogTypeDto } from '../../general/Interfaces';
import { useForm } from 'react-hook-form';

export function NewCatalogRecord({handleClose,catalogType, addRecordCallback, hasImage}:
    {handleClose: CallableFunction,catalogType:string, addRecordCallback:CallableFunction,hasImage:boolean}){

    const { register, handleSubmit, reset, formState: { isSubmitSuccessful, errors},setValue } = useForm<CatalogTypeDto>({
        defaultValues: {
            clave: undefined,
            descripcion: undefined,
            image: undefined
        }
    });

    const handleRegister = (catalog: CatalogTypeDto) => {
        addRecordCallback(catalogType, catalog);
        handleClose();
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              const base64String = reader.result.toString();
              setValue('image', base64String);
            }
          };
          reader.readAsDataURL(file);
        }
      };

    return(
        <div className="main-modal ">
            <div className='modal-container catalogRecord'>
            <span className="main-modal-close" onClick={() => handleClose()}><MdClose size={'2rem'}></MdClose></span>
            <h3>Agregar nuevo registro</h3>
                <form onSubmit={handleSubmit(handleRegister)}>
                    {hasImage && <div className='form-input'>
                        <label  htmlFor='fileImage'>Imagen</label>
                        <input id='fileImage' type="file" accept="image/webp" onChange={handleFileChange} />
                    </div>}
                    <div className='form-input'>
                        <label htmlFor='descriptionCatalog' >Descripcion</label>
                        <input id='descriptionCatalog' type='text' {...register("descripcion",{
                            required:{
                                value: true,
                                message:"Valor requerido"
                            },
                            maxLength:{
                                value: 50,
                                message:"Maximo 50 caracteres"
                            }
                        })}></input>
                    </div>
                    <div className='form-input'>
                        <label htmlFor='keyCatalog' >Clave</label>
                        <input id='keyCatalog' type='text' {...register("clave",{
                            required:{
                                value: true,
                                message:"Valor requerido"
                            },
                            pattern:{
                                value:new RegExp('^([a-z])+$'),
                                message:"Solo minusculas, sin caracteres especiales"
                            }
                        })}></input>
                        {errors.clave && <p>{errors.clave?.message}</p>}
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