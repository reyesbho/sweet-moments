import { useEffect, useId, useState } from 'react';
import { Order } from './Order';
import './OrderList.css'
import InfiniteScroll from 'react-infinite-scroll-component';
export function OrderList({ orders, getOrders, getOrdersPage, isLoading, totalItems }) {
    return (
        <div id='order-list' className="order-list">
            <InfiniteScroll
                dataLength={totalItems} //This is important field to render the next data
                next={getOrdersPage}
                hasMore={(totalItems != orders.length ? true: false)}
                loader={<h4>Loading...</h4>}
                scrollableTarget='order-list'
            >
                {
                orders && orders.map((order) => (
                    <Order key={order.id} order={order} getOrders={getOrders}></Order>
                ))}
            </InfiniteScroll>
        </div>
    )
}