import { useEffect, useId, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { CardProduct } from '../../components/cardProduct/CardProduct';
import './NewOrder.css';
import { FormProducts } from './formProducts/FormProducts';
import { DetailOrder } from '../../components/detailOrder/DetailOrder';
import { FormInfo } from './formInfo/FormInfo';
import { or } from 'firebase/firestore/lite';
import { formatDate } from '../../utils/formatDate';

export function NewOrder() {
    const [toggleState, setToggleState] = useState(1)
    const [newProducts, setNewProducts] = useState([])
    const [orderInfo, setOrderInfo] = useState(null)
    const [order, setOrder] = useState()


    const handleSetNewProducts = (productInfo) => {
        setNewProducts([...structuredClone(newProducts), productInfo]);
    }

    const handleTab = (event, tabNumber) => {
        event.preventDefault();
        setToggleState(tabNumber)
    }

    const handleOrderInfo = (orderInfo) => {
        const newOrderInfo = { ...orderInfo, fechaEntrega: formatDate(orderInfo.fechaEntrega) };
        setOrderInfo(newOrderInfo)
        setToggleState(2)
    }

    useEffect(() => {
        const neworder = {
            ...orderInfo,
            id: new Date().getUTCMilliseconds(),
            register: 'Reyes Bustamante',
            status: '',
            numProducts: newProducts.length,
            products: newProducts
        }
        setOrder(neworder)
        console.log(neworder)
    }, [orderInfo, newProducts])

    return (
        <div className="new-order">
            <h2>Mis pedidos</h2>
            <nav className='bloc-tabs'>
                <div onClick={(e) => handleTab(e, 1)}
                    className={`tabs ${(toggleState === 1 ? 'tabs-active' : '')}`}>Informacion</div>
                <div onClick={(e) => handleTab(e, 2)}
                    className={`tabs ${(toggleState === 2 ? 'tabs-active' : '')}`}>Productos</div>
                <div onClick={(e) => handleTab(e, 3)}
                    className={`tabs ${(toggleState === 3 ? 'tabs-active' : '')}`}>Confirmación</div>
            </nav>
            <div className='content-tabs'>
                <div className={`content ${(toggleState === 1 ? ' content-active' : '')}`}>
                    <FormInfo onSubmit={handleOrderInfo}></FormInfo>
                </div>
                <div className={`content ${(toggleState === 2 ? ' content-active' : '')}`}>
                    <div className='btn-next-container'>
                        <button type="button" className='btn-cancel' >Cancelar</button>
                        <button type="button" onClick={(e) => handleTab(e, 3)} className='btn-next' >Siguiente</button>
                    </div>
                    <FormProducts handleSetNewProducts={handleSetNewProducts} ></FormProducts>
                    <div className='list-products-selected'>
                        <ul>
                            {newProducts && newProducts?.map(producItem => (
                                <li key={producItem.id} >
                                    <CardProduct productItem={producItem}></CardProduct>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={`content ${(toggleState === 3 ? ' content-active' : '')}`}>
                    <DetailOrder order={order}></DetailOrder>
                </div>

            </div>
        </div>
    )
}