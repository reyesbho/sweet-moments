import { Order } from './Order';
import './OrderList.css'
export function OrderList({orders, getOrders}){

    return (
        <div className="order-list">{
            orders && orders.map((order) => (
                <Order key={order.id} order={order} getOrders={getOrders}></Order>
            ))}
        </div>
    )
}