import { useEffect, useState } from "react";
import { Product } from "../product/Product";
import './Carousel.css'
export function Carousel({products, onClickSelected}){
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        setProductsList(structuredClone(products))
    },[])

    const handleOnChange = (event, productSelected) => { 
        event.preventDefault();
        const value = event.target.checked;
        if(value){
            const newProductSelected = {...productSelected, isCheck: value}
            onClickSelected(newProductSelected)
            setProductsList(productsList.slice().map(product => (product.id === productSelected.id) ? newProductSelected: {...product, isCheck:false}))
        } else{
            const newProductsList = structuredClone(productsList);
            setProductsList(newProductsList.slice().map(product => ({...product, isCheck:false })))
            onClickSelected(null)
        }
    }

    
    return (
        <div className="carousel-container">
            { productsList && productsList.length > 0 &&
                productsList.map((product) => (
                    <Product  key={product.id} product={product} isCheck={product.isCheck} onClickProduct={handleOnChange}></Product>
                ))
            }
        </div>
    )
}