import { MdClose } from "react-icons/md"
import { DetailProductoRequest, ProductDto } from "../../general/Interfaces"
import { useForm } from "react-hook-form";
import { useCatalogs } from "../../hooks/useCatalogs";
import './newDetailOrder.css'
import { createDetalleProducto } from "../../services/detalleProducto.services";
import { useState } from "react";

export function NewDetailOrder({handleClose, product, handleReload=() => {}}:
    {handleClose: CallableFunction, product:ProductDto,handleReload:CallableFunction}){
        const {sizes, typePayments} = useCatalogs()
        const [image, setImage] = useState<string | undefined>();
    
        const { register, handleSubmit, reset, formState: { isSubmitSuccessful, errors },setValue} = useForm<DetailProductoRequest>({
            defaultValues: {
               idProducto:0, 
               idSize: undefined,
               idTipoCobro: undefined,
               descripcion: undefined,
               precio:undefined,
               imagen:undefined
            }
        });

        const handleAddDetailProduct = (newRecord: DetailProductoRequest) =>{
            newRecord.idProducto = product.id;
            createDetalleProducto(newRecord).then(() => {
                handleReload();
                handleClose();
            })
        }
        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                if (reader.result) {
                  const base64String = reader.result.toString();
                  setValue('imagen', base64String);
                  setImage(base64String);
                }
              };
              reader.readAsDataURL(file);
            }
          };

    return (
        <div className="main-modal" >
            <div className="modal-container container-detailProducto" >
            <span className="main-modal-close" onClick={(e) => handleClose(e)}><MdClose size={'2rem'}></MdClose></span>
            <h3>Nuevo tipo de {product.nameProduct}</h3>
                <form onSubmit={handleSubmit(handleAddDetailProduct)}>
                    {image && <img className="detailProduct-img" src={image}></img>}
                    <div className='form-input'>
                        <label >Imagen</label>
                        <input type="file" accept="image/webp" onChange={handleFileChange} />
                    </div>
                    <div className="form-input">
                        <label htmlFor="idTipoCobro">Tipo:</label>
                        <select id="idTipoCobro" {...register("idTipoCobro",{
                            required:{
                                value: true,
                                message:"Valor requerido"
                            }
                        })}>
                        <option value={undefined}>Seleccionar</option>
                        {typePayments && typePayments.map((type) =>(
                            <option key={type.id} value={type.id}>{type.descripcion}</option>
                        ))}
                        </select>
                        {errors.idTipoCobro && <p>{errors.idTipoCobro.message}</p>}
                    </div>
                    <div className="form-input">
                        <label htmlFor="idSize">Tamaño:</label>
                        <select id="idSize" {...register("idSize",{
                            required:{
                                value: true,
                                message:"Valor requerido"
                            }
                        })}>
                        <option value={undefined}>Seleccionar</option>
                        {sizes && sizes.map((type) =>(
                            <option key={type.id} value={type.id}>{type.descripcion}</option>
                        ))}
                        </select>
                        {errors.idSize && <p>{errors.idSize.message}</p>}
                    </div>
                    <div className="form-input">
                        <label htmlFor="descripcion">Comentarios:</label>
                        <input id="descripcion" type="text" {...register("descripcion")}></input>
                    </div>
                    <div className="form-input">
                        <label htmlFor="precio">Precio:</label>
                        <input id="precio" type="number" {...register("precio",{
                            required:{
                                value: true,
                                message:"Valor requerido"
                            }
                        })} placeholder="$0"></input>
                    </div>
                    <button type="submit" className="btn btn-add">Agregar producto</button>
                </form>
            </div>
            
        </div>
    )
} 