import { classStatusEnum } from "../../general/Status";
import { CardProduct } from "../cardProduct/CardProduct";
import { CardOrderInfo } from "../cardOrderInfo/CardOrderInfo";
import './DetailOrder.css'
import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";

export function DetailOrder({ order }) {
    console.log(order)
      const {id} = useParams();
      const {orderItem,cssClassName, hasReturn, loading, error} = useOrder({order, orderId:id});
      const navigate = useNavigate();

      const handleClicHome = (event) => {
        event.preventDefault();
        event.stopPropagation();
        navigate("/");
      }
    return (
    <div className="detailOrder">
        <div className="detail-title">
            {hasReturn &&
                <button className='button-back' onClick={(e) => handleClicHome(e)}>
                        <IoIosArrowBack size="2.5rem" />
                </button>
            }
            <h2>Detalle de pedido: {orderItem?.id}</h2>
        </div>
        {orderItem &&
            <div className={`detailOrder-container ${(id ? cssClassName : '' )}`}>
                <CardOrderInfo order={orderItem} styleStatus={(id ? '' : cssClassName)}></CardOrderInfo>
                <hr></hr>
                <div className="detailOrder-products">
                    {orderItem.products.map(product => (
                        <CardProduct key={product.id} productItem={product}></CardProduct>
                    ))}
                </div>
            </div>}
    </div>

    )
}