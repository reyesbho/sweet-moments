import { classStatusEnum } from "../../general/Status";
import { CardProduct } from "../cardProduct/CardProduct";
import { CardOrderInfo } from "../cardOrderInfo/CardOrderInfo";
import './DetailOrder.css'

export function DetailOrder({ order }) {
    order={
        cliente: 'Reyes bustamante',
        lugarEntrega: 'Tacahua',
        fechaEntrega: '2023-06-12T09:53',
        id: 389,
        register: 'Reyes Bustamante',
        status: 'BACKLOG',
        numProducts: 1,
        products: [
          {
            text: 'Feliz dia del padre',
            size: '140',
            tipo: 'mosaico',
            flavor: 'chocolate',
            comments: 'Relleno de chicolate',
            product: {
              id: 'gelatina',
              nameProduct: 'Gelatina',
              thumbnail: 'https://www.recetasnestle.com.mx/sites/default/files/srh_recipes/59f8032795e08989f8e327029f544065.jpg',
              status: 'ACTIVO',
              isCheck: true,
              type: undefined,
              flavor: 'chocolate'
            },
            id: 457
          }
        ]
      }
      const cssClassName = classStatusEnum[order.status];

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