import { FaTrash } from 'react-icons/fa'
import { ProductOrderDto } from '../../general/Interfaces'
import './CardProduct.css'
import { useModalConfirm } from '../../hooks/useModalConfirm';
import { ModalConfirm } from '../modal/Modal';
import { deleteProductoPedido } from '../../services/pedidos.services';
export function CardProduct({productItem,reload }:{productItem: ProductOrderDto, reload: CallableFunction}) {
    const {show, handleShow, handleClose} = useModalConfirm();

    const handleDeleteProducPedido = () => {
        deleteProductoPedido({idPedido:productItem.idPedido, idProductoPedido:productItem.id})
        .then((res) => {
            reload(productItem.id);
        })
    }
    
    return (
        <section>
        <div key={productItem.id} className='product'>
            <img className='product-img' src={productItem.detalleProducto.producto.thumbnail} 
                loading="lazy"  
                alt={productItem.detalleProducto.producto?.nameProduct}></img>
            <div className='product-segment'>
                <h2>{productItem.detalleProducto.producto?.nameProduct}</h2>
                <ul className='product-properties'>
                    <li>{productItem.comentarios && <p><strong>Texto: </strong>{productItem.comentarios}</p> }</li>
                    <li>{productItem.tipoProducto && <p><strong>Tipo: </strong>{productItem.tipoProducto?.descripcion }</p>}</li>
                    <li>{productItem.sabor.clave && <p><strong>Sabor: </strong>{productItem.sabor.descripcion}</p>}</li>
                    <li>{productItem.cantidad && productItem.cantidad > 1 && <p><strong>Cantidad: </strong>{productItem.cantidad}</p>}</li>
                    <li>{productItem.detalleProducto.precio > 0 && <p><strong>Precio: </strong>${productItem.detalleProducto.precio}</p>}</li>
                    <li>{productItem.descuento > 0 && <p><strong>Descuento: </strong>${productItem.descuento}</p>}</li>
                    <li>{productItem.detalleProducto.descripcion && <div className='product-comments'><strong>Detalles: </strong><p >{productItem.detalleProducto.descripcion}</p></div>}</li>                    
                </ul>
            </div>
            <div  className='product-segment'>
                <hr />
                <div className='product-totals'>
                    <span className='product-size'>{productItem.detalleProducto.size.descripcion} </span>
                    <span className='product-price'>{`$${productItem.total}`} </span>
                    <span onClick={(event) => handleShow(event)} className='icon-actions' title='Eliminar'>
                    <FaTrash size="1rem" className='color-wrong'></FaTrash>
                    </span>
                </div>
            </div>
        </div>
        <ModalConfirm show={show} handleClose={handleClose} handleOk={handleDeleteProducPedido} ></ModalConfirm>
        </section>
    )

}