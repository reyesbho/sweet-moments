import { useState } from "react";
import { Product } from "../product/Product";
import './Carousel.css'
export function Carousel({products, onClickSelected}){
    const [productsList, setProductsList] = useState(structuredClone(products).map(product => ({...product, isCheck:false })));

    const handleOnChange = (event, productSelected, active) => { 
        event.preventDefault();
        if(active){
            const newProductSelected = {...productSelected, isCheck: active}
            onClickSelected(newProductSelected)
            const newListProducts =[...productsList].map(product => (product.id === productSelected.id) ? newProductSelected: {...product, isCheck:false}); 
            setProductsList(newListProducts)
        } else{
            const newProductsList = structuredClone(productsList);
            setProductsList(newProductsList.slice().map(product => ({...product, isCheck:false })))
        }
    }

    
    return (
        <div className="carousel-container">
            { productsList &&
                productsList.map((product) => (
                    <Product  key={product.id} product={product} isCheck={product.isCheck} onClickProduct={handleOnChange}></Product>
                ))
            }
        </div>
    )
}