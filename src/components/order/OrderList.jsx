import { EmptyList } from '../EmptyList/EmptyList';
import { Order } from './Order';
import './OrderList.css'
import InfiniteScroll from 'react-infinite-scroll-component';
export function OrderList({ orders, handleRefreshOrders, incrementPagination, totalItems }) {
    
    const handleGetMoreData = async() => {
        incrementPagination();
    }

    return (
        <div id='order-list' className="order-list">
            {(!orders || orders.length === 0) && (
                <EmptyList message="Sin resultados"></EmptyList>
            )}
            <InfiniteScroll
                dataLength={totalItems} 
                next={() => handleGetMoreData()}
                hasMore={(totalItems != orders.length ? true: false)}
                loader={<h4>Loading...</h4>}
                scrollableTarget='order-list'
            >
                {
                orders && orders.map((order) => (
                    <Order key={order.id} order={order} handleRefreshOrders={handleRefreshOrders}></Order>
                ))}
            </InfiniteScroll>
        </div>
    )
}