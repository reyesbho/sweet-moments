import './CardProduct.css'
export function CardProduct({productItem}) {
    console.log(productItem)
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
            <span className='product-size'>{productItem.size} personas</span>
        </div>
    )

}