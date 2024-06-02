import { useId, useState } from 'react';
import './Product.css';
import { ProductDto, ProductSelectDto } from '../../general/Interfaces';
import pasteilImg from '../../assets/pastel.webp';
import pizzaImg from '../../assets/pizza.webp';
import gelatinaImg from '../../assets/gelatina.webp';
import coopcakesImg from '../../assets/coopcakes.webp';

export function Product({product,isCheck,  onClickProduct}:{product:ProductSelectDto,isCheck:boolean,  onClickProduct:CallableFunction}){
    const getImage = (productKey: string) => {
        let img;
        switch(productKey){
            case 'pizza':
                img = pizzaImg;
                break;
            case 'pastel':
                img = pasteilImg;
                break;
            case 'coop_cake':
                img = coopcakesImg;
                break;
            default: 
                img = gelatinaImg;
        }
        return img;
    }

    const handleClickCheck = (e:any)  => {
        onClickProduct(e, product, !isCheck);
    }
    return (
        <div  className={`product-cat ${isCheck ? 'product-cat-selected':''}`} onClick={(e) => handleClickCheck(e)}>
               <img src={getImage(product.key)}></img>
               <span>{product.nameProduct}</span>
        </div> 
        
    )    
}