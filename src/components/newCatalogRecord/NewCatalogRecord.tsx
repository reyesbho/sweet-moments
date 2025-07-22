import { MdClose } from 'react-icons/md';
import './NewCatalogRecord.css';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { CatalogTypeDto } from '../../general/Dtos';
import { SelectMultiple } from '../selectMultiple/SelectMultiple';
import { useProducts } from '../../hooks/useProducts';
import { Producto } from '../../general/interfaces/pedido';

export function NewCatalogRecord({record, handleClose, addRecordCallback, updateRecordCallback, hasImage, handleRealod}:
    {record?:CatalogTypeDto ,handleClose: CallableFunction,catalogType:string, addRecordCallback?:CallableFunction,updateRecordCallback?:CallableFunction, handleRealod:CallableFunction, hasImage:boolean}){
    const [image, setImage] = useState<string | undefined>();
    const [selectedValues, setSelectedValues] = useState<Producto[]>([]);
    const {products} = useProducts();

    const { register, handleSubmit, reset, formState: { isSubmitSuccessful, errors},setValue } = useForm<CatalogTypeDto>({
        defaultValues: (
            record ? {
                id: record.id,
                descripcion: record.descripcion,
                image: record.image,
                estatus: record.estatus,
                tags: record.tags,
                selfDelete: record.selfDelete,
                selfUpdateEstatus: record.selfUpdateEstatus
            } : {
                id: '',
                descripcion: '',
                image: undefined,
                estatus: true,
                tags: undefined,
                selfDelete: undefined,
                selfUpdateEstatus: undefined
            }
        )
    });

    useEffect(() => {
        reset(record);
        setImage(record?.image);
    }, [record]);

    const handleAction = async (catalog: CatalogTypeDto) => {
        if(selectedValues.length == 0) {
            return;
        }
        catalog.tags = selectedValues.map(v => v.tag);
        let result;
        if(updateRecordCallback){
            result = await updateRecordCallback(catalog);
        }
            
        if(addRecordCallback){
            result = await addRecordCallback(catalog);
        }
        if(isSubmitSuccessful && result.success){
            handleRealod();
            reset();
            handleClose();
        }
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
                        setValue('image', base64String);
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
                    <div>
                        <label htmlFor='descriptionCatalog' >Aplica para</label>
                        <SelectMultiple 
                            options={products || []}
                            selectedValues={selectedValues}
                            onChange={handleSelectChange}
                        />
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