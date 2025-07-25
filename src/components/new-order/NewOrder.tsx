import './NewOrder.css';
import { MdLocationOn } from 'react-icons/md';
import { useCallback, useEffect, useId, useState} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaUser } from "react-icons/fa";
import { useNewOrder } from '../../hooks/useNewOrder';
import {  MobileDateTimePicker } from '@mui/x-date-pickers';
import { OrderInfo } from '../../general/interfaces/Generals';
import dayjs from 'dayjs';
import debounce from 'just-debounce';
import { searchClient } from '../../services/cliente.service';
import { Pedido, Producto } from '../../general/interfaces/pedido';
import { formatDateTime } from '../../utils/formatDate';



export function NewOrder({handleClose, orderDto, reload}:{handleClose:CallableFunction, orderDto: Pedido | null, reload: CallableFunction}) {
    const [order, setOrder] = useState<Pedido | null>(orderDto);
    const { registerOrder, updateOrder} = useNewOrder();
    const [clients, setClients] = useState<string[]>([]);
    
    const idCliente = useId();
    const idLugarEntrega = useId();
    const idFechaHora = useId();
    let orderInfo: OrderInfo = (order ? 
        {
            id: order?.id,
            cliente: order?.cliente,
            fechaEntrega: (order?.fechaEntrega ? dayjs(formatDateTime(order?.fechaEntrega)) : dayjs(new Date())),
            lugarEntrega: order?.lugarEntrega,
        } :
        {
                id: '',
                cliente:'',
                fechaEntrega: dayjs(new Date()),
                lugarEntrega:''
        }
    ) 
    const { register,handleSubmit, formState: { isDirty, isValid  }, setValue,control } = useForm<OrderInfo>({
        defaultValues:orderInfo
    });

    const debounceGetClients = useCallback(debounce(search => {
        searchClient({search}).then((result) => setClients(result));
    },300), [])

    

    const handleRegisterOrder = (orderInfo:OrderInfo) => {
        const pedido: Pedido = {
            ...orderInfo,
            fechaEntrega: {
                seconds: dayjs(orderInfo.fechaEntrega).utc().unix(),
                nanoseconds: 0
            }
        }

        if(orderInfo.id){
            updateOrder(pedido).then(() => {
                handleClose();
                reload();
            });
        }else{
            registerOrder(pedido).then((order: Pedido) => {
                handleClose();
                reload(order?.id);
            });
        }
        
    }
   

    return (
        <div className='modal'>
            <div className="new-order">
                <h2>{order ? "Actualizar Pedido" : "Registro de Pedido"}</h2>
                <div className='content-order'>
                    <div className='content-active'>
                        <form onSubmit={handleSubmit(handleRegisterOrder)}>
                    
                        <div className='form-input'>
                            <label htmlFor={idCliente}><FaUser></FaUser  > Cliente: </label>
                            <input id={idCliente} {...register("cliente",{required:true})} placeholder='Nombre' type='text'  />

                        </div>
                        <div className='form-input'>
                            <label htmlFor={idLugarEntrega}><MdLocationOn ></MdLocationOn> Lugar de entrega: </label>
                            <input id={idLugarEntrega} {...register("lugarEntrega",{required:true})} placeholder='Cerro prieto' type='text' />
                        </div>
                        <div className='form-input'>
                            <label htmlFor={idFechaHora} >Fecha: </label>
                            <Controller control={control} name='fechaEntrega' render={({field}) => (
                                <MobileDateTimePicker format="DD/MM/YYYY HH:mm" 
                                slotProps={{
                                    textField: {
                                    InputProps: {
                                        style: { backgroundColor: '#fff' } // 👈 Fondo blanco
                                    }
                                    }
                                }}
                                 value={field.value} timezone='default' ampm={true} minutesStep={10} onChange={(date) => field.onChange(date)}/>
                                )}>
                            </Controller>
                                
                        </div>
                        
                        <div className='btn-next-container'>
                            <button className='btn btn-cancel btn-sm' onClick={() => handleClose()}>Cancelar</button>
                            <button type="submit" className='btn btn-next btn-sm' disabled={isDirty && !isValid} >{order ? "Actualizar":"Registrar"}</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )
}