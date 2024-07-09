import './DetailProduct.css';
import { DetailProductoDto } from "../../general/Interfaces";

export function DetailProduct({detailProduct, handleDetailProductSelected}:{detailProduct:DetailProductoDto, handleDetailProductSelected?:CallableFunction}){
    return (
        <div className="detailProduct" key={detailProduct.id} onClick={handleDetailProductSelected ?() => handleDetailProductSelected(detailProduct) : () => {}}>
            <img className="detailProduct-img" src={detailProduct.producto.thumbnail}></img>
            <div className="detailProduct-info">
                <ul>
                    <li><strong>{detailProduct.size.descripcion}</strong></li>
                    <li><span>Precio: </span>${detailProduct.precio}</li>
                    {detailProduct.descripcion && <li><span>Detalles: </span>{detailProduct.descripcion}</li>}
                </ul>
            </div>
        </div>
    )
}