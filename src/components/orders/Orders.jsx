import { OrderList } from '../order/OrderList'

export function Orders({orders}){
     return (
        <div className="orders">
            <h2>Mis pedidos</h2>
            <OrderList orders={orders}></OrderList>
        </div>
    )
}