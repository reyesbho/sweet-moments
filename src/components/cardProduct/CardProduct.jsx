import './CardProduct.css'
export function CardProduct({product}) {
    return (
        <div key={product.id} className='product'>
            <img className='product-img' src={product.thumbnail} alt={product.nameProduct}></img>
            <div className='product-info'>
                <h6>{product.nameProduct}</h6>
                {product.text ? <p><strong>Texto: </strong>{product.text}</p> : ''}
            </div>
            <ul className='product-properties'>
                Caracteristicas:
                {product.properties.map(property => (
                    <li key={property}>{property}</li>
                ))}
            </ul>
            <span className='product-size'>{product.size} personas</span>
        </div>
    )

}