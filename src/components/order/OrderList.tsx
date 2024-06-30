import { OrderDto } from '../../general/Interfaces';
import { EmptyList } from '../EmptyList/EmptyList';
import { Order } from './Order';
import './OrderList.css'
import InfiniteScroll from 'react-infinite-scroll-component';
export function OrderList({ orders, handleRefreshOrders, incrementPagination, totalItems }:
                        { orders:OrderDto[] , handleRefreshOrders:Function, incrementPagination:Function, totalItems:number }) {
    
    const handleGetMoreData = async() => {
        incrementPagination();
    }

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