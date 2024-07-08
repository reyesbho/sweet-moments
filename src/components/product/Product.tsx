import './Product.css';
import { ProductSelectDto } from '../../general/Interfaces';

export function Product({product,isCheck,  onClickProduct}:{product:ProductSelectDto,isCheck:boolean,  onClickProduct:CallableFunction}){
   

    const handleClickCheck = (e:any)  => {
        onClickProduct(e, product, !isCheck);
    }
    return (
        <div  className={`product-cat ${isCheck ? 'product-cat-selected':''}`} onClick={(e) => handleClickCheck(e)}>
               <img src={product.thumbnail} loading='lazy'></img>
               <span>{product.nameProduct}</span>
        </div> 
        
    )    
}