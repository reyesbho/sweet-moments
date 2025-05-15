import { MdClose } from 'react-icons/md';
import './NewCatalogRecord.css';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { CatalogTypeDto } from '../../general/Dtos';
import { add } from 'date-fns';

export function NewCatalogRecord({record, handleClose, addRecordCallback, updateRecordCallback, hasImage}:
    {record?:CatalogTypeDto ,handleClose: CallableFunction,catalogType:string, addRecordCallback?:CallableFunction,updateRecordCallback?:CallableFunction,hasImage:boolean}){
    const [image, setImage] = useState<string | undefined>();
    const { register, handleSubmit, reset, formState: { isSubmitSuccessful, errors},setValue } = useForm<CatalogTypeDto>({
        defaultValues: (
            record ? {
                id: record.id,
                clave: record.clave,
                descripcion: record.descripcion,
                imagen: record.imagen,
                estatus: record.estatus,
                tags: record.tags,
                selfDelete: record.selfDelete,
                selfUpdateEstatus: record.selfUpdateEstatus
            } : {
                id: 0,
                clave: '',
                descripcion: '',
                imagen: undefined,
                estatus: true,
                tags: undefined,
                selfDelete: undefined,
                selfUpdateEstatus: undefined
            }
        )
    });

    useEffect(() => {
        reset(record);
        setImage(record?.imagen);
    }, [record]);

    const handleAction = (catalog: CatalogTypeDto) => {
        if(updateRecordCallback)
            updateRecordCallback(catalog);
        if(addRecordCallback)
            addRecordCallback(catalog);
        handleClose();
    }


      const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
             if (file.size > 5242880) { // 5 MB in bytes
                alert('File size exceeds 5 MB. Please choose a smaller file.');
                return;
            }

            try {
                const webpBlob = await convertImageToWebP(file);
                const url = URL.createObjectURL(webpBlob);

                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result) {
                        const base64String = reader.result.toString();
                        setValue('imagen', base64String);
                        setImage(base64String);
                        }
                };
                reader.readAsDataURL(webpBlob);
            } catch (error) {
                console.error('Error al convertir imagen:', error);
            }
        }


      const convertImageToWebP = (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            const img = new Image();

            reader.onload = (e) => {
            img.src = e.target?.result as string;
            };

            img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = 150;
            canvas.height = 150;

            if (ctx) {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                canvas.toBlob(
                (blob) => {
                    if (blob) resolve(blob);
                    else reject(new Error('No se pudo convertir a WebP'));
                },
                'image/webp',
                0.8
                );
            } else {
                reject(new Error('Canvas context inválido'));
            }
            };

            reader.onerror = reject;
            img.onerror = reject;

            reader.readAsDataURL(file);
        });
        }
    return(
        <div className="main-modal ">
            <div className='modal-container catalogRecord container-detailProducto'>
                <span className="main-modal-close" onClick={() => handleClose()}><MdClose size={'2rem'}></MdClose></span>
                <h3>Agregar nuevo registro</h3>
                <form onSubmit={handleSubmit(handleAction)}>
                {image && <img className="producto-img" src={image}></img>}
                    {hasImage && <div className='form-input'>
                        <label  htmlFor='fileImage'>Imagen</label>
                        <input id='fileImage' type="file" accept="image/webp, image/jpeg, image/png" src=''  onChange={handleFileChange} />
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