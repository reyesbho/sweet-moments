import './Orders.css'
import { OrderList } from '../../components/order/OrderList'
import { FaPlusCircle } from 'react-icons/fa'
import { useOrders } from '../../hooks/useOrders'
import {Link} from 'react-router-dom'

export function Orders(){
    const {orders, getOrders} = useOrders()

     return (
        <div className="orders">
            <Link to={"/new-order"}><FaPlusCircle size="3rem" className='color-success'></FaPlusCircle></Link>
            <h2>Mis pedidos</h2>
            <OrderList  orders={orders} getOrders={getOrders} ></OrderList>
        </div>
    )
}