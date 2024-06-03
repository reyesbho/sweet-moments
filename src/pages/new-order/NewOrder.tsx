import './NewOrder.css';
import { MdLocationOn } from 'react-icons/md';
import { useId, useState} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNewOrder } from '../../hooks/useNewOrder';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, MobileTimePicker } from '@mui/x-date-pickers';
export function NewOrder() {
    
    const { registerOrder} = useNewOrder();
    const [startDate, setStartDate] = useState<Dayjs>(dayjs(Date.now()));
    const idCliente = useId();
    const idLugarEntrega = useId();
    const idFechaHora = useId();
    
    const { register,handleSubmit, formState: { isDirty, isValid  }, setValue,control } = useForm({
        defaultValues: {
            cliente: '',
            lugarEntrega: '',
            fechaEntrega: '',
            horaEntrega:''
        }
    });

   

    return (
        <div className="new-order">
            <h2>Nueva Orden</h2>
            <div className='content-order'>
                <div className='content-active'>
                    <form onSubmit={handleSubmit(registerOrder)}>
                
                    <div className='form-input'>
                        <label htmlFor={idCliente}>Cliente</label>
                        <input id={idCliente} {...register("cliente",{required:false})} placeholder='Juan Perez' type='text' />
                        <FaUser></FaUser  >
                    </div>
                    <div className='form-input'>
                        <label htmlFor={idLugarEntrega}>Lugar de entrega</label>
                        <input id={idLugarEntrega} {...register("lugarEntrega",{required:false})} placeholder='Cerro prieto' type='text' />
                        <MdLocationOn ></MdLocationOn>
                    </div>
                    <div className='form-input'>
                        <label htmlFor={idFechaHora} >Fecha</label>
                        <Controller control={control} name='fechaEntrega' render={({field}) => (
                            <DatePicker value={field.value} format="DD/MM/YYYY" onChange={(date) => field.onChange(date)}/>
                            )}>
                        </Controller>
                            
                    </div>
                    <div className='form-input'>
                        <label htmlFor={idFechaHora} >Fecha</label>
                        <Controller control={control} name='horaEntrega' render={({field}) => (
                            <MobileTimePicker ampm={false} minutesStep={10} timezone='default' value={field.value} onChange={(hour) => field.onChange(hour)} />
                            )}>
                        </Controller>
                    </div>
                    
                    <div className='btn-next-container'>
                        <Link className='btn btn-cancel btn-sm' to={'/'} >Cancelar</Link>
                        <button type="submit" className='btn btn-next btn-sm' disabled={isDirty && !isValid} >Registrar</button>
                    </div>
                </form>
                </div>
            </div>
           
        </div>
    )
}