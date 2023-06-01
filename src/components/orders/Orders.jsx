import './Orders.css'
import { OrderList } from '../order/OrderList'
import { FaPlusCircle } from 'react-icons/fa'

export function Orders({orders}){
     return (
        <div className="orders">
            <button ><FaPlusCircle size="3rem" className='color-success'></FaPlusCircle></button>
            <h2>Mis pedidos</h2>
            <OrderList  orders={orders}></OrderList>
        </div>
    )
}