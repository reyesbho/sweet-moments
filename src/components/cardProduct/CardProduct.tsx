import { FaTrash } from 'react-icons/fa'
import { getImage } from '../../general/Constants'
import { ProductOrderDto } from '../../general/Interfaces'
import './CardProduct.css'
export function CardProduct({productItem}:{productItem: ProductOrderDto}) {
    
    return (
        <div key={productItem.id} className='product'>
            <img className='product-img' src={getImage(productItem.product?.key)} 
                loading="lazy"  
                alt={productItem.product?.nameProduct}></img>
            <div className='product-segment'>
            <div className='product-info'>
                <h6>{productItem.product?.nameProduct}</h6>
                {productItem.text ? <p><strong>Texto: </strong>{productItem.text}</p> : ''}
                {productItem.product?.type ? <p><strong>Tipo: </strong>{productItem.product?.type}</p> : ''}
                
            </div>
            <ul className='product-properties'>
            {productItem.product?.flavor ? <p><strong>Sabor: </strong>{productItem.product?.flavor}</p> : ''}
                Comentarios: 
                {productItem.comments ? <p>{productItem.comments}</p> : ''}
            </ul>
            </div>
            <div  className='product-segment'>
            <div className='product-totals'>
                <span className='product-size'>{productItem.key == 'pizza' ? `${productItem.size} Rebanadas` :productItem.key == 'pastel' ||  productItem.key == 'gelatina' ? `${productItem.size} Personas` : `${productItem.size} Piezas`} </span>
                <span className='product-price'>{`$${productItem.price}.00`} </span>
            </div>
            <div className='product-actions'>
                <span className='icon-actions' title='Eliminar'>
                <FaTrash size="1rem" className='color-wrong'></FaTrash>
                </span>
            </div>
            </div>
        </div>
    )

}