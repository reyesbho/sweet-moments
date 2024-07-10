import { MdClose } from "react-icons/md"
import { DetailProductoRequest, ProductDto } from "../../general/Interfaces"
import { useForm } from "react-hook-form";
import { useCatalogs } from "../../hooks/useCatalogs";
import './newDetailOrder.css'
import { createDetalleProducto } from "../../services/detalleProducto.services";

export function NewDetailOrder({handleClose, product, handleReload=() => {}}:
    {handleClose: CallableFunction, product:ProductDto,handleReload:CallableFunction}){
        const {sizes, typePayments} = useCatalogs()
    
        const { register, handleSubmit, reset, formState: { isSubmitSuccessful, errors },setValue } = useForm<DetailProductoRequest>({
            defaultValues: {
               idProducto:0, 
               idSize: undefined,
               idTipoCobro: undefined,
               descripcion: undefined,
               precio:undefined
            }
        });

        const handleAddDetailProduct = (newRecord: DetailProductoRequest) =>{
            newRecord.idProducto = product.id;
            createDetalleProducto(newRecord).then(() => {
                handleReload();
                handleClose();
            })
        }

    return (
        <div className="main-modal" >
            <div className="modal-container container-detailProducto" >
            <span className="main-modal-close" onClick={(e) => handleClose(e)}><MdClose size={'2rem'}></MdClose></span>
            <h3>Nuevo tipo de {product.nameProduct}</h3>
                <form onSubmit={handleSubmit(handleAddDetailProduct)}>
                    <div className="form-input-sm">
                        <label>Tipo:</label>
                        <select {...register("idTipoCobro",{
                            required:{
                                value: true,
                                message:"Valor requerido"
                            }
                        })}>
                        {typePayments && typePayments.map((type) =>(
                            <option key={type.id} value={type.id}>{type.descripcion}</option>
                        ))}
                        </select>
                        {errors.idTipoCobro && <p>{errors.idTipoCobro.message}</p>}
                    </div>
                    <div className="form-input-sm">
                        <label>Tamaño:</label>
                        <select {...register("idSize",{
                            required:{
                                value: true,
                                message:"Valor requerido"
                            }
                        })}>
                        {sizes && sizes.map((type) =>(
                            <option key={type.id} value={type.id}>{type.descripcion}</option>
                        ))}
                        </select>
                        {errors.idSize && <p>{errors.idSize.message}</p>}
                    </div>
                    <div className="form-input-sm">
                        <label>Comentarios:</label>
                        <input type="text" {...register("descripcion")}></input>
                    </div>
                    <div className="form-input-sm">
                        <label>Precio:</label>
                        <input type="number" {...register("precio",{
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