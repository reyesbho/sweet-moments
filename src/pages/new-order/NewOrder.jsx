import { useId, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { CardProduct } from '../../components/cardProduct/CardProduct';
import './NewOrder.css';
import { FormProducts } from './formProducts/FormProducts';

export function NewOrder() {
    const [toggleState, setToggleState] = useState(1)
    const [newProducts, setNewProducts] = useState([])
    const idCliente = useId();
    const idLugarEntrega = useId();
    const idFechaHora = useId();
    
    const handleSetNewProducts = (productInfo) => {
        setNewProducts([...structuredClone(newProducts),productInfo]);
        console.log(newProducts)
    }

    const handleTab = (event, tabNumber) => {
        event.preventDefault();
        setToggleState(tabNumber)
    }


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
                        <div className='btn-next-container'>
                            <button className='btn-cancel' >Cancelar</button>
                            <button onClick={(e) => handleTab(e, 2)} className='btn-next' >Siguiente</button>
                        </div>
                        <div className='form-input'>
                            <label htmlFor={idCliente}>Cliente</label>
                            <input id={idCliente}  type='text' placeholder='Juan Garcia' />
                            <FaUser></FaUser>
                        </div>
                        <div className='form-input'>
                            <label htmlFor={idLugarEntrega}>Lugar de entrega</label>
                            <input id={idLugarEntrega}  placeholder='Cerro prieto' type='text' />
                            <MdLocationOn></MdLocationOn>
                        </div>
                        <div className='form-input'>
                            <label htmlFor={idFechaHora} >Fecha y hora</label>
                            <input id={idFechaHora}  type='datetime-local' placeholder='2023-06-04 13:30' />
                        </div>
                    </div>
                    <div className={`content ${(toggleState === 2 ? ' content-active' : '')}`}>
                       <FormProducts handleSetNewProducts={handleSetNewProducts}></FormProducts> 
                        <div className='list-products-selected'>
                            <ul>
                                {newProducts && newProducts?.map(producItem => (
                                    <CardProduct key={producItem.id} productItem={producItem}></CardProduct>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={`content ${(toggleState === 3 ? ' content-active' : '')}`}></div>

            </div>
        </div>
    )
}