import './Product.css';
export function Product({product}){
    return (
        <div className="product-cat">
            <img src={product.thumbnail}></img>
            <span>{product.name}</span>
        </div>
    )    
}