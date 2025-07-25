import { MdClose } from 'react-icons/md';
import './NewCatalogRecord.css';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { CatalogTypeDto } from '../../general/Dtos';
import { SelectMultiple } from '../selectMultiple/SelectMultiple';
import { useProducts } from '../../hooks/useProducts';
import { Producto } from '../../general/interfaces/pedido';
import { CATALOGS, convertImageToWebP } from '../../general/Constants';

export function NewCatalogRecord({record, handleClose,catalogType, addRecordCallback, updateRecordCallback, hasImage, handleRealod}:
    {record?:CatalogTypeDto ,handleClose: CallableFunction,catalogType:string, addRecordCallback?:CallableFunction,updateRecordCallback?:CallableFunction, handleRealod?:CallableFunction, hasImage:boolean}){
    const [image, setImage] = useState<string | undefined>();
    const [selectedValues, setSelectedValues] = useState<Producto[]>([]);
    const {products} = useProducts();

    const { register, handleSubmit, reset, setError, formState: { isSubmitSuccessful, errors},setValue } = useForm<CatalogTypeDto>({
        defaultValues: (
            record ? {
                id: record.id,
                descripcion: record.descripcion,
                imagen: record.imagen,
                estatus: record.estatus,
                tags: record.tags,
                selfDelete: record.selfDelete,
                selfUpdateEstatus: record.selfUpdateEstatus,
                tag:record.tag
            } : {
                id: '',
                descripcion: '',
                imagen: undefined,
                estatus: true,
                tags: undefined,
                selfDelete: undefined,
                selfUpdateEstatus: undefined,
                tag:''
            }
        )
    });

    useEffect(() => {
        reset(record);
        setImage(record?.imagen);
    }, [record]);

    const handleActionSubmit = async (catalog: CatalogTypeDto) => {
        if(catalogType != CATALOGS.products){
            if( selectedValues.length == 0) {
                return;
            }
            catalog.tags = selectedValues.map(v => v.tag);
        }
        
        let result;
        if(updateRecordCallback){
            result = await updateRecordCallback(catalog);
        }
            
        if(addRecordCallback){
            result = await addRecordCallback(catalog);
        }
        if(isSubmitSuccessful && result.success){
            if(handleRealod)
                handleRealod();
            reset();
            handleClose();
        }
    }


    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;
             if (file.size > 5242880) { // 5 MB in bytes
                setError('imagen', {
                    type:'manual',
                    message:'Tamaño maximo 5MB'
                });
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

    const handleSelectChange = (option:Producto) => {
            const newSelectedValues:Producto[] = 
            selectedValues.some(reg => reg.id === option.id)
                ? selectedValues.filter(v => v.id !== option.id)
                : [...selectedValues, option];
            setSelectedValues(newSelectedValues);
    }
    return(
        <div className="main-modal ">
            <div className='modal-container catalogRecord container-detailProducto'>
                <span className="main-modal-close" onClick={() => handleClose()}><MdClose size={'2rem'}></MdClose></span>
                <h3>Agregar nuevo registro</h3>
                <form onSubmit={handleSubmit(handleActionSubmit)}>
                {image && <img className="producto-img" src={image}></img>}
                    {hasImage && <div className='form-input'>
                        <label  htmlFor='fileImage'>Imagen</label>
                        <input id='fileImage' type="file" accept="image/webp, image/jpeg, image/png" src=''  onChange={handleFileChange} />
                        {errors.imagen && <p>{errors.imagen?.message}</p>}
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
                        {errors.descripcion && <p>{errors.descripcion?.message}</p>}
                    </div>
                        {catalogType == CATALOGS.products && <div className='form-input'>
                            <label htmlFor='tag' >Etiqueta</label>
                            <input id='tag' type='text' {...register("tag",{
                                required:{
                                    value: true,
                                    message:"Valor requerido"
                                },
                                maxLength:{
                                    value: 50,
                                    message:"Maximo 10 caracteres"
                                },
                                pattern:{
                                    value: /^[a-z\s]{0,10}$/,
                                    message: "Solo letras minusculas y máximo 10 caracteres"
                                }
                            })}></input>
                            {errors.tag && <p>{errors.tag?.message}</p>}
                        </div>
                        }
                    {catalogType != CATALOGS.products &&
                        <div>
                            <label htmlFor='descriptionCatalog' >Aplica para</label>
                            <SelectMultiple 
                                options={products || []}
                                selectedValues={selectedValues}
                                onChange={handleSelectChange}
                            />
                        </div>
                    }
                    <div className='buttons'>
                        <button className='btn btn-cancel btn-md' onClick={() => handleClose()}>Cancelar</button>
                        <button type='submit' className='btn btn-add btn-md'>Registrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}