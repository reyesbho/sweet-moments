import { useId, useState } from 'react';
import './Product.css';
export function Product({product,isCheck,  onClickProduct}){
    const productInputId = useId();
    const handleClickCheck = (e)  => {
        onClickProduct(e, product, !isCheck);
    }
    return (
        <div  className={`product-cat ${isCheck ? 'product-cat-selected':''}`} onClick={(e) => handleClickCheck(e)}>
               <img src={product.thumbnail}></img>
               <span>{product.nameProduct}</span>
        </div> 
        
    )    
}