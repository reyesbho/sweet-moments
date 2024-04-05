import './NewOrder.css';
import { useNewOrder } from '../../hooks/useNewOrder';
import { MdLocationOn } from 'react-icons/md';
import { useId} from 'react';
import { useForm } from 'react-hook-form';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
export function NewOrder() {
    
    const { registerOrder} = useNewOrder();
    const idCliente = useId();
    const idLugarEntrega = useId();
    const idFechaHora = useId();
    
    const { register,handleSubmit, formState: { isDirty, isValid  }, setValue } = useForm({
        defaultValues: {
            cliente: '',
            lugarEntrega: '',
            fechaEntrega: ''
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
                        <label htmlFor={idFechaHora} >Fecha y hora</label>
                        <input id={idFechaHora} {...register("fechaEntrega",{required:false})} type='datetime-local' placeholder='2023-06-04 13:30' />
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