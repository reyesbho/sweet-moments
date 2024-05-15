import { Product } from '../../general/Interfaces'
import './CardProduct.css'
export function CardProduct({productItem}:{productItem: Product}) {
    return (
        <div key={productItem.id} className='product'>
            <img className='product-img' src={productItem.product?.thumbnail} 
                alt={productItem.product?.nameProduct}></img>
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
            <div className='product-totals'>
                <span className='product-size'>{productItem.key == 'pizza' ? `${productItem.size} Rebanadas` :productItem.key == 'pastel' ||  productItem.key == 'gelatina' ? `${productItem.size} Personas` : `${productItem.size} Piezas`} </span>
                <span className='product-price'>{`$${productItem.price}.00`} </span>
            </div>
        </div>
    )

}