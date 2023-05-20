import { OrderList } from '../order/OrderList'

export function Orders({orders}){
    console.log(orders)
     return (
        <div className="orders">
            <h2>Mis pedidos</h2>
            <OrderList ordersInit={orders}></OrderList>
        </div>
    )
}