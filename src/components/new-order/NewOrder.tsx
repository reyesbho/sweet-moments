import './NewOrder.css';
import { MdLocationOn } from 'react-icons/md';
import { useCallback, useEffect, useId, useState} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaUser } from "react-icons/fa";
import { useNewOrder } from '../../hooks/useNewOrder';
import {  MobileDateTimePicker } from '@mui/x-date-pickers';
import { OrderInfo } from '../../general/Interfaces';
import dayjs from 'dayjs';
import { ClientDto, OrderDto } from '../../general/Dtos';
import debounce from 'just-debounce';
import { searchClient } from '../../services/cliente.service';
import { getNameClient } from '../../general/Constants';



export function NewOrder({handleClose, orderDto, reload}:{handleClose:CallableFunction, orderDto: OrderDto | null, reload: CallableFunction}) {
    const [order, setOrder] = useState<OrderDto | null>(orderDto);
    const { registerOrder, updateOrder} = useNewOrder();
    const [clients, setClients] = useState<ClientDto[]>([]);
    
    const idCliente = useId();
    const idLugarEntrega = useId();
    const idFechaHora = useId();
    let orderInfo: OrderInfo = (order ? 
        {
            idOrder: order?.id,
            idCliente: order?.cliente.id,
            cliente: order?.cliente.name,
            firstName:order?.cliente.apellidoPaterno,
            lastName:order?.cliente.apellidoMaterno,
            fechaEntrega: (order?.fechaEntrega ? dayjs(order?.fechaEntrega) : dayjs(new Date())),
            lugarEntrega: order?.lugarEntrega,
            clienteAux: getNameClient(order),
        } :
        {
                idOrder: 0,
                idCliente: 0,
                cliente:'',
                firstName:'',
                lastName:'',
                fechaEntrega: dayjs(new Date()),
                lugarEntrega:'',
                clienteAux:'',
        }
    ) 
    const { register,handleSubmit, formState: { isDirty, isValid  }, setValue,control } = useForm<OrderInfo>({
        defaultValues:orderInfo
    });

    const debounceGetClients = useCallback(debounce(search => {
        searchClient({search}).then((result) => setClients(result));
    },300), [])

    const handleChange = (event:any) => {
        const newSearch = event.target.value;
        debounceGetClients(newSearch);
      }
    
      const handleClientSelected = (event:any, client: ClientDto) => {
        event.preventDefault();
        event.stopPropagation();
        setClients([]);
        setValue('cliente', client.name);
        setValue('firstName', client.apellidoPaterno);
        setValue('lastName', client.apellidoMaterno);
        setValue('lugarEntrega', (client.direccion ? client.direccion : ''));
        setValue('idCliente', client.id);
        setValue('clienteAux', `${client.name} ${client.apellidoPaterno} ${client.apellidoMaterno ? client.apellidoMaterno : ''}`);
    }


    const handleRegisterOrder = (orderInfo:OrderInfo) => {
        if(orderInfo.idOrder){
            updateOrder(orderInfo).then(() => {
                handleClose();
                reload();
            });
        }else{
            registerOrder(orderInfo).then((order: OrderDto) => {
                handleClose();
                reload(order.id);
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
                            <input id={idCliente} {...register("clienteAux",{required:true})} placeholder='Juan Perez' type='text' onChange={handleChange}  />
                            <div className='container-clients'>
                                <div className='searchClients'>
                                    {clients  && clients.map(client => (
                                        <div className='searchClients-option' key={client.id} onClick={(event) => handleClientSelected(event, client)}>
                                            <span><FaUser></FaUser> {`${client.name} ${client.apellidoPaterno} ${client.apellidoMaterno ? client.apellidoMaterno : ''}`}</span>
                                            <span><MdLocationOn></MdLocationOn> {` ${client.direccion}`}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
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