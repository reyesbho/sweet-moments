import './NewOrder.css';
import { MdLocationOn } from 'react-icons/md';
import { useEffect, useId, useState} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaUser } from "react-icons/fa";
import { useNewOrder } from '../../hooks/useNewOrder';
import {  MobileDateTimePicker } from '@mui/x-date-pickers';
import { OrderDto, OrderInfo } from '../../general/Interfaces';
import dayjs from 'dayjs';
export function NewOrder({handleIsOpen, orderDto, reload}:{handleIsOpen: CallableFunction, orderDto: OrderDto | null, reload: CallableFunction}) {
    const [order, setOrder] = useState<OrderDto | null>(orderDto);
    const { registerOrder, updateOrder} = useNewOrder();
    const idCliente = useId();
    const idLugarEntrega = useId();
    const idFechaHora = useId();
    let orderInfo: OrderInfo = {
            idOrder: order?.id,
            cliente: order?.cliente,
            fechaEntrega: order?.fechaEntrega,
            lugarEntrega: order?.lugarEntrega,
    };

    
    const { register,handleSubmit, formState: { isDirty, isValid  }, setValue,control } = useForm<OrderInfo>({
        defaultValues:orderInfo
    });


    const handleRegisterOrder = (orderInfo:OrderInfo) => {
        if(orderInfo.idOrder){
            updateOrder(orderInfo).then(() => {
                handleIsOpen();
                reload();
            })
        }else{
            registerOrder(orderInfo).then(() => {
                handleIsOpen();
                reload();
            })
        }
        
    }
   

    return (
        <div className='modal'>
            <div className="new-order">
                <h2>{order ? "Actualizar Orden" : "Nueva Orden"}</h2>
                <div className='content-order'>
                    <div className='content-active'>
                        <form onSubmit={handleSubmit(handleRegisterOrder)}>
                    
                        <div className='form-input'>
                            <label htmlFor={idCliente}>Cliente: </label>
                            <input id={idCliente} {...register("cliente",{required:true})} placeholder='Juan Perez' type='text' />
                            <FaUser></FaUser  >
                        </div>
                        <div className='form-input'>
                            <label htmlFor={idLugarEntrega}>Lugar de entrega: </label>
                            <input id={idLugarEntrega} {...register("lugarEntrega",{required:true})} placeholder='Cerro prieto' type='text' />
                            <MdLocationOn ></MdLocationOn>
                        </div>
                        <div className='form-input'>
                            <label htmlFor={idFechaHora} >Fecha: </label>
                            <Controller control={control} name='fechaEntrega' render={({field}) => (
                                <MobileDateTimePicker value={(dayjs(field.value))} format="DD/MM/YYYY HH:mm" timezone='default' ampm={false} minutesStep={10} onChange={(date) => field.onChange(date)}/>
                                )}>
                            </Controller>
                                
                        </div>
                        
                        <div className='btn-next-container'>
                            <button className='btn btn-cancel btn-sm' onClick={() => handleIsOpen()}>Cancelar</button>
                            <button type="submit" className='btn btn-next btn-sm' disabled={isDirty && !isValid} >{order ? "Actualizar":"Registrar"}</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}