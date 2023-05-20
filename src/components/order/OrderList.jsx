import { Order } from './Order';
import './OrderList.css'
export function OrderList({orders}){

    return (
        <div className="order-list">{
            orders && orders.map((order) => (
                <Order key={order.id} order={order}></Order>
            ))}
        </div>
    )
}