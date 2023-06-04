import { useId, useState } from 'react';
import './NewOrder.css';
import {  FaUser } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { useProducts } from '../../hooks/useProducts';
import { Carousel } from '../../components/carousel/Carousel';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export function NewOrder(){
    const [toggleState, setToggleState] = useState(1)
    const {products} = useProducts();
    const idCliente = useId();
    const idLugarEntrega = useId();
    const idFechaHora = useId();
    const selectCaracteristicasId = useId();
    const [productSelected, setProductSelected] = useState(null);


    const handleTab = (event,tabNumber) => {
        event.preventDefault();
        setToggleState(tabNumber)
    }

    const handleClickSelect = (product) => {
        setProductSelected(product);
    };

    const animatedComponents = makeAnimated();

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

    return (
        <div className="new-order">
            <h2>Mis pedidos</h2>
                <nav className='bloc-tabs'>
                    <div onClick={(e) => handleTab(e,1)} 
                        className={`tabs ${(toggleState === 1 ? 'tabs-active':'')}`}>Informacion</div>
                    <div onClick={(e) => handleTab(e,2)} 
                        className={`tabs ${(toggleState === 2 ? 'tabs-active':'')}`}>Productos</div>
                    <div onClick={(e) => handleTab(e,3)} 
                        className={`tabs ${(toggleState === 3 ? 'tabs-active':'')}`}>Confirmación</div>
                </nav>
                <div className='content-tabs'>
                    <form>
                        <div className={`content ${(toggleState === 1 ? ' content-active' : '')}`}>
                            <div className='btn-next-container'>
                                <button className='btn-cancel' >Cancelar</button>
                                <button onClick={(e) => handleTab(e,2)} className='btn-next' >Siguiente</button>
                            </div>
                            <div className='form-input'>
                                <label htmlFor={idCliente}>Cliente</label>
                                <input id={idCliente} type='text' placeholder='Juan Garcia'/>
                                <FaUser></FaUser>
                            </div>
                            <div className='form-input'>
                                <label htmlFor={idLugarEntrega}>Lugar de entrega</label>
                                <input id={idLugarEntrega} placeholder='Cerro prieto' type='text'/>
                                <MdLocationOn></MdLocationOn>
                            </div>
                            <div className='form-input'>
                                <label htmlFor={idFechaHora} >Fecha y hora</label>
                                <input id={idFechaHora} type='datetime-local' placeholder='2023-06-04 13:30'/>
                            </div>
                        </div>
                        <div className={`content ${(toggleState === 2 ? ' content-active' : '')}`}>
                            <div className='content-products'>
                                {products && 
                                    <Carousel products={products} onClickSelected={handleClickSelect}></Carousel>
                                }
                            </div>
                            <div className='content-products-info'>
                                <div className='form-select'>
                                    <label htmlFor={selectCaracteristicasId}>Caracteristicas</label>
                                    <Select
                                        id={selectCaracteristicasId}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti
                                        options={options}
                                    />
                                </div>
                                <div className='content-products-inputs'>
                                    <div className='form-input'>
                                        <label>Texto</label>
                                        <input type='text' placeholder='Feliz compleaños'></input>
                                    </div>
                                    <div className='form-input'>
                                        <label>Tamaño</label>
                                        <input type='number' placeholder='140'></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`content ${(toggleState === 3 ? ' content-active' : '')}`}></div>
                    </form>
                </div>
        </div>
    )
}