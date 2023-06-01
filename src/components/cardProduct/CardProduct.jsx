import './CardProduct.css'
export function CardProduct({productItem}) {
    return (
        <div key={productItem.id} className='product'>
            <img className='product-img' src={productItem.product?.thumbnail} 
                alt={productItem.product?.nameProduct}></img>
            <div className='product-info'>
                <h6>{productItem.product?.nameProduct}</h6>
                {productItem.text ? <p><strong>Texto: </strong>{productItem.text}</p> : ''}
            </div>
            <ul className='product-properties'>
                Caracteristicas:
                {productItem.properties.map(property => (
                    <li key={property}>{property}</li>
                ))}
            </ul>
            <span className='product-size'>{productItem.size} personas</span>
        </div>
    )

}