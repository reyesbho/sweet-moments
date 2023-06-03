import { Product } from "../product/Product";
import './Carousel.css'
export function Carousel({products}){
    const productsList = products.slice();
    return (
        <div className="carousel-container">
            {
                productsList.map((product) => (
                    <Product key={product.id} product={product}></Product>
                ))
            }
        </div>
    )
}