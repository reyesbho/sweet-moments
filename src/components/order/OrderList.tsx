import { OrderDto } from '../../general/Dtos';
import { EmptyList } from '../EmptyList/EmptyList';
import { Order } from './Order';
import './OrderList.css'
export function OrderList({ orders, handleRefreshOrders }:
                        { orders:OrderDto[] , handleRefreshOrders:Function }) {
    

    return (
        <div id='order-list' className="order-list">
            {(!orders || orders.length === 0) && (
                <EmptyList message="Sin resultados"></EmptyList>
            )}
                {
                orders && orders.map((order) => (
                    <Order key={order.id} order={order} handleRefreshOrders={handleRefreshOrders}></Order>
                ))}
        </div>
    )
}