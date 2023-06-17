import { classStatusEnum } from "../../general/Status";
import { CardProduct } from "../cardProduct/CardProduct";
import { CardOrderInfo } from "../cardOrderInfo/CardOrderInfo";
import './DetailOrder.css'

export function DetailOrder({ order }) {
      const cssClassName = classStatusEnum[order?.status];

    return (<>
        {order &&
            <div className="detailOrder-container">
                <CardOrderInfo order={order} styleStatus={cssClassName}></CardOrderInfo>
                <hr></hr>
                <div className="detailOrder-products">
                    {order.products.map(product => (
                        <CardProduct key={product.id} productItem={product}></CardProduct>
                    ))}
                </div>
            </div>}
    </>

    )
}