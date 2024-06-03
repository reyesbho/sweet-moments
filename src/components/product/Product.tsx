import { useId, useState } from 'react';
import './Product.css';
import { ProductDto, ProductSelectDto } from '../../general/Interfaces';
import { getImage } from '../../general/Constants';

export function Product({product,isCheck,  onClickProduct}:{product:ProductSelectDto,isCheck:boolean,  onClickProduct:CallableFunction}){
   

    const handleClickCheck = (e:any)  => {
        onClickProduct(e, product, !isCheck);
    }
    return (
        <div  className={`product-cat ${isCheck ? 'product-cat-selected':''}`} onClick={(e) => handleClickCheck(e)}>
               <img src={getImage(product.key)} loading='lazy'></img>
               <span>{product.nameProduct}</span>
        </div> 
        
    )    
}