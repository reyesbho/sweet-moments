import { useId, useState } from 'react';
import './Product.css';
export function Product({product,isCheck,  onClickProduct}){
  
    const productInputId = useId();
    return (
        <>
            <label htmlFor={productInputId} className={`product-cat ${isCheck ? 'product-cat-selected':''}`}>
               <img src={product.thumbnail}></img>
               <span>{product.nameProduct}</span>
            </label>
            <input id={productInputId} onChange={(e) => onClickProduct(e, product)}  type="checkbox"  hidden/>
        </>
        
    )    
}